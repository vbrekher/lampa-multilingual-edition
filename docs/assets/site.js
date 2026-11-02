// Public preview only. Real WGT builds run from npm run builder on the user's computer.
const screens={
 language:'<h3>Choose your language</h3><p>Every WGT contains all 21 interface languages.</p><div class="demo-options" id="demo-languages"><button type="button" class="selected" data-lang="nl">Nederlands ✓</button><button type="button" data-lang="de">Deutsch</button><button type="button" data-lang="ar" dir="rtl">العربية</button><button type="button" data-lang="ur" dir="rtl">اردو</button></div>',
 server:'<h3>TorrServer is optional</h3><p>You can build without a server address. Add a server later in the TV settings.</p><div class="demo-options"><button type="button" class="selected">No TorrServer ✓</button><button type="button">I have a server</button></div>',
 parser:'<h3>Choose a parser backend</h3><p>Your choice can be changed later on the TV.</p><div class="demo-options"><button type="button" class="selected">Jackett ✓</button><button type="button">Prowlarr</button><button type="button">TorrServer</button></div>',
 ready:'<h3>Review your settings</h3><p>Initial language: Nederlands<br>Available languages: 21<br>Parser: Jackett<br>TorrServer: Not configured<br>Third-party plugins: Disabled</p><p><strong>To generate a real WGT, run the local Builder on your computer.</strong></p>'
};
const buttons=document.querySelectorAll('[data-screen]');
const panel=document.getElementById('demo-panel');
if(panel&&buttons.length) {
 let language='nl';
 function show(name){
  buttons.forEach(b=>b.classList.toggle('active',b.dataset.screen===name));
  panel.innerHTML=screens[name];
  panel.querySelectorAll('[data-lang]').forEach(b=>{
   b.classList.toggle('selected',b.dataset.lang===language);
   b.onclick=()=>{language=b.dataset.lang;show('language');};
  });
  if(name==='ready')panel.querySelector('p').textContent='Initial language: '+({nl:'Nederlands',de:'Deutsch',ar:'العربية',ur:'اردو'}[language]||'Nederlands')+' | Available: 21 | Parser: Jackett | TorrServer: Not configured | Plugins: Disabled';
 }
 buttons.forEach(b=>b.addEventListener('click',()=>show(b.dataset.screen)));
}
const copy=document.getElementById('copy');
if(copy)copy.onclick=async()=>{
 const commands='git clone https://github.com/vbrekher/lampa-personal-edition.git\ncd lampa-personal-edition\nnpm ci\nnpm run builder';
 try{await navigator.clipboard.writeText(commands);copy.textContent='Copied ✓';}
 catch{copy.textContent='Select the commands above to copy';}
};