/* NoteNest bleibt absichtlich ohne Abhängigkeiten und kann direkt geöffnet werden. */
const STORE = "notenlerner-v1";
const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const notePool = [
  { n:"C", o:4, midi:60 }, { n:"D", o:4, midi:62 }, { n:"E", o:4, midi:64 },
  { n:"F", o:4, midi:65 }, { n:"G", o:4, midi:67 }, { n:"A", o:4, midi:69 },
  { n:"B", o:4, midi:71 }, { n:"C", o:5, midi:72 }, { n:"D", o:5, midi:74 },
  { n:"E", o:5, midi:76 }, { n:"F", o:5, midi:77 }
];
const presets = [
  ["Warmer Start","🌼","E4-F5","name"],["Entdecker der Mitte","🌈","C4-G4","piano"],
  ["Eine Oktave","🚀","C4-C5","mixed"],["Linien und Zwischenräume","🪜","E4-F5","mixed"],
  ["Abenteuer mit Hilfslinien","🗺️","C4-F5","mixed"],["Bass-Anfang","🐻","F3-C4","piano"],
  ["Basslinien","🎵","G2-A3","name"],["Bass-Oktave","🌙","C3-C4","mixed"],
  ["Bass-Hilfslinien","🌲","F2-C4","mixed"],["Zwei Schlüssel","🌟","C3-C5","mixed"],
  ["Zwei Oktaven","🎨","C3-C5","mixed"],["Kreuz-Sterne","⭐","C4-C5","piano"],
  ["B-Wald","🍃","F3-C4","name"],["Großes Klavier","🎹","C3-C5","mixed"],
  ["Meisterabenteuer","🏆","C3-C5","mixed"],["Schnelle Fünf","⚡","C4-C5","name"],
  ["Klavierforscher","🎹","C3-C5","piano"]
].map((p,i)=>({id:"built-"+i,name:p[0],icon:p[1],range:p[2],type:p[3],builtIn:true}));
presets.forEach((preset,index)=>{
  preset.clef = index >= 5 && index <= 8 ? "bass" : index === 9 || index === 10 ? "both" : "treble";
});
const I18N = {
  de: {
    adventure:"Dein Musikabenteuer", find:"Finde die Noten.", intro:"Kleine Schritte, schöne Töne und ein freundlicher Musikfreund. Bereit für heute?",
    start:"▶ Los geht's", choose:"Wähle ein Abenteuer", days:"Übungstage", map:"Abenteuerkarte", mapSmall:"Deine nächste Noten-Insel",
    stickers:"Stickerbuch", stickersSmall:"gesammelt", free:"Freies Klavier", freeSmall:"Mach deine eigene Musik",
    progress:"Mein Lernstand", progressSmall:"Deine Fortschritte", sunshine:"Sonnenstrahlen diese Woche",
    sunshineText:"Jeder Übungstag lässt deine Musik wachsen.", mission:"Heutige Mission", missionText:"🎵 Finde fünf Noten und hole dir einen Stern!",
    questionName:"Welche Note ist das?", questionPiano:"Welche Klaviertaste passt?", tryIt:"Du schaffst das!", correct:"🌟 Super gemacht!",
    again:"Nochmal spielen", home:"Startseite", leave:"Runde verlassen? Dein Lernstand bleibt gespeichert.",
    almost:"🌤️ Fast! Versuch es bei der nächsten Note nochmal.", done:"Du hast es geschafft!", found:"Du hast {ok} von {all} Noten gefunden. Jede Note macht dich sicherer!",
    parent:"Elternbereich", parentStudio:"Elternbereich", setup:"Übung einstellen", setupText:"Stelle eine freundliche Übung für dein Kind zusammen.",
    questions:"Fragen pro Runde", choices:"Antworten", names:"Notennamen", sound:"Ton", soundOn:"An", soundOff:"Aus",
    labels:"Namen auf Klaviertasten", labelsOn:"Immer", labelsOff:"Versteckt", save:"Einstellungen speichern", dashboard:"Auswertung",
    presets:"Vorlagen", presetsText:"Fertige Spiele bleiben erhalten. Du kannst eigene Vorlagen speichern.",
    selected:"Ausgewählt", use:"Nehmen", savePreset:"＋ Aktuelle Einstellungen als Vorlage speichern", presetName:"Name der Vorlage",
    garden:"Lerngarten", gardenText:"Hier sehen Erwachsene den Lernfortschritt.", tried:"Noten versucht", accuracy:"Treffer", practiceDays:"Übungstage",
    recent:"Letzte Übung", recentText:"{ok} schöne erste Treffer bei {all} Antworten.", empty:"Noch keine Übung – dein erstes Abenteuer wartet!",
    freeTitle:"Mach Musik!", freeText:"Tippe auf eine Taste und höre sie singen.", freeHint:"🎶 Jeder Ton ist eine Entdeckung.",
    storage:"Der Speicher ist gerade nicht verfügbar.", notQuite:"Nicht ganz – hol einen Erwachsenen dazu.", stickersToast:"Übe weiter, dann füllt sich dein Stickerbuch!",
    gate:"Elternschutz: Wie viel ist 2 + 3?", questionExit:"✕", lang:"Sprache", german:"Deutsch", english:"Englisch", solfege:"Solfège", clef:"Schlüssel", treble:"Violinschlüssel", bass:"Bassschlüssel", typeName:"Notenname", typePiano:"Klavier", typeMixed:"Gemischt", hideBlack:"Schwarze Tasten ausblenden"
  },
  en: {
    adventure:"Your music adventure", find:"Find the notes.", intro:"Little steps, bright sounds and a friendly music buddy. Ready for today?",
    start:"▶ Start playing", choose:"Choose an adventure", days:"Practice days", map:"Adventure map", mapSmall:"Your next note island",
    stickers:"Sticker book", stickersSmall:"collected", free:"Free piano", freeSmall:"Make your own music",
    progress:"My progress", progressSmall:"See your progress", sunshine:"Sunshine this week",
    sunshineText:"Every practice day helps your music grow.", mission:"Today's mission", missionText:"🎵 Find five notes and earn a star!",
    questionName:"Which note is this?", questionPiano:"Which piano key fits?", tryIt:"You can do it!", correct:"🌟 Wonderful!",
    again:"Play again", home:"Home", leave:"Leave this round? Your progress will stay safe.",
    almost:"🌤️ Almost! Try the next note.", done:"You did it!", found:"You found {ok} of {all} notes. Every note makes you stronger!",
    parent:"Parent area", parentStudio:"Parent studio", setup:"Practice setup", setupText:"Make a gentle practice game for your child.",
    questions:"Questions per round", choices:"Answers", names:"Note names", sound:"Sound", soundOn:"On", soundOff:"Off",
    labels:"Names on piano keys", labelsOn:"Always", labelsOff:"Hidden", save:"Save settings", dashboard:"Dashboard",
    presets:"Presets", presetsText:"Built-in games stay safe. You can save your own presets.",
    selected:"Selected", use:"Use", savePreset:"＋ Save current settings as preset", presetName:"Preset name",
    garden:"Progress garden", gardenText:"A grown-up view of learning progress.", tried:"Notes tried", accuracy:"Accuracy", practiceDays:"Practice days",
    recent:"Recent practice", recentText:"{ok} happy first tries out of {all} answers.", empty:"No practice yet - your first adventure is waiting!",
    freeTitle:"Make some music!", freeText:"Tap a key and hear it sing.", freeHint:"🎶 Every sound is a discovery.",
    storage:"Storage is unavailable on this device.", notQuite:"Not quite - ask a grown-up to help.", stickersToast:"Keep practicing to fill your sticker book!",
    gate:"Parent gate: what is 2 + 3?", questionExit:"✕", lang:"Language", german:"German", english:"English", solfege:"Solfege", clef:"Clef", treble:"Treble clef", bass:"Bass clef", typeName:"Note name", typePiano:"Piano", typeMixed:"Mixed", hideBlack:"Hide black keys"
  }
};
const savedState = load();
let state = savedState || { preset:presets[0].id, language:"de", settings:{questions:5,choices:4,sound:true,clef:"treble",naming:"german",pianoLabels:true,hideBlackKeys:false}, results:[], custom:[], round:null };
if(!savedState?.language) { state.language="de"; state.settings.naming="german"; }
state.language ||= "de";
state.settings ||= {questions:5,choices:4,sound:true,clef:"treble",naming:"german",pianoLabels:true};
state.settings.naming ||= "german";
state.settings.hideBlackKeys ??= false;
let audio;
const t = (key, vars={}) => Object.entries(vars).reduce((s,[k,v])=>s.replace(`{${k}}`,v), I18N[state.language]?.[key] || I18N.de[key] || key);
function load() { try { return JSON.parse(localStorage.getItem(STORE)); } catch (_) { return null; } }
function save() { try { localStorage.setItem(STORE,JSON.stringify(state)); } catch (_) { toast(t("storage")); } }
function escapeHtml(s) { return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c])); }
function el(html) { const root=document.createElement("div"); root.innerHTML=html.trim(); return root.firstElementChild; }
function app(html) { document.querySelector("#app").replaceChildren(el(html)); document.documentElement.lang=state.language; }
function toast(message) { const old=document.querySelector(".toast"); if(old) old.remove(); const node=el(`<div class="toast">${escapeHtml(message)}</div>`); document.body.append(node); setTimeout(()=>node.remove(),2500); }
function playTone(midi,happy=false) {
  if(!state.settings.sound) return;
  try { audio ||= new(window.AudioContext||window.webkitAudioContext)(); const o=audio.createOscillator(),g=audio.createGain(); o.type="triangle"; o.frequency.value=440*Math.pow(2,(midi-69)/12); g.gain.setValueAtTime(.0001,audio.currentTime); g.gain.exponentialRampToValueAtTime(.18,audio.currentTime+.02); g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+(happy?.35:.22)); o.connect(g).connect(audio.destination); o.start(); o.stop(audio.currentTime+(happy?.35:.22)); } catch (_) {}
}
function speak(text) { try { const u=new SpeechSynthesisUtterance(text); u.lang="de-DE"; window.speechSynthesis?.speak(u); } catch (_) {} }
function currentPreset() { return [...presets,...state.custom].find(p=>p.id===state.preset)||presets[0]; }
function typeLabel(type) { return type==="name"?t("typeName"):type==="piano"?t("typePiano"):t("typeMixed"); }
function noteLabel(note) {
  if(state.settings.naming==="solfege") return ({C:"Do",D:"Re",E:"Mi",F:"Fa",G:"Sol",A:"La",B:"Ti"})[note.n];
  if(state.settings.naming==="german") return note.n==="B"?"H":note.n;
  return note.n;
}
const VEX = window.Vex?.Flow;
const STAFF_OPTIONS = { width: 700, height: 270, x: 34, y: 76, staveWidth: 630, noteWidth: 520 };
function vexKey(note, accidental="") { return `${note.n.toLowerCase()}${accidental}/${note.o}`; }
function accidentalFor(note) { return note.accidental==="sharp"?"#":note.accidental==="flat"?"b":""; }
function renderStaff(container, options={}) {
  if(!VEX || !container) return null;
  const note=options.note || {n:"C",o:4,midi:60}, clef=options.clef || "treble";
  container.replaceChildren();
  const renderer=new VEX.Renderer(container,VEX.Renderer.Backends.SVG);
  renderer.resize(STAFF_OPTIONS.width,STAFF_OPTIONS.height);
  const context=renderer.getContext(), stave=new VEX.Stave(STAFF_OPTIONS.x,STAFF_OPTIONS.y,STAFF_OPTIONS.staveWidth);
  stave.addClef(clef); stave.setContext(context).draw();
  const key=vexKey(note,accidentalFor(note)), staveNote=new VEX.StaveNote({keys:[key],duration:options.duration||"w",clef});
  if(accidentalFor(note)) staveNote.addModifier(new VEX.Accidental(accidentalFor(note)),0);
  const voice=new VEX.Voice({num_beats:4,beat_value:4}); voice.addTickables([staveNote]);
  new VEX.Formatter().joinVoices([voice]).format([voice],STAFF_OPTIONS.noteWidth); voice.draw(context,stave);
  const svg=container.querySelector("svg"); if(svg) { svg.setAttribute("class","staff"); svg.setAttribute("role","img"); svg.setAttribute("aria-label",`${clef==="bass"?"Bassschlüssel":"Violinschlüssel"}, ${noteLabel(note)} ${note.o}`); }
  return svg;
}
function midiName(m) { const names=state.settings.naming==="german"?["C","Cis","D","Dis","E","F","Fis","G","Gis","A","B","H"]:["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"]; return names[m%12]; }
function pianoHtml(active) {
  const white=[]; for(let midi=48;midi<=84;midi++) if(![1,3,6,8,10].includes(midi%12)) white.push(midi);
  const black=[]; for(let midi=49;midi<=83;midi++) if([1,3,6,8,10].includes(midi%12)) black.push(midi);
  return `<div class="piano-scroll"><div class="piano" data-white-count="${white.length}" data-black-count="${black.length}">${white.map((m,i)=>`<button class="piano-key white ${m===active?"correct":""}" data-midi="${m}" data-answerable="true" style="left:${i*56}px" aria-label="Klaviertaste ${m===60?"Mittel-C":midiName(m)}">${m%12===0?`<span class="octave-label ${m===60?"middle-c-marker":"other-c-label"}">${m===60?"●":"C"+(m/12-1)}</span>`:""}${state.settings.pianoLabels&&m!==60?`<span>${midiName(m)}</span>`:""}</button>`).join("")}${state.settings.hideBlackKeys?"":black.map(m=>{const left=(white.findIndex(w=>w>m)-1)*56+40;return `<button class="piano-key black ${m===active?"correct":""}" data-midi="${m}" data-answerable="false" style="left:${left}px" aria-label="Klaviertaste ${midiName(m)}">${state.settings.pianoLabels?midiName(m):""}</button>`;}).join("")}</div></div>`;
}
function home() {
  const days=Math.min(7,new Set(state.results.map(r=>r.day)).size);
  const gameTiles=presets.map(p=>`<button class="game-tile" data-preset="${p.id}" aria-label="${escapeHtml(p.name)}"><span>${p.icon}</span><b>${escapeHtml(p.name)}</b></button>`).join("");
  app(`<div class="app-shell"><header class="topbar"><div class="brand"><span class="brand-icon">♪</span> NoteNest</div><div class="top-actions"><span class="pill">⭐ ${state.results.filter(r=>r.ok).length}</span><button class="icon-btn" id="parent" aria-label="${t("parent")}">⚙️</button></div></header><main class="main"><section class="hero"><div><div class="eyebrow">${t("adventure")}</div><h1>${t("adventure")}<br><span style="color:var(--pink)">${t("find")}</span></h1><p>${t("intro")}</p><button class="primary" id="play">${t("start")}</button></div><div class="mascot" aria-label="Freundlicher Fuchs">🦊</div></section><div class="section-title"><h2>${t("choose")}</h2><span class="pill">⭐ ${days}/7 ${t("days")}</span></div><div class="tiles"><button class="tile pink" id="adventure"><span class="tile-icon">🗺️</span><strong>${t("map")}</strong><small>${t("mapSmall")}</small></button><button class="tile gold" id="stickers"><span class="tile-icon">🎁</span><strong>${t("stickers")}</strong><small>${Math.min(30,Math.floor(state.results.length/3))} ${t("stickersSmall")}</small></button><button class="tile blue" id="free"><span class="tile-icon">🎹</span><strong>${t("free")}</strong><small>${t("freeSmall")}</small></button><button class="tile mint" id="stats"><span class="tile-icon">🌱</span><strong>${t("progress")}</strong><small>${t("progressSmall")}</small></button></div><div class="game-tiles">${gameTiles}</div><section class="progress-card"><div class="card"><h3>${t("sunshine")}</h3><div class="flowers">${"🌞".repeat(days)}${"⚪".repeat(7-days)}</div><p style="color:var(--muted)">${t("sunshineText")}</p></div><div class="card"><h3>${t("mission")}</h3><p>${t("missionText")}</p><div class="meter"><span style="width:${Math.min(100,state.results.length/5*100)}%"></span></div></div></section></main></div>`);
  document.querySelector("#play").onclick=()=>startRound(currentPreset()); let gateTimer; const gear=document.querySelector("#parent"); gear.onpointerdown=()=>{gateTimer=setTimeout(parentGate,1200);}; gear.onpointerup=()=>clearTimeout(gateTimer); gear.onpointerleave=()=>clearTimeout(gateTimer);
  document.querySelectorAll(".game-tile").forEach(tile=>tile.onclick=()=>{const p=presets.find(item=>item.id===tile.dataset.preset)||currentPreset();startRound(p);}); document.querySelector("#free").onclick=freePiano; document.querySelector("#stats").onclick=dashboard; document.querySelector("#adventure").onclick=adventure; document.querySelector("#stickers").onclick=stickers;
}
function presetClef(p) { return p.clef || state.settings.clef || "treble"; }
function midiForName(name,octave) { return ({C:0,D:2,E:4,F:5,G:7,A:9,B:11})[name]+(octave+1)*12; }
function notesForPreset(p) {
  const match=String(p.range||"C4-F5").match(/^([A-G])(\d)-([A-G])(\d)$/);
  if(!match) return notePool.slice();
  let low=midiForName(match[1],+match[2]),high=midiForName(match[3],+match[4]); if(low>high)[low,high]=[high,low];
  const result=[]; for(let octave=1;octave<=7;octave++) for(const name of LETTERS){const midi=midiForName(name,octave);if(midi>=low&&midi<=high)result.push({n:name,o:octave,midi});}
  return result.length?result:notePool.slice();
}
function startRound(p) { const clef=presetClef(p); state.round={preset:p.id,index:0,correct:0,notes:[],clef:clef==="both"?(Math.random()<.5?"treble":"bass"):clef}; save(); renderQuestion(); }
function questionNote(p) { const range=notesForPreset(p),pool=range.filter(n=>!state.round.notes.includes(n.midi)); const n=pool[Math.floor(Math.random()*pool.length)]||range[Math.floor(Math.random()*range.length)]; state.round.notes.push(n.midi); return n; }
function renderQuestion() {
  const r=state.round,p=[...presets,...state.custom].find(item=>item.id===r.preset)||currentPreset(),note=questionNote(p),range=notesForPreset(p),mode=p.type==="mixed"?["name","piano"][Math.floor(Math.random()*2)]:p.type==="piano"?"piano":"name"; if(p.clef==="both") r.clef=Math.random()<.5?"treble":"bass"; r.note=note;r.mode=mode;r.started=Date.now(); save();
  const choices=[note.n]; while(choices.length<Math.min(4,state.settings.choices)){const x=range[Math.floor(Math.random()*range.length)].n;if(!choices.includes(x))choices.push(x);} choices.sort(()=>Math.random()-.5);
  app(`<div class="app-shell"><header class="topbar"><div class="brand"><span class="brand-icon">♪</span> NoteNest</div><button class="icon-btn" id="exit" aria-label="${t("leave")}">${t("questionExit")}</button></header><main class="screen exercise-screen"><div class="progress-row"><span>⭐ ${r.index+1}/${state.settings.questions}</span><div class="meter"><span style="width:${r.index/state.settings.questions*100}%"></span></div><span>🌈 ${r.correct}</span></div><section class="card question-card"><div class="question-label">${mode==="piano"?t("questionPiano"):t("questionName")}</div><div class="staff-container" data-note="${note.midi}"></div>${mode==="piano"?pianoHtml():`<div class="choices">${choices.map(c=>`<button class="choice" data-answer="${c}" aria-label="Note ${noteLabel({n:c})}">${state.settings.naming==="german"&&c==="B"?"H":c}</button>`).join("")}</div>`}<div class="feedback" id="feedback">🦊 ${t("tryIt")}</div></section></main></div>`);
  renderStaff(document.querySelector(".staff-container"),{note,clef:r.clef});
  document.querySelector("#exit").onclick=()=>{if(confirm(t("leave")))home();}; document.querySelectorAll(".piano-key").forEach(k=>k.onclick=()=>{playTone(+k.dataset.midi);if(k.dataset.answerable==="true")answer(+k.dataset.midi,k);}); document.querySelectorAll(".choice").forEach(k=>k.onclick=()=>answer(k.dataset.answer,k));
}
function answer(value,target) {
  const r=state.round,ok=typeof value==="number"?value===r.note.midi:String(value)===r.note.n; playTone(typeof value==="number"?value:r.note.midi,ok); target.classList.add(ok?"correct":"wrong"); document.querySelector("#feedback").textContent=ok?t("correct"):t("almost");
  state.results.push({day:new Date().toISOString().slice(0,10),time:Date.now(),type:r.mode,clef:r.clef,note:r.note.midi,ok,answer:value,preset:r.preset,responseMs:Date.now()-r.started}); save();
  if(ok){r.correct++;setTimeout(()=>{r.index++;if(r.index>=state.settings.questions)summary();else renderQuestion();},650);} else setTimeout(()=>target.classList.remove("wrong"),650);
}
function summary() { const r=state.round,stars=Math.max(1,Math.round(r.correct/r.index*3)); app(`<div class="app-shell"><main class="screen" style="padding-top:8vh"><section class="card question-card"><div class="mascot" style="width:180px;font-size:4rem">🦊</div><h1 style="font-size:3.3rem">${t("done")}</h1><div style="font-size:3rem">${"⭐".repeat(stars)}${"☆".repeat(3-stars)}</div><p>${t("found",{ok:r.correct,all:r.index})}</p><div class="tool-row" style="justify-content:center"><button class="primary" id="again">${t("again")}</button><button class="secondary" id="home">${t("home")}</button></div></section></main></div>`); playTone(72,true); document.querySelector("#again").onclick=()=>startRound(currentPreset()); document.querySelector("#home").onclick=home; }
function parentGate(){const answer=prompt(t("gate"));if(answer==="5")parent();else if(answer!==null)toast(t("notQuite"));}
function parent() {
  app(`<div class="app-shell"><header class="topbar"><div class="brand"><span class="brand-icon">♪</span> ${t("parentStudio")}</div><button class="icon-btn" id="back" aria-label="${t("home")}">⌂</button></header><main class="screen"><section class="card"><h2>${t("setup")}</h2><p style="color:var(--muted)">${t("setupText")}</p><div class="settings-grid"><label class="field">${t("questions")}<select id="questions"><option>5</option><option>10</option><option>15</option><option>20</option></select></label><label class="field">${t("choices")}<select id="choices"><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option></select></label><label class="field">${t("names")}<select id="naming"><option value="german">${t("german")}</option><option value="english">${t("english")}</option><option value="solfege">${t("solfege")}</option></select></label><label class="field">${t("sound")}<select id="sound"><option value="true">${t("soundOn")}</option><option value="false">${t("soundOff")}</option></select></label><label class="field">${t("labels")}<select id="labels"><option value="true">${t("labelsOn")}</option><option value="false">${t("labelsOff")}</option></select></label><label class="field">${t("lang")}<select id="language"><option value="de">${t("german")}</option><option value="en">${t("english")}</option></select></label><label class="field">${t("clef")}<select id="clef"><option value="treble">${t("treble")}</option><option value="bass">${t("bass")}</option></select></label><label class="field">${t("hideBlack")}<select id="hide-black"><option value="false">${t("labelsOff")}</option><option value="true">${t("labelsOn")}</option></select></label></div><div class="tool-row"><button class="primary" id="save-settings">${t("save")}</button><button class="secondary" id="dashboard">${t("dashboard")}</button></div></section><section class="card" style="margin-top:16px"><h2>${t("presets")}</h2><p style="color:var(--muted)">${t("presetsText")}</p><div class="preset-list">${[...presets,...state.custom].map(p=>`<div class="preset"><span>${p.icon} <b>${escapeHtml(p.name)}</b><small> · ${typeLabel(p.type)}</small></span><button class="tiny choose" data-id="${p.id}">${p.id===state.preset?t("selected"):t("use")}</button></div>`).join("")}</div><button class="secondary" id="new-preset">${t("savePreset")}</button></section></main></div>`);
  document.querySelector("#back").onclick=home; document.querySelector("#dashboard").onclick=dashboard; document.querySelector("#questions").value=state.settings.questions; document.querySelector("#choices").value=state.settings.choices; document.querySelector("#naming").value=state.settings.naming; document.querySelector("#sound").value=String(state.settings.sound); document.querySelector("#labels").value=String(state.settings.pianoLabels); document.querySelector("#language").value=state.language; document.querySelector("#clef").value=state.settings.clef; document.querySelector("#hide-black").value=String(state.settings.hideBlackKeys);
  document.querySelector("#save-settings").onclick=()=>{state.settings.questions=+document.querySelector("#questions").value;state.settings.choices=+document.querySelector("#choices").value;state.settings.naming=document.querySelector("#naming").value;state.settings.sound=document.querySelector("#sound").value==="true";state.settings.pianoLabels=document.querySelector("#labels").value==="true";state.settings.clef=document.querySelector("#clef").value;state.settings.hideBlackKeys=document.querySelector("#hide-black").value==="true";state.language=document.querySelector("#language").value;save();parent();};
  document.querySelectorAll(".choose").forEach(b=>b.onclick=()=>{state.preset=b.dataset.id;save();parent();}); document.querySelector("#new-preset").onclick=()=>{const name=prompt(t("presetName"));if(name){state.custom.push({id:"custom-"+Date.now(),name,icon:"🎼",type:"mixed",range:"C4-C5"});save();parent();}};
}
function dashboard(){const total=state.results.length,correct=state.results.filter(x=>x.ok).length;app(`<div class="app-shell"><header class="topbar"><div class="brand"><span class="brand-icon">♪</span> ${t("garden")}</div><button class="icon-btn" id="back" aria-label="${t("home")}">⌂</button></header><main class="screen"><section class="card"><h2>${t("garden")}</h2><p style="color:var(--muted)">${t("gardenText")}</p><div class="stat-grid"><div class="stat"><b>${total}</b>${t("tried")}</div><div class="stat"><b>${total?Math.round(correct/total*100):0}%</b>${t("accuracy")}</div><div class="stat"><b>${new Set(state.results.map(r=>r.day)).size}</b>${t("practiceDays")}</div></div><h3>${t("recent")}</h3>${total?`<div class="meter"><span style="width:${Math.round(correct/total*100)}%"></span></div><p>${t("recentText",{ok:correct,all:total})}</p>`:`<p>${t("empty")}</p>`}</section></main></div>`);document.querySelector("#back").onclick=home;}
function adventure(){toast(t("mapSmall"));startRound(currentPreset());}
function stickers(){toast(t("stickersToast"));}
function freePiano(){app(`<div class="app-shell"><header class="topbar"><div class="brand"><span class="brand-icon">♪</span> ${t("free")}</div><button class="icon-btn" id="back" aria-label="${t("home")}">⌂</button></header><main class="screen"><section class="card question-card"><h2>${t("freeTitle")}</h2><p>${t("freeText")}</p>${pianoHtml()}<div class="feedback">${t("freeHint")}</div></section></main></div>`);document.querySelector("#back").onclick=home;document.querySelectorAll(".piano-key").forEach(k=>k.onclick=()=>{playTone(+k.dataset.midi);k.classList.add("correct");setTimeout(()=>k.classList.remove("correct"),250);});}
function testPage() {
  const testNotes=[]; for(let octave=1;octave<=7;octave++) for(const n of LETTERS){const midi=({C:0,D:2,E:4,F:5,G:7,A:9,B:11})[n]+(octave+1)*12;if(midi>=33&&midi<=96)testNotes.push({n,o:octave,midi});}
  app(`<div class="app-shell"><header class="topbar"><div class="brand">🔧 Noten-Testseite</div><button class="icon-btn" id="back" aria-label="${t("home")}">⌂</button></header><main class="screen test-screen"><h2>Naturtöne – Violinschlüssel</h2><div class="test-grid" id="treble-grid"></div><h2>Naturtöne – Bassschlüssel</h2><div class="test-grid" id="bass-grid"></div><h2>Kreuztöne</h2><div class="test-grid" id="sharp-grid"></div><h2>Vier gleiche Mini-Notenzeilen</h2><div class="test-grid mini-grid" id="mini-grid"></div><h2>3-Oktaven-Klavier</h2>${pianoHtml()}</main></div>`);
  document.querySelector("#back").onclick=home;
  for(const note of testNotes){for(const [id,clef] of [["treble-grid","treble"],["bass-grid","bass"]]){const box=el(`<div class="mini-staff"><span>${note.n}${note.o}</span><div class="staff-container"></div></div>`);document.querySelector("#"+id).append(box);renderStaff(box.querySelector(".staff-container"),{note,clef});}}
  const sharpNames={1:"C",3:"D",6:"F",8:"G",10:"A"}; for(let midi=34;midi<=95;midi++) if(sharpNames[midi%12]){const note={n:sharpNames[midi%12],o:Math.floor(midi/12)-1,midi,accidental:"sharp"};const box=el(`<div class="mini-staff"><span>${midiName(note.midi)}</span><div class="staff-container"></div></div>`);document.querySelector("#sharp-grid").append(box);renderStaff(box.querySelector(".staff-container"),{note,clef:"treble"});}
  for(let i=0;i<4;i++){const box=el(`<div class="mini-staff"><div class="staff-container"></div></div>`);document.querySelector("#mini-grid").append(box);renderStaff(box.querySelector(".staff-container"),{note:notePool[i],clef:"treble"});}
}
function selfCheck(){
  console.assert(typeof renderStaff==="function"&&VEX,"VexFlow ist nicht geladen");
  for(let midi=21;midi<=96;midi++){const natural=notePool.find(n=>n.midi===midi);if(natural)console.assert(vexKey(natural)==`${natural.n.toLowerCase()}/${natural.o}`,"VexFlow-Key ist falsch");}
  const piano=el(pianoHtml()); const white=piano.querySelectorAll(".white"),black=piano.querySelectorAll(".black"); console.assert(white.length===21&&black.length===15,"3-Oktaven-Klavier hat falsche Tastenanzahl"); console.assert(piano.querySelector('[data-midi="60"] .middle-c-marker'),"Mittel-C fehlt");
  console.assert(!piano.querySelector('[data-midi="65"].black')&&!piano.querySelector('[data-midi="71"].black'),"Zwischen E-F oder H-C liegt eine schwarze Taste");
}
if(location.hash==="#/test") testPage(); else home(); selfCheck();
