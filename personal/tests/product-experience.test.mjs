import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {widgetManifest,localTizenHtml,LANGUAGES} from '../lib.mjs';
const root=resolve(import.meta.dirname,'../..');
const read=path=>readFileSync(resolve(root,path),'utf8');
test('public product identity is Multilingual without rotating Tizen app ID',()=>{
 const xml=widgetManifest();
 assert.match(xml,/<name>Lampa Multilingual<\/name>/);
 assert.match(xml,/L4mpaPers0\.LampaPersonal/);
 assert.match(localTizenHtml('<title>Lampa</title><link href="css/app.css"><script src="vender/jquery/jquery.js"></script><script src="loader.js"></script>'),/<title>Lampa Multilingual<\/title>/);
 assert.equal(LANGUAGES.length,21);
});
test('graphical builder and static website files are tracked',()=>{
 for(const file of ['personal/builder-web.mjs','personal/builder-ui/index.html','personal/builder-ui/app.js','personal/builder-ui/style.css','personal/site-preview.mjs','docs/index.html','docs/assets/site.css','docs/assets/site.js','docs/BUILDER.md'])assert.ok(existsSync(resolve(root,file)),file);
 const scripts=JSON.parse(read('package.json')).scripts;
 assert.equal(scripts.builder,'node personal/builder-web.mjs');
 assert.equal(scripts['build:multilingual'],'node personal/build.mjs');
 assert.equal(scripts['build:personal'],'node personal/build.mjs');
});
test('public site clearly separates local compilation from a public interactive preview',()=>{
 const site=read('docs/index.html');
 assert.match(site,/21 interface languages|21 languages/i);
 assert.match(site,/original Lampa creators/i);
 assert.match(site,/not an online build service/i);
 assert.match(site,/npm run builder/);
 assert.match(site,/independent/i);
});
test('build primary filename and compatibility copy are implemented',()=>{
 const script=read('personal/build.mjs');
 assert.match(script,/dist\/Lampa-Multilingual\.wgt/);
 assert.match(script,/dist\/Lampa-Personal-Edition\.wgt/);
 assert.match(script,/copyFileSync/);
 const server=read('personal/builder-web.mjs');
 assert.match(server,/127\.0\.0\.1/);
 assert.match(server,/normalizeSettings/);
 assert.match(server,/x-builder-token/);
 assert.match(server,/shell:false/);
});