import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {resolve} from 'node:path';

test('local graphical Builder serves a private UI and rejects unauthorized or malformed builds',async t=>{
 const root=resolve(import.meta.dirname,'../..');
 const child=spawn(process.execPath,['personal/builder-web.mjs','--no-open','--port=0'],{
  cwd:root,stdio:['ignore','pipe','pipe']
 });
 t.after(()=>{if(!child.killed)child.kill('SIGTERM');});
 let output='';
 const url=await Promise.race([
  new Promise((resolveUrl,reject)=>{
   child.stdout.on('data',chunk=>{
    output+=String(chunk);
    const match=output.match(/http:\/\/127\.0\.0\.1:\d+\//);
    if(match)resolveUrl(match[0]);
   });
   child.on('exit',code=>reject(new Error('Builder server exited: '+code)));
  }),
  new Promise((_,reject)=>setTimeout(()=>reject(new Error('Builder startup timed out')),12000))
 ]);
 const page=await fetch(url);
 assert.equal(page.status,200);
 assert.match(await page.text(),/Lampa Multilingual/);
 const js=await fetch(url+'app.js');
 assert.equal(js.status,200);
 assert.match(await js.text(),/languageNames/);
 const cfg=await (await fetch(url+'api/config')).json();
 assert.equal(cfg.languages.length,21);
 assert.equal(typeof cfg.token,'string');
 assert.ok(cfg.token.length>20);
 const unauth=await fetch(url+'api/build',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});
 assert.equal(unauth.status,403);
 const options={method:'POST',headers:{'Content-Type':'application/json','Origin':url.slice(0,-1),'X-Builder-Token':cfg.token}};
 const invalid=await fetch(url+'api/build',{...options,body:JSON.stringify({language:'zz',torrserverUrl:'',parserType:'jackett',pluginsEnabled:false})});
 assert.equal(invalid.status,400);
 const secrets=await fetch(url+'api/build',{...options,body:JSON.stringify({language:'nl',torrserverUrl:'https://user:pass@example.com:8090',parserType:'jackett',pluginsEnabled:false})});
 assert.equal(secrets.status,400);
 const file=await fetch(url+'api/result?token='+cfg.token);
 assert.equal(file.status,404);
 const cancel=await fetch(url+'api/cancel',{...options,body:'{}'});
 assert.equal(cancel.status,409);
});