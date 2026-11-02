#!/usr/bin/env node
// Lampa Multilingual — private local graphical WGT builder.
// No cloud service, shell interpolation, privileged operations, or exposed LAN listener.
import {createServer} from 'node:http';
import {readFileSync, existsSync, createReadStream, statSync} from 'node:fs';
import {resolve, extname, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import {randomBytes, createHash} from 'node:crypto';
import {normalizeSettings, LANGUAGES} from './lib.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const ui=resolve(root,'personal/builder-ui');
const output=resolve(root,'dist/Lampa-Multilingual.wgt');
const csrf=randomBytes(24).toString('hex');
let task=null, serverPort, result=null, latestStatus='idle';
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
const resources=new Map([['/', 'index.html'],['/app.js','app.js'],['/style.css','style.css']]);
const send=(res,code,body,headers={})=>{res.writeHead(code,{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers});res.end(body);};
const json=(res,code,value)=>send(res,code,JSON.stringify(value),{'Content-Type':'application/json; charset=utf-8'});
function validHost(req) {
  return req.headers.host==='127.0.0.1:'+serverPort && !req.headers['x-forwarded-host'];
}
function validPost(req){
  return req.headers.origin==='http://127.0.0.1:'+serverPort
    && req.headers['x-builder-token']===csrf
    && req.headers['content-type']?.split(';')[0]==='application/json';
}
function readJson(req){
  return new Promise((ok,fail)=>{
    let buf='';
    req.on('data',b=>{buf+=b.toString('utf8');if(Buffer.byteLength(buf)>8192){fail(new Error('Request too large'));req.destroy();}});
    req.on('end',()=>{try{ok(JSON.parse(buf));}catch{fail(new Error('Invalid JSON'));}});
    req.on('error',fail);
  });
}
function stopTask(){
  if(!task)return;
  const proc=task;
  latestStatus='cancelling';
  try{if(process.platform==='win32')proc.kill('SIGTERM');else process.kill(-proc.pid,'SIGTERM');}catch{try{proc.kill('SIGTERM');}catch{}}
}
const server=createServer(async(req,res)=>{
  if(!validHost(req))return send(res,403,'Invalid host');
  const path=new URL(req.url,'http://127.0.0.1').pathname;
  if(req.method==='GET' && resources.has(path)){
    const file=resolve(ui,resources.get(path));
    if(!existsSync(file))return send(res,404,'Not found');
    return send(res,200,readFileSync(file),{'Content-Type':mime[extname(file)]||'text/plain','Content-Security-Policy':"default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"});
  }
  if(req.method==='GET' && path==='/api/config')
    return json(res,200,{token:csrf,languages:LANGUAGES,builderLanguages:['en','ru','nl'],status:latestStatus,ready:!!result});
  if(req.method==='GET' && path==='/api/result'){
    const url=new URL(req.url,'http://127.0.0.1');
    if(!result||url.searchParams.get('token')!==csrf||!existsSync(output))return send(res,404,'Not ready');
    const stat=statSync(output);
    if(stat.size!==result.size)return send(res,409,'Output changed; rebuild required');
    res.writeHead(200,{'Content-Type':'application/octet-stream','Content-Length':stat.size,'Content-Disposition':'attachment; filename="Lampa-Multilingual.wgt"','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    return createReadStream(output).pipe(res);
  }
  if(req.method==='POST' && path==='/api/cancel'){
    if(!validPost(req))return json(res,403,{error:'Forbidden'});
    if(!task)return json(res,409,{error:'No active build'});
    stopTask();return json(res,200,{ok:true});
  }
  if(req.method==='POST' && path==='/api/build'){
    if(!validPost(req))return json(res,403,{error:'Forbidden'});
    if(task)return json(res,409,{error:'A build is already running'});
    let input;
    try{
      input=await readJson(req);
      if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('Invalid settings');
      if(typeof input.language!=='string'||typeof input.torrserverUrl!=='string'||typeof input.parserType!=='string'||typeof input.pluginsEnabled!=='boolean')throw new Error('Invalid settings');
      input=normalizeSettings(input);
    }catch(error){return json(res,400,{error:String(error.message||error)});}
    // Only validated option values go into argv. No shell is ever involved.
    const args=['personal/build.mjs','--language',input.language,'--parser',input.parserType,'--plugins',input.pluginsEnabled?'on':'off'];
    if(input.torrserverUrl)args.push('--torrserver',input.torrserverUrl);
    result=null;latestStatus='building';
    res.writeHead(200,{'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-store, no-transform','Connection':'keep-alive','X-Accel-Buffering':'no'});
    const emit=(type,value)=>{if(!res.destroyed)res.write('event: '+type+'\ndata: '+JSON.stringify(value)+'\n\n');};
    emit('status',{stage:'starting',text:'Preparing local build'});
    const proc=spawn(process.execPath,args,{cwd:root,shell:false,detached:process.platform!=='win32',stdio:['ignore','pipe','pipe']});
    task=proc;
    let failure='',cancelled=false;
    const report=(stream,kind)=>stream.on('data',chunk=>{
      const line=String(chunk).slice(0,3000).replace(/\x1b\[[0-9;]*m/g,'');
      if(kind==='stderr')failure=(failure+line).slice(-6000);
      emit('log',{kind,text:line});
    });
    report(proc.stdout,'stdout');report(proc.stderr,'stderr');
    proc.on('error',error=>{failure=String(error.message);});
    proc.once('exit',(code,signal)=>{
      cancelled=latestStatus==='cancelling';
      task=null;
      if(code===0&&!cancelled&&existsSync(output)){
        const size=statSync(output).size;
        const hash=createHash('sha256').update(readFileSync(output)).digest('hex');
        result={size,sha256:hash};
        latestStatus='complete';
        emit('complete',{size,sha256:hash,download:'/api/result?token='+csrf});
      }else{
        latestStatus=cancelled?'cancelled':'failed';
        emit('failure',{error:cancelled?'Build cancelled':('Build failed ('+(signal||code)+'). '+failure.slice(-1000))});
      }
      res.end();
    });
    return;
  }
  send(res,404,'Not found');
});
const requested=process.argv.find(x=>/^--port=/.test(x));
const port=requested?Number(requested.split('=')[1]):0;
if(!Number.isInteger(port)||port<0||port>65535)throw new Error('Invalid port');
server.listen(port,'127.0.0.1',()=>{
  serverPort=server.address().port;
  const address='http://127.0.0.1:'+serverPort+'/';
  console.log('Lampa Multilingual Builder — '+address);
  console.log('Builds stay on this computer. Stop with Ctrl+C.');
  if(!process.argv.includes('--no-open')){
    const cmd=process.platform==='darwin'?'open':process.platform==='linux'?'xdg-open':null;
    if(cmd){const child=spawn(cmd,[address],{stdio:'ignore'});child.on('error',()=>{});child.unref();}
  }
});
for(const event of ['SIGINT','SIGTERM'])process.once(event,()=>{
  stopTask();
  server.close(()=>process.exit(0));
  if(!task)process.exit(0);
});