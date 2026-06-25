const animals = [
 ['🐻','Bear Buddy'],['🐰','Bunny Boo'],['🐱','Kitty Cutie'],['🐶','Puppy Prince'],['🦊','Fox Friend'],['🐼','Panda Pal'],['🐨','Koala Kiss'],['🐸','Froggy Flirt'],['🦁','Lion Love'],['🐯','Tiger Sweetie'],['🐮','Cow Cuddle'],['🐷','Piglet Pal'],['🐵','Monkey Muffin'],['🐧','Penguin Peach'],['🦆','Duck Darling'],['🦋','Butterfly Baby'],['🦄','Unicorn Angel'],['🐙','Octo Cutie'],['🐢','Turtle Honey'],['🦭','Seal Sweetheart'],['🦦','Otter Angel'],['🦥','Sloth Snuggles'],['🦝','Raccoon Rose'],['🐹','Hamster Honey'],['🐴','Pony Pal'],['🐺','Wolfie Wink'],['🐝','Bee Baby'],['🐞','Ladybug Love'],['🦖','Dino Darling'],['🐳','Whale Wishes']
];
const bows = ['🎀','💝','🌸','🌺','🌼','💐','✨','💫','⭐','🌙','🍓','🍒','🧁','🍬','💎','👑','🌻','🩷','🤍','🦋'];
const colors = ['Pink','Lavender','Sky','Peach','Mint','Cream','Rose','Blueberry','Sunset','Cotton Candy','Cherry','Lilac','Honey','Ocean','Blush'];
const accessories = ['✨','💖','🌹','🍓','🍯','🧸','☁️','💌','👑','🫶','🌷','🍪','🥐','🧋','🎈','🪄','🌟','🕶️','🧣','🌈','🍦','📸','🎧','🌊','🔥'];
const moods = ['sweet','silly','romantic','proud','cozy','princess','best-friend','missing-you','good-morning','good-night','hype','comfort'];
const backgrounds = ['soft hearts','cloudy cute','sunset glow','sparkle room','flower field','starry night','pink cafe','dreamy sky','beach day','cozy bedroom','forest walk','rainy window','snowy cabin','sakura garden','moon picnic'];
const styles = ['simple','extra cute','love letter','funny','princess treatment','hype her up','comfort note','from Ethan'];

const baseCompliments = [
 'You are the prettiest part of my day.','I hope you know how easy you are to love.','You make normal days feel special.','I am so proud of you, always.','Your smile is actually unfair.','You are my favorite person to talk to.','The world feels softer with you in it.','You deserve princess treatment every single day.','I love the way you care about people.','You are beautiful, inside and out.','I am lucky I get to be yours.','You make me want to be better.','Even on hard days, you are still amazing.','You are cute, funny, smart, and way too lovable.','I miss you even when I just saw you.','You are my safe place.','I love doing life with you.','You make everything more fun.','You are more than enough, always.','I would pick you again every time.','Dani, you make my day better just by being in it.','You are genuinely one of one.','You deserve a day that is as sweet as you are.','Ethan is thinking about you right now.','You are loved more than you probably realize.','You make my heart feel calm.','You are the kind of girl people write songs about.','You are my favorite hello and hardest goodbye.','I hope today treats you gently.','You look beautiful even when you do not try.'
];

const state = JSON.parse(localStorage.getItem('daniZooApp') || '{}');
const $ = id => document.getElementById(id);
function save(){ localStorage.setItem('daniZooApp', JSON.stringify(state)); }
function key(){ const d=new Date(); return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; }
function todayIndex(max,salt=0){ const d=new Date(); return (d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()+salt)%max; }
function fillSelect(id,arr,formatter=x=>Array.isArray(x)?`${x[0]} ${x[1]}`:x){ $(id).innerHTML=arr.map((x,i)=>`<option value="${i}">${formatter(x)}</option>`).join(''); }
function getCompliments(){ return [...baseCompliments, ...(state.customCompliments||[])]; }
function init(){
 fillSelect('animalSelect',animals); fillSelect('bowSelect',bows); fillSelect('colorSelect',colors); fillSelect('accessorySelect',accessories); fillSelect('moodSelect',moods); fillSelect('bgSelect',backgrounds); fillSelect('styleSelect',styles);
 state.yourName ??= 'Ethan'; state.herName ??= 'Dani'; state.fullName ??= 'Danielle Porter'; state.personalLine ??= 'you make every day better.'; state.nickname ??= 'Dani';
 if(state.lastOpen !== key()){ state.lastOpen=key(); state.streak=(state.streak||0)+1; state.unlocked=(state.unlocked||0)+1; state.animal=todayIndex(animals.length,7); state.bow=todayIndex(bows.length,19); state.color=todayIndex(colors.length,31); state.accessory=todayIndex(accessories.length,43); state.mood=todayIndex(moods.length,55); state.bg=todayIndex(backgrounds.length,67); state.style=todayIndex(styles.length,79); state.messageIndex=todayIndex(getCompliments().length,91); }
 ['animal','bow','color','accessory','mood','bg','style'].forEach(k=>state[k] ??= todayIndex(eval(k==='bg'?'backgrounds':k+'s').length,5));
 render();
}
function styledMessage(raw){
 const name=state.nickname||state.herName||'Dani', style=styles[state.style];
 if(style==='love letter') return `Dear ${name}, ${raw} — and Ethan means that with his whole heart.`;
 if(style==='funny') return `${raw} Also this animal said you are legally too cute.`;
 if(style==='princess treatment') return `${name}, reminder: ${raw} You deserve flowers, forehead kisses, and zero stress.`;
 if(style==='hype her up') return `${name}, do not forget: ${raw} You are THAT girl.`;
 if(style==='comfort note') return `${name}, breathe for a second. ${raw} Ethan is always rooting for you.`;
 if(style==='from Ethan') return `${name}, Ethan wanted me to tell you: ${raw}`;
 if(style==='extra cute') return `${raw} Sending you the biggest tiny animal hug right now.`;
 return raw;
}
function bg(){
 const palettes={Pink:['#fff1f7','#ffc6df'],Lavender:['#f5f0ff','#d8c7ff'],Sky:['#eef9ff','#bfe8ff'],Peach:['#fff1e6','#ffc99c'],Mint:['#effff8','#baf3d2'],Cream:['#fffdf2','#ffe8a8'],Rose:['#fff0f0','#ffb2b2'],Blueberry:['#f1f4ff','#becbff'],Sunset:['#fff4e8','#ffb4a8'],'Cotton Candy':['#fff0fb','#c9f0ff'],Cherry:['#fff0f2','#ff9cad'],Lilac:['#faf2ff','#dfb7ff'],Honey:['#fff9e8','#ffd166'],Ocean:['#eefbff','#8ed8ff'],Blush:['#fff5f5','#ffc0cb']};
 const p=palettes[colors[state.color]]||palettes.Pink; const b=backgrounds[state.bg];
 if(b.includes('night')||b.includes('moon')) return `radial-gradient(circle at top, ${p[1]}, #2c245a)`;
 if(b.includes('forest')) return `radial-gradient(circle at top, ${p[0]}, #b7e4c7)`;
 if(b.includes('beach')) return `radial-gradient(circle at top, ${p[0]}, #9be7ff)`;
 return `radial-gradient(circle at top, white, ${p[0]}, ${p[1]})`;
}
function render(){
 const [emoji,name]=animals[state.animal]; $('animal').textContent=emoji; $('animalName').textContent=name; $('bow').textContent=bows[state.bow]; $('accessory').textContent=accessories[state.accessory];
 const comps=getCompliments(); $('dailyMessage').textContent=styledMessage(comps[state.messageIndex%comps.length]);
 $('fromMeLine').textContent=`${state.herName || 'Dani'}, ${state.personalLine || 'you make every day better.'} — ${state.yourName || 'Ethan'}`;
 $('appTitle').textContent=`For ${state.herName || 'Dani'}`; $('datePill').textContent=new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});
 $('streakCount').textContent=state.streak||1; $('unlockCount').textContent=state.unlocked||1; $('comboCount').textContent=(animals.length*bows.length*colors.length).toLocaleString();
 $('animalStage').style.background=bg(); document.body.style.setProperty('--bg2', (colors[state.color]==='Lavender'?'#dfc7ff':'#ffd6ea'));
 $('nicknameInput').value=state.nickname||''; $('yourNameInput').value=state.yourName||'Ethan'; $('herNameInput').value=state.herName||'Dani'; $('personalLineInput').value=state.personalLine||'';
 ['animal','bow','color','accessory','mood','bg','style'].forEach(k=>$(k+'Select').value=state[k]);
 renderFavorites(); save();
}
function renderFavorites(){ const favs=state.favorites||[]; $('favoritesList').innerHTML=favs.length?favs.slice(-8).reverse().map(f=>`<div class="favorite-item">${f}</div>`).join(''):'<p class="small">No favorites yet. Save one Dani loves.</p>'; }
function randomize(){ state.animal=Math.floor(Math.random()*animals.length); state.bow=Math.floor(Math.random()*bows.length); state.color=Math.floor(Math.random()*colors.length); state.accessory=Math.floor(Math.random()*accessories.length); state.mood=Math.floor(Math.random()*moods.length); state.bg=Math.floor(Math.random()*backgrounds.length); state.style=Math.floor(Math.random()*styles.length); state.messageIndex=Math.floor(Math.random()*getCompliments().length); render(); }
init();
$('newNoteBtn').onclick=()=>{state.messageIndex=(state.messageIndex+1)%getCompliments().length;render();};
$('saveFavBtn').onclick=()=>{state.favorites??=[];state.favorites.push(`${animals[state.animal][0]} ${$('dailyMessage').textContent}`);render();};
$('randomizeBtn').onclick=randomize; $('settingsBtn').onclick=()=>$('settingsDialog').showModal();
$('saveSettings').onclick=()=>{state.herName=$('herNameInput').value.trim()||'Dani';state.yourName=$('yourNameInput').value.trim()||'Ethan';state.personalLine=$('personalLineInput').value.trim()||'you make every day better.';render();};
$('addCustomCompliment').onclick=()=>{const text=$('customComplimentInput').value.trim(); if(!text)return; state.customCompliments??=[]; state.customCompliments.push(text); $('customComplimentInput').value=''; state.messageIndex=getCompliments().length-1; render();};
['animal','bow','color','accessory','mood','bg','style'].forEach(k=>$(k+'Select').onchange=e=>{state[k]=Number(e.target.value);render();});
$('nicknameInput').oninput=e=>{state.nickname=e.target.value.trim();render();};
