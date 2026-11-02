#!/usr/bin/env node
// Preview the static, no-cloud product site. No API endpoints are exposed.
import {createServer} from 'node:http';
import {readFileSync,existsSync,statSync} from 'node:fs';
import {resolve,dirname,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../docs');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.md':'text/plain; charset=utf-8'};
const server=createServer((req,res)=>{
 if(req.method!=='GET'||req.headers.host?.split(':')[0]!=='127.0.0.1'){res.writeHead(403);return res.end();}
 let url;try{url=new URL(req.url,'http://127.0.0.1');}catch{res.writeHead(400);return res.end();}
 const path=resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
 if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403);return res.end();}
 if(!existsSync(path)||!statSync(path).isFile()){res.writeHead(404);return res.end('Not found');}
 res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-store'});
 res.end(readFileSync(path));
});
server.listen(0,'127.0.0.1',()=>{
 const address='http://127.0.0.1:'+server.address().port;
 console.log('Lampa Multilingual website preview: '+address);
 console.log('Press Ctrl+C to stop.');
 if(!process.argv.includes('--no-open')){
  const cmd=process.platform==='darwin'?'open':process.platform==='linux'?'xdg-open':null;
  if(cmd){const p=spawn(cmd,[address],{stdio:'ignore'});p.on('error',()=>{});p.unref();}
 }
});