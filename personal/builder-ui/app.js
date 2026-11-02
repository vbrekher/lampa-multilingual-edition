const languageNames={
 nl:'Nederlands',de:'Deutsch',tr:'Türkçe',en:'English',zh:'简体中文',hi:'हिन्दी',es:'Español',ar:'العربية',fr:'Français',bn:'বাংলা',pt:'Português',id:'Bahasa Indonesia',ur:'اردو',ru:'Русский',uk:'Українська',be:'Беларуская',bg:'Български',cs:'Čeština',he:'עברית',pl:'Polski',ro:'Română'
};
const rtl=new Set(['ar','ur','he']);
const messages={
en:{
 railTitle:'Your TV.<br><em>Your language.</em>',railDescription:'Create an independently packaged Lampa for Samsung Tizen. Everything happens on your computer.',languages:'interface languages',
 steps:['Welcome','TV language','TorrServer','Parser','Plugins','Review','Your WGT'],
 descriptions:['Configure and build without the command line.','Choose the first language displayed on your TV.','Optional: connect a server you run separately.','Choose the parser backend used by Lampa.','Control whether third-party JavaScript can run.','Check the configuration before compiling.','Your local package is ready.'],
 back:'Back',next:'Continue',start:'Get started',build:'Build my WGT',again:'New build',cancel:'Cancel build',
 intro:'Build Lampa Multilingual',introText:'All 21 languages ship in every WGT. Change languages later on your TV. This builder never sends your settings to an external service.',feature1:'Local source compilation',feature2:'Private configuration',feature3:'A Samsung Tizen WGT',
 languageHelp:'Your selection controls the first-launch language. All languages remain available in Settings.',search:'Search languages…',
 serverNo:'No TorrServer (recommended unless you have one)',serverYes:'I have a TorrServer',serverHelp:'TorrServer is a separate service. The WGT does not include a torrent engine.',serverLabel:'TorrServer address',serverError:'Enter a valid http:// or https:// URL without credentials, query, fragments or spaces.',
 parserHelp:'The selected backend can be changed on your television.',parserJackett:'Jackett — torrent indexer integration',parserProwlarr:'Prowlarr — indexer integration',parserTorr:'TorrServer — server-based search mode',
 pluginsOff:'Keep third-party plugins disabled (recommended)',pluginsOn:'Allow third-party plugins',pluginsHelp:'Plugins can execute external JavaScript. The in-app catalogue remains visible; installation requires user consent.',
 reviewHelp:'Your WGT includes locally compiled app code and all languages. No credentials are embedded.',
 configLanguage:'Initial TV language',configLanguages:'Available languages',configServer:'TorrServer',configParser:'Parser',configPlugins:'Third-party plugins',configOutput:'Output',notSet:'Not configured',enabled:'Allowed with in-app consent',disabled:'Disabled',
 buildHint:'This step compiles real application sources. Do not close this page during a build.',building:'Compiling the application…',success:'Lampa Multilingual is ready',successDescription:'Download your WGT and follow the installation guide. The package is not automatically installed on the TV.',download:'Download WGT',install:'Installation guide',sha:'SHA-256',size:'Size',failure:'Build did not complete',tryAgain:'Try again',privacy:'No account · No cloud compilation · No personal WGT uploads'
},
ru:{
 railTitle:'Твой телевизор.<br><em>Твой язык.</em>',railDescription:'Собери собственную Lampa для Samsung Tizen. Все операции выполняются на твоём компьютере.',languages:'языков интерфейса',
 steps:['Начало','Язык Lampa','TorrServer','Парсер','Плагины','Проверка','Готовый WGT'],
 descriptions:['Настройка и сборка без командной строки.','Выбери первоначальный язык на телевизоре.','Необязательно: подключи свой отдельный сервер.','Выбери способ работы парсера Lampa.','Разрешение на сторонний JavaScript.','Проверь настройки перед сборкой.','Локальный пакет готов.'],
 back:'Назад',next:'Продолжить',start:'Начать',build:'Создать WGT',again:'Новая сборка',cancel:'Отменить сборку',
 intro:'Собери Lampa Multilingual',introText:'Все 21 язык входят в каждый WGT. Язык можно поменять позже на телевизоре. Сборщик не отправляет настройки на внешний сервер.',feature1:'Сборка из локальных исходников',feature2:'Личные настройки остаются на ПК',feature3:'Пакет для Samsung Tizen',
 languageHelp:'Выбор определяет язык при первом запуске. Все языки остаются доступными в настройках.',search:'Поиск языка…',
 serverNo:'Без TorrServer (рекомендуется, если сервера нет)',serverYes:'У меня есть TorrServer',serverHelp:'TorrServer работает отдельно. Внутри WGT торрент-движка нет.',serverLabel:'Адрес TorrServer',serverError:'Укажи HTTP(S) URL без пароля, логина, параметров, фрагментов или пробелов.',
 parserHelp:'Режим парсера можно изменить позже на телевизоре.',parserJackett:'Jackett — интеграция торрент-индексатора',parserProwlarr:'Prowlarr — интеграция индексаторов',parserTorr:'TorrServer — поиск через сервер',
 pluginsOff:'Отключить сторонние плагины (рекомендуется)',pluginsOn:'Разрешить сторонние плагины',pluginsHelp:'Плагины могут исполнять внешний JavaScript. Каталог остаётся доступным, но установка требует согласия.',
 reviewHelp:'В WGT будут локальный код приложения и все языки. Секретные данные не добавляются.',
 configLanguage:'Первоначальный язык',configLanguages:'Доступных языков',configServer:'TorrServer',configParser:'Парсер',configPlugins:'Сторонние плагины',configOutput:'Файл',notSet:'Не задан',enabled:'Разрешены с подтверждением',disabled:'Отключены',
 buildHint:'Компиляция происходит по-настоящему. Не закрывай страницу до завершения.',building:'Сборка приложения…',success:'Lampa Multilingual готова',successDescription:'Скачай WGT и следуй инструкции установки. Приложение не устанавливается на телевизор автоматически.',download:'Скачать WGT',install:'Инструкция установки',sha:'SHA-256',size:'Размер',failure:'Не удалось завершить сборку',tryAgain:'Повторить',privacy:'Без аккаунта · Без облачной компиляции · Без загрузки WGT на сервер'
},
nl:{
 railTitle:'Jouw tv.<br><em>Jouw taal.</em>',railDescription:'Maak je eigen Lampa voor Samsung Tizen. Alles gebeurt op jouw computer.',languages:'interfacetalen',
 steps:['Welkom','Tv-taal','TorrServer','Parser','Plug-ins','Controle','Je WGT'],
 descriptions:['Stel alles in en bouw zonder opdrachtregel.','Kies de eerste taal op je tv.','Optioneel: verbind je eigen afzonderlijke server.','Kies de parser voor Lampa.','Bepaal of externe JavaScript mag draaien.','Controleer je instellingen.','Je lokale pakket is klaar.'],
 back:'Terug',next:'Verder',start:'Beginnen',build:'WGT bouwen',again:'Nieuwe build',cancel:'Build annuleren',
 intro:'Bouw Lampa Multilingual',introText:'Alle 21 talen zitten in elke WGT. Je kunt de taal later op je tv wijzigen. De builder stuurt geen instellingen naar een externe dienst.',feature1:'Lokaal compileren',feature2:'Privé-instellingen op je computer',feature3:'Samsung Tizen WGT',
 languageHelp:'De keuze bepaalt de eerste taal. Alle talen blijven beschikbaar in Instellingen.',search:'Zoek een taal…',
 serverNo:'Geen TorrServer (aanbevolen als je er geen hebt)',serverYes:'Ik heb een TorrServer',serverHelp:'TorrServer draait apart. De WGT bevat geen torrentserver.',serverLabel:'TorrServer-adres',serverError:'Voer een HTTP(S)-URL in zonder gebruikersgegevens, query, fragment of spaties.',
 parserHelp:'Je kunt de parser later op je tv wijzigen.',parserJackett:'Jackett — torrentindexer',parserProwlarr:'Prowlarr — indexerintegratie',parserTorr:'TorrServer — zoeken via server',
 pluginsOff:'Externe plug-ins uitschakelen (aanbevolen)',pluginsOn:'Externe plug-ins toestaan',pluginsHelp:'Plug-ins kunnen externe JavaScript uitvoeren. De catalogus blijft beschikbaar; installatie vereist toestemming.',
 reviewHelp:'De WGT bevat lokaal gecompileerde appcode en alle talen. Er worden geen geheimen toegevoegd.',
 configLanguage:'Eerste tv-taal',configLanguages:'Beschikbare talen',configServer:'TorrServer',configParser:'Parser',configPlugins:'Externe plug-ins',configOutput:'Bestand',notSet:'Niet ingesteld',enabled:'Toegestaan na bevestiging',disabled:'Uitgeschakeld',
 buildHint:'De broncode wordt echt gecompileerd. Sluit deze pagina niet tijdens het bouwen.',building:'De app wordt gebouwd…',success:'Lampa Multilingual is klaar',successDescription:'Download je WGT en volg de installatiehandleiding. De app wordt niet automatisch op je tv gezet.',download:'WGT downloaden',install:'Installatiehandleiding',sha:'SHA-256',size:'Grootte',failure:'De build is niet voltooid',tryAgain:'Opnieuw proberen',privacy:'Geen account · Geen cloudbuild · Geen uploads van persoonlijke WGT-bestanden'
}};
let state={step:0,ui:'en',language:'en',torrserverUrl:'',parserType:'jackett',pluginsEnabled:false,token:'',busy:false};
const el=id=>document.getElementById(id);
function t(){return messages[state.ui];}
function html(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function choice(id,title,caption,selected){
 return '<label class="choice '+(selected?'selected':'')+'"><input type="radio" name="'+id+'" value="'+html(title.value)+'" '+(selected?'checked':'')+'><span class="choice-circle"></span><span class="choice-copy"><strong>'+html(title.text)+'</strong><small>'+html(caption)+'</small></span></label>';
}
function preview(){
 const tag=el('preview-tags');
 tag.textContent='';
 const values=[languageNames[state.language],languageNames[state.language]==='Nederlands'?'English':'Nederlands','العربية'];
 for(const val of values){const s=document.createElement('span');s.textContent=val;tag.appendChild(s);}
}
function options(list){return list.map(item=>'<option value="'+item+'">'+html(languageNames[item])+'</option>').join('');}
function render(){
 const l=t(),k=state.step,content=el('content');
 document.documentElement.lang=state.ui;
 el('rail-title').innerHTML=l.railTitle;
 el('rail-description').textContent=l.railDescription;
 el('stat-languages').textContent=l.languages;
 el('privacy-note').textContent=l.privacy;
 el('step-counter').textContent='STEP '+(Math.min(k,5)+1)+' / 6';
 el('step-title').textContent=l.steps[k];
 el('step-description').textContent=l.descriptions[k];
 el('progress').innerHTML=Array.from({length:6},(_,i)=>'<span class="'+(i<=k?'active':'')+'"></span>').join('');
 el('back').textContent=l.back;el('back').disabled=k===0||k===6||state.busy;
 el('next').hidden=k===6||state.busy;
 el('next').innerHTML=(k===0?l.start:k===5?l.build:l.next)+' <span>→</span>';
 el('cancel').hidden=!state.busy;el('cancel').textContent=l.cancel;
 preview();
 if(k===0)content.innerHTML='<div class="welcome-icon">✦</div><h3>'+l.intro+'</h3><p>'+l.introText+'</p><div class="features"><span>✓ '+l.feature1+'</span><span>✓ '+l.feature2+'</span><span>✓ '+l.feature3+'</span></div>';
 if(k===1){
  content.innerHTML='<p class="help">'+l.languageHelp+'</p><input class="search" id="language-search" type="search" placeholder="'+l.search+'" autocomplete="off"><div id="language-grid" class="language-grid"></div>';
  const fill=q=>{
    const box=el('language-grid');box.textContent='';
    for(const code of Object.keys(languageNames).filter(c=>languageNames[c].toLowerCase().includes(q.toLowerCase())||c.includes(q.toLowerCase()))){
      const button=document.createElement('button');button.type='button';button.className='language '+(code===state.language?'chosen':'');button.dir=rtl.has(code)?'rtl':'ltr';
      button.appendChild(document.createTextNode(languageNames[code]));const small=document.createElement('small');small.textContent=code.toUpperCase();button.appendChild(small);
      button.onclick=()=>{state.language=code;fill(el('language-search').value);preview();};box.appendChild(button);
    }
  };
  fill('');el('language-search').addEventListener('input',e=>fill(e.target.value));
 }
 if(k===2){
  content.innerHTML='<p class="help">'+l.serverHelp+'</p><div class="choices">'+choice('server',{value:'none',text:l.serverNo},'',!state.torrserverUrl)+choice('server',{value:'yes',text:l.serverYes},'',!!state.torrserverUrl)+'</div><div id="url-box"><label class="field-label" for="server-url">'+l.serverLabel+'</label><input class="input" id="server-url" type="url" inputmode="url" spellcheck="false" autocomplete="off" placeholder="http://192.168.1.100:8090"><small class="error" id="server-error"></small></div>';
  el('server-url').value=state.torrserverUrl;
  const toggle=()=>{const on=document.querySelector('input[name=server]:checked').value==='yes';el('url-box').hidden=!on;document.querySelectorAll('.choice').forEach(x=>x.classList.toggle('selected',x.querySelector('input').checked));};
  document.querySelectorAll('input[name=server]').forEach(x=>x.addEventListener('change',()=>{if(x.value==='none')state.torrserverUrl='';toggle();}));
  toggle();
 }
 if(k===3){
  content.innerHTML='<p class="help">'+l.parserHelp+'</p><div class="choices">'+[['jackett',l.parserJackett],['prowlarr',l.parserProwlarr],['torrserver',l.parserTorr]].map(x=>choice('parser',{value:x[0],text:x[1]},'',x[0]===state.parserType)).join('')+'</div>';
  document.querySelectorAll('input[name=parser]').forEach(x=>x.addEventListener('change',()=>{state.parserType=x.value;document.querySelectorAll('.choice').forEach(y=>y.classList.toggle('selected',y.querySelector('input').checked));}));
 }
 if(k===4){
  content.innerHTML='<p class="help">'+l.pluginsHelp+'</p><div class="choices">'+choice('plugins',{value:'off',text:l.pluginsOff},'',!state.pluginsEnabled)+choice('plugins',{value:'on',text:l.pluginsOn},'',state.pluginsEnabled)+'</div>';
  document.querySelectorAll('input[name=plugins]').forEach(x=>x.addEventListener('change',()=>{state.pluginsEnabled=x.value==='on';document.querySelectorAll('.choice').forEach(y=>y.classList.toggle('selected',y.querySelector('input').checked));}));
 }
 if(k===5){
  const values=[[l.configLanguage,languageNames[state.language]],[l.configLanguages,'21'],[l.configServer,state.torrserverUrl||l.notSet],[l.configParser,state.parserType],[l.configPlugins,state.pluginsEnabled?l.enabled:l.disabled],[l.configOutput,'Lampa-Multilingual.wgt']];
  content.innerHTML='<p class="help">'+l.reviewHelp+'</p><div class="review">'+values.map(x=>'<div><span>'+html(x[0])+'</span><strong>'+html(x[1])+'</strong></div>').join('')+'</div>';
 }
 if(k===6&&!content.dataset.completed)content.innerHTML='<div class="result-icon">✓</div><h3>'+l.success+'</h3><p>'+l.successDescription+'</p>';
}
function validUrl(raw){
 try{const u=new URL(raw);return ['http:','https:'].includes(u.protocol)&&u.hostname&&!u.username&&!u.password&&!u.search&&!u.hash&&!/\s/.test(raw);}catch{return false;}
}
function readStep(){
 if(state.step===2){
  const on=document.querySelector('input[name=server]:checked')?.value==='yes';
  const value=on?el('server-url').value.trim():'';
  if(on&&!validUrl(value)){el('server-error').textContent=t().serverError;el('server-url').focus();return false;}
  state.torrserverUrl=value;
 }
 return true;
}
async function build(){
 const l=t();state.busy=true;render();
 el('content').innerHTML='<div class="spinner"></div><h3>'+l.building+'</h3><p>'+l.buildHint+'</p><pre id="log" class="build-log" aria-label="Build log"></pre>';
 try{
  const response=await fetch('/api/build',{method:'POST',headers:{'Content-Type':'application/json','X-Builder-Token':state.token},body:JSON.stringify({language:state.language,torrserverUrl:state.torrserverUrl,parserType:state.parserType,pluginsEnabled:state.pluginsEnabled})});
  if(!response.ok)throw Error((await response.json()).error||'Build request failed');
  const reader=response.body.getReader(),decoder=new TextDecoder();let buffer='',complete=false;
  while(true){
   const {done,value}=await reader.read();if(done)break;buffer+=decoder.decode(value,{stream:true});
   const segments=buffer.split('\n\n');buffer=segments.pop();
   for(const item of segments){
    const kind=item.match(/^event: (.*)$/m)?.[1],raw=item.match(/^data: (.*)$/m)?.[1];if(!raw)continue;
    const data=JSON.parse(raw);
    if(kind==='log'){
      const box=el('log');box.textContent=(box.textContent+data.text).slice(-10000);box.scrollTop=box.scrollHeight;
    }
    if(kind==='failure')throw Error(data.error);
    if(kind==='complete'){
      complete=true;state.step=6;state.busy=false;render();
      const panel=el('content');panel.dataset.completed='true';
      panel.innerHTML='<div class="result-icon">✓</div><h3>'+t().success+'</h3><p>'+t().successDescription+'</p><div class="result-detail">'+t().size+': '+(data.size/1024/1024).toFixed(2)+' MB<br>'+t().sha+': <code>'+html(data.sha256)+'</code></div><a class="button primary download" href="'+data.download+'">'+t().download+' ↓</a> <a class="button ghost download" href="https://github.com/vbrekher/lampa-personal-edition/blob/main/docs/INSTALLATION.md" target="_blank" rel="noopener noreferrer">'+t().install+' ↗</a>';
      el('next').hidden=false;el('next').textContent=t().again;
    }
   }
  }
  if(!complete)throw Error('Build stream ended before completion');
 }catch(error){
  state.busy=false;el('next').hidden=false;el('next').textContent=t().tryAgain;el('cancel').hidden=true;
  el('content').innerHTML='<div class="failure-icon">!</div><h3>'+t().failure+'</h3><p class="error">'+html(String(error.message||error))+'</p>';
 }
}
el('back').onclick=()=>{if(state.step>0&&!state.busy){state.step--;render();}};
el('next').onclick=()=>{
 if(state.busy)return;
 if(state.step===6){state.step=0;el('content').removeAttribute('data-completed');render();return;}
 if(!readStep())return;
 if(state.step===5){build();return;}
 state.step++;render();
};
el('cancel').onclick=async()=>{await fetch('/api/cancel',{method:'POST',headers:{'Content-Type':'application/json','X-Builder-Token':state.token},body:'{}'});};
el('ui-language').onchange=e=>{if(state.busy)return;state.ui=e.target.value;render();};
fetch('/api/config').then(r=>{if(!r.ok)throw Error('Cannot reach local builder');return r.json();}).then(data=>{state.token=data.token;render();}).catch(e=>{el('content').textContent='Local builder unavailable: '+e.message;el('next').disabled=true;});