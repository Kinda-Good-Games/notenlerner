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
  ["Warmer Start","🌼","E4-F5","staff-note",1],["Entdecker der Mitte","🌈","C4-G4","staff-piano",1],
  ["Eine Oktave","🚀","C4-C5","mixed",2],["Linien und Zwischenräume","🪜","E4-F5","mixed",2],
  ["Abenteuer mit Hilfslinien","🗺️","C4-F5","mixed",3],["Bass-Anfang","🐻","F3-C4","staff-piano",1],
  ["Basslinien","🎵","G2-A3","staff-note",1],["Bass-Oktave","🌙","C3-C4","mixed",2],
  ["Bass-Hilfslinien","🌲","F2-C4","mixed",3],["Zwei Schlüssel","🌟","C3-C5","mixed",2],
  ["Zwei Oktaven","🎨","C3-C5","mixed",3],  ["Kreuz-Sterne","⭐","C4-C5","staff-piano",3,"sharps"],
  ["B-Wald","🍃","F3-C4","staff-note",2],["Großes Klavier","🎹","C3-C5","mixed",3],
  ["Meisterabenteuer","🏆","C3-C5","mixed",3],["Schnelle Fünf","⚡","C4-C5","staff-note",1],
  ["Klavierforscher","🎹","C3-C5","staff-piano",2],
  ["Tasten-Noten","🎹","C4-C5","piano-note",1],["Vom Klavier zur Notenzeile","🎼","C3-C5","piano-staff",2],
  ["b-Wiesen","🍀","C4-C5","staff-note",3,"flats"],["Vorzeichen-Meister","🎼","C3-C5","mixed",3,"both"]
].map((p,i)=>({id:"built-"+i,name:p[0],icon:p[1],range:p[2],type:p[3],difficulty:p[4],accidentalMode:p[5]||"natural",builtIn:true}));
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
    questionName:"Welche Note ist das?", questionPiano:"Welche Klaviertaste passt?", questionPianoNote:"Welche Note gehört zu dieser Taste?", questionPianoStaff:"Welche Notenzeile passt?", tryIt:"Du schaffst das!", correct:"🌟 Super gemacht!",
    again:"Nochmal spielen", home:"Startseite", leave:"Runde verlassen? Dein Lernstand bleibt gespeichert.",
    almost:"🌤️ Fast! Versuch es bei der nächsten Note nochmal.", done:"Du hast es geschafft!", found:"Du hast {ok} von {all} Noten gefunden. Jede Note macht dich sicherer!",
    parent:"Elternbereich", parentStudio:"Elternbereich", setup:"Übung einstellen", setupText:"Stelle eine freundliche Übung für dein Kind zusammen.",
    questions:"Fragen pro Runde", choices:"Antworten", names:"Notennamen", sound:"Ton", soundOn:"An", soundOff:"Aus", instrument:"Instrument", piano:"Klavier", marimba:"Marimba", organ:"Orgel", bell:"Glocke",
    labels:"Namen auf Klaviertasten", labelsOn:"Immer", labelsOff:"Versteckt", save:"Einstellungen speichern", dashboard:"Auswertung",
    presets:"Vorlagen", presetsText:"Fertige Spiele bleiben erhalten. Du kannst eigene Vorlagen speichern.",
    selected:"Ausgewählt", use:"Nehmen", savePreset:"＋ Aktuelle Einstellungen als Vorlage speichern", presetName:"Name der Vorlage",
    garden:"Lerngarten", gardenText:"Hier sehen Erwachsene den Lernfortschritt.", tried:"Noten versucht", accuracy:"Treffer", practiceDays:"Übungstage",
    recent:"Letzte Übung", recentText:"{ok} schöne erste Treffer bei {all} Antworten.", empty:"Noch keine Übung – dein erstes Abenteuer wartet!",
    freeTitle:"Mach Musik!", freeText:"Tippe auf eine Taste und höre sie singen.", freeHint:"🎶 Jeder Ton ist eine Entdeckung.",
    storage:"Der Speicher ist gerade nicht verfügbar.", notQuite:"Nicht ganz – hol einen Erwachsenen dazu.", stickersToast:"Übe weiter, dann füllt sich dein Stickerbuch!",
    gate:"Elternschutz: Wie viel ist 2 + 3?", questionExit:"✕", lang:"Sprache", german:"Deutsch", english:"Englisch", solfege:"Solfège", clef:"Schlüssel", treble:"Violinschlüssel", bass:"Bassschlüssel", typeStaffNote:"Notenzeile → Notenname", typeStaffPiano:"Notenzeile → Klavier", typePianoNote:"Klavier → Notenname", typePianoStaff:"Klavier → Notenzeile", typeMixed:"Gemischt", difficulty:"Schwierigkeit", easy:"Leicht", medium:"Mittel", hard:"Knifflig", hideBlack:"Schwarze Tasten ausblenden", celebrations:"Sticker-Feiern", celebrationsOn:"An", celebrationsOff:"Aus", resetStickers:"Stickerbuch zurücksetzen", resetStickersConfirm:"Wirklich nur das Stickerbuch zurücksetzen?", stickerNew:"NEU", stickerLocked:"Noch nicht", stickerNext:"Als Nächstes", stickerAll:"Alle", stickerGetting:"Start", stickerSkill:"Können", stickerExploration:"Entdecken", stickerConsistency:"Dranbleiben", stickerGrowth:"Wachsen", stickerMilestones:"Meilensteine", stickerUnlocked:"freigeschaltet", stickerProgress:"Fortschritt", stickerDate:"Freigeschaltet am", stickerClose:"Schließen", stickerEmpty:"Hier wartet dein nächster Sticker!", stickerTest:"Sticker-Testseite", stickerResetDone:"Dein Stickerbuch ist wieder leer. Deine Übungen bleiben da.", stickerRarityCommon:"Gemeinsam", stickerRarityRare:"Selten", stickerRarityEpic:"Episch", stickerRarityLegend:"Legendär", stickerTotal:"Sticker", stickerNewRow:"Neue Sticker"
  },
  en: {
    adventure:"Your music adventure", find:"Find the notes.", intro:"Little steps, bright sounds and a friendly music buddy. Ready for today?",
    start:"▶ Start playing", choose:"Choose an adventure", days:"Practice days", map:"Adventure map", mapSmall:"Your next note island",
    stickers:"Sticker book", stickersSmall:"collected", free:"Free piano", freeSmall:"Make your own music",
    progress:"My progress", progressSmall:"See your progress", sunshine:"Sunshine this week",
    sunshineText:"Every practice day helps your music grow.", mission:"Today's mission", missionText:"🎵 Find five notes and earn a star!",
    questionName:"Which note is this?", questionPiano:"Which piano key fits?", questionPianoNote:"Which note belongs to this key?", questionPianoStaff:"Which staff fits?", tryIt:"You can do it!", correct:"🌟 Wonderful!",
    again:"Play again", home:"Home", leave:"Leave this round? Your progress will stay safe.",
    almost:"🌤️ Almost! Try the next note.", done:"You did it!", found:"You found {ok} of {all} notes. Every note makes you stronger!",
    parent:"Parent area", parentStudio:"Parent studio", setup:"Practice setup", setupText:"Make a gentle practice game for your child.",
    questions:"Questions per round", choices:"Answers", names:"Note names", sound:"Sound", soundOn:"On", soundOff:"Off", instrument:"Instrument", piano:"Piano", marimba:"Marimba", organ:"Organ", bell:"Bell",
    labels:"Names on piano keys", labelsOn:"Always", labelsOff:"Hidden", save:"Save settings", dashboard:"Dashboard",
    presets:"Presets", presetsText:"Built-in games stay safe. You can save your own presets.",
    selected:"Selected", use:"Use", savePreset:"＋ Save current settings as preset", presetName:"Preset name",
    garden:"Progress garden", gardenText:"A grown-up view of learning progress.", tried:"Notes tried", accuracy:"Accuracy", practiceDays:"Practice days",
    recent:"Recent practice", recentText:"{ok} happy first tries out of {all} answers.", empty:"No practice yet - your first adventure is waiting!",
    freeTitle:"Make some music!", freeText:"Tap a key and hear it sing.", freeHint:"🎶 Every sound is a discovery.",
    storage:"Storage is unavailable on this device.", notQuite:"Not quite - ask a grown-up to help.", stickersToast:"Keep practicing to fill your sticker book!",
    gate:"Parent gate: what is 2 + 3?", questionExit:"✕", lang:"Language", german:"German", english:"English", solfege:"Solfege", clef:"Clef", treble:"Treble clef", bass:"Bass clef", typeStaffNote:"Staff → note name", typeStaffPiano:"Staff → piano", typePianoNote:"Piano → note name", typePianoStaff:"Piano → staff", typeMixed:"Mixed", difficulty:"Difficulty", easy:"Easy", medium:"Medium", hard:"Challenging", hideBlack:"Hide black keys", celebrations:"Sticker celebrations", celebrationsOn:"On", celebrationsOff:"Off", resetStickers:"Reset sticker book", resetStickersConfirm:"Reset only the sticker book?", stickerNew:"NEW", stickerLocked:"Not yet", stickerNext:"Next up", stickerAll:"All", stickerGetting:"Getting started", stickerSkill:"Skill", stickerExploration:"Exploration", stickerConsistency:"Consistency", stickerGrowth:"Growth", stickerMilestones:"Milestones", stickerUnlocked:"unlocked", stickerProgress:"Progress", stickerDate:"Unlocked on", stickerClose:"Close", stickerEmpty:"Your next sticker is waiting!", stickerTest:"Sticker test page", stickerResetDone:"Your sticker book is empty again. Your practice stays safe.", stickerRarityCommon:"Common", stickerRarityRare:"Rare", stickerRarityEpic:"Epic", stickerRarityLegend:"Legend", stickerTotal:"Stickers", stickerNewRow:"New stickers"
  }
};
const savedState = load();
let state = savedState || { preset:presets[0].id, language:"de", settings:{questions:5,choices:4,sound:true,instrument:"piano",clef:"treble",naming:"german",pianoLabels:true,hideBlackKeys:false}, results:[], custom:[], round:null };
if(!savedState?.language) { state.language="de"; state.settings.naming="german"; }
state.language ||= "de";
state.settings ||= {questions:5,choices:4,sound:true,clef:"treble",naming:"german",pianoLabels:true};
state.settings.naming ||= "german";
state.settings.instrument ||= "piano";
state.settings.hideBlackKeys ??= false;
state.settings.celebrations ??= true;
state.results ||= [];
state.custom ||= [];
state.stickers ||= {unlocked:{},seen:{},pinned:[]};
state.stickers.unlocked ||= {}; state.stickers.seen ||= {}; state.stickers.pinned ||= [];
const stickerText=(de,en)=>({de,en});
const stickerDefs=[
  {id:"first-note",category:"getting",icon:"🌱",rarity:"common",secret:false,name:stickerText("Erste Note","First Note"),hint:stickerText("Beantworte eine Frage.","Answer one question."),progress:c=>({current:c.total,target:1})},
  {id:"hello-fox",category:"getting",icon:"🦊",rarity:"common",secret:false,name:stickerText("Hallo, Fuchs!","Hello Fox"),hint:stickerText("Beende deine erste Runde.","Finish your first round."),progress:c=>({current:c.finishedRounds,target:1})},
  {id:"ten-tries",category:"getting",icon:"🔟",rarity:"common",secret:false,name:stickerText("Zehn Versuche","Ten Tries"),hint:stickerText("Beantworte zehn Fragen.","Answer ten questions."),progress:c=>({current:c.total,target:10})},
  {id:"sound-on",category:"getting",icon:"🎵",rarity:"common",secret:false,name:stickerText("Klang an","Sound On"),hint:stickerText("Spiele eine Taste im freien Klavier.","Play a key in Free Piano."),progress:c=>({current:c.freePianoPlayed?1:0,target:1})},
  {id:"sharp-eye",category:"skill",icon:"👀",rarity:"common",secret:false,name:stickerText("Scharfer Blick","Sharp Eye"),hint:stickerText("Triff fünfmal direkt hintereinander.","Get five first-try answers in a row."),progress:c=>({current:c.bestFirstTryStreak,target:5})},
  {id:"hot-streak",category:"skill",icon:"🔥",rarity:"rare",secret:false,name:stickerText("Heiße Serie","Hot Streak"),hint:stickerText("Schaffe zehn direkte Treffer in Folge.","Get ten first-try answers in a row."),progress:c=>({current:c.bestFirstTryStreak,target:10})},
  {id:"lightning-streak",category:"skill",icon:"⚡",rarity:"epic",secret:false,name:stickerText("Blitzserie","Lightning Streak"),hint:stickerText("Schaffe zwanzig direkte Treffer in Folge.","Get twenty first-try answers in a row."),progress:c=>({current:c.bestFirstTryStreak,target:20})},
  {id:"perfect-round",category:"skill",icon:"💎",rarity:"rare",secret:false,name:stickerText("Perfekte Runde","Perfect Round"),hint:stickerText("Schaffe eine Runde ohne Fehler.","Finish one round with every answer right first try."),progress:c=>({current:c.perfectRounds,target:1})},
  {id:"perfect-five",category:"skill",icon:"🏅",rarity:"epic",secret:false,name:stickerText("Fünf perfekte Runden","Perfect x5"),hint:stickerText("Schaffe fünf perfekte Runden.","Finish five perfect rounds."),progress:c=>({current:c.perfectRounds,target:5})},
  {id:"quick-fox",category:"skill",icon:"🏃",rarity:"rare",secret:false,name:stickerText("Schneller Fuchs","Quick Fox"),hint:stickerText("Triff fünfmal direkt und schnell.","Get five first-try answers under three seconds in a row."),progress:c=>({current:c.bestQuickStreak,target:5})},
  ...LETTERS.map(letter=>({id:`note-${letter}`,category:"skill",icon:"🎼",rarity:"common",secret:false,name:stickerText(`Notenprofi ${letter}`,`Note Master ${letter}`),hint:stickerText(`Triff ${letter} fünfmal direkt.`,`Get ${letter} right first try five times.`),progress:c=>({current:c.firstTryByLetter[letter]||0,target:5}),letter})),
  {id:"treble-explorer",category:"exploration",icon:"🎻",rarity:"common",secret:false,name:stickerText("Violinschlüssel-Forscher","Treble Explorer"),hint:stickerText("Triff 25 Noten im Violinschlüssel.","Get 25 treble-clef answers right."),progress:c=>({current:c.correctByClef.treble||0,target:25})},
  {id:"bass-explorer",category:"exploration",icon:"🐻",rarity:"common",secret:false,name:stickerText("Bassschlüssel-Forscher","Bass Explorer"),hint:stickerText("Triff 25 Noten im Bassschlüssel.","Get 25 bass-clef answers right."),progress:c=>({current:c.correctByClef.bass||0,target:25})},
  {id:"two-worlds",category:"exploration",icon:"🌗",rarity:"rare",secret:false,name:stickerText("Zwei Welten","Two Worlds"),hint:stickerText("Triff beide Schlüssel in einer Runde.","Answer correctly in both clefs in one round."),progress:c=>({current:c.twoWorlds?1:0,target:1})},
  {id:"ledger-climber",category:"exploration",icon:"🧗",rarity:"rare",secret:false,name:stickerText("Hilfslinien-Kletterer","Ledger Climber"),hint:stickerText("Triff zehn Noten mit Hilfslinien.","Get ten ledger-line notes right."),progress:c=>({current:c.ledgerCorrect,target:10})},
  {id:"black-key-detective",category:"exploration",icon:"🕵️",rarity:"rare",secret:false,name:stickerText("Schwarze-Tasten-Detektiv","Black Key Detective"),hint:stickerText("Beantworte zehn Klaviertasten-Fragen.","Answer ten piano-key questions."),progress:c=>({current:c.pianoQuestions,target:10})},
  {id:"adventurer",category:"exploration",icon:"🗺️",rarity:"rare",secret:false,name:stickerText("Abenteurer","Adventurer"),hint:stickerText("Probiere acht verschiedene Vorlagen.","Try eight different presets."),progress:c=>({current:c.presets.size,target:8})},
  {id:"collector",category:"exploration",icon:"🧺",rarity:"epic",secret:false,name:stickerText("Sammler","Collector"),hint:stickerText("Probiere alle eingebauten Vorlagen.","Try all built-in presets."),progress:c=>({current:c.presets.size,target:presets.length})},
  {id:"both-names",category:"exploration",icon:"🔤",rarity:"rare",secret:false,name:stickerText("Beide Namen","Both Names"),hint:stickerText("Spiele mit Deutsch, Englisch und Solfège.","Practice with German, English and solfege."),progress:c=>({current:c.namings.size,target:3})},
  {id:"streak-2",category:"consistency",icon:"🌤️",rarity:"common",secret:false,name:stickerText("Zwei Tage","Two Days"),hint:stickerText("Übe an zwei Tagen hintereinander.","Practice on two days in a row."),progress:c=>({current:c.bestDayStreak,target:2})},
  {id:"streak-3",category:"consistency",icon:"🌈",rarity:"common",secret:false,name:stickerText("Drei Tage","Three Days"),hint:stickerText("Übe an drei Tagen hintereinander.","Practice on three days in a row."),progress:c=>({current:c.bestDayStreak,target:3})},
  {id:"streak-5",category:"consistency",icon:"☀️",rarity:"rare",secret:false,name:stickerText("Fünf Tage","Five Days"),hint:stickerText("Übe an fünf Tagen hintereinander.","Practice on five days in a row."),progress:c=>({current:c.bestDayStreak,target:5})},
  {id:"streak-7",category:"consistency",icon:"🌟",rarity:"epic",secret:false,name:stickerText("Sieben Tage","Seven Days"),hint:stickerText("Übe an sieben Tagen hintereinander.","Practice on seven days in a row."),progress:c=>({current:c.bestDayStreak,target:7})},
  {id:"sunshine-week",category:"consistency",icon:"🌞",rarity:"rare",secret:false,name:stickerText("Sonnenwoche","Sunshine Week"),hint:stickerText("Übe an sieben verschiedenen Tagen.","Practice on seven different days."),progress:c=>({current:c.days.size,target:7})},
  {id:"early-bird",category:"consistency",icon:"🐦",rarity:"common",secret:true,name:stickerText("Früher Vogel","Early Bird"),hint:stickerText("Ein kleiner Morgen-Rätselsticker.","A little morning mystery sticker."),progress:c=>({current:c.early?1:0,target:1})},
  {id:"night-owl",category:"consistency",icon:"🦉",rarity:"common",secret:true,name:stickerText("Nacht-Eule","Night Owl"),hint:stickerText("Ein kleiner Abend-Rätselsticker.","A little evening mystery sticker."),progress:c=>({current:c.night?1:0,target:1})},
  {id:"comeback",category:"consistency",icon:"🌱",rarity:"common",secret:true,name:stickerText("Willkommen zurück","Comeback"),hint:stickerText("Komm nach einer Pause wieder.","Come back after a little break."),progress:c=>({current:c.comeback?1:0,target:1})},
  {id:"getting-better",category:"growth",icon:"📈",rarity:"rare",secret:false,name:stickerText("Immer besser","Getting Better"),hint:stickerText("Verbessere deine letzten zwanzig Treffer.","Improve your accuracy by 15 points."),progress:c=>({current:c.improvementAccuracy?1:0,target:1})},
  {id:"speed-up",category:"growth",icon:"💨",rarity:"rare",secret:false,name:stickerText("Schneller werden","Speed Up"),hint:stickerText("Werde bei deinen Antworten schneller.","Make your last answers 20% faster."),progress:c=>({current:c.improvementSpeed?1:0,target:1})},
  {id:"tough-note",category:"growth",icon:"🛡️",rarity:"epic",secret:false,name:stickerText("Noten-Bändiger","Tough Note Tamer"),hint:stickerText("Triff eine früher knifflige Note direkt.","Get a note right first try after three misses."),progress:c=>({current:c.toughNote?1:0,target:1})},
  ...[[100,"Hundert Treffer","One Hundred"],[250,"Zweihundertfünfzig Treffer","Two Hundred Fifty"],[500,"Fünfhundert Treffer","Five Hundred"],[1000,"Tausend Treffer","One Thousand"]].map(([target,de,en],i)=>({id:`correct-${target}`,category:"milestones",icon:"🏆",rarity:i<2?"rare":i===2?"epic":"legend",secret:false,name:stickerText(de,en),hint:stickerText(`${target} richtige Antworten sammeln.`,`Collect ${target} correct answers.`),progress:c=>({current:c.correct,target})})),
  {id:"hunter-10",category:"milestones",icon:"🎯",rarity:"rare",secret:false,name:stickerText("Sticker-Jäger","Sticker Hunter"),hint:stickerText("Sammle zehn Sticker.","Collect ten stickers."),progress:c=>({current:c.unlockedCount,target:10})},
  {id:"hunter-20",category:"milestones",icon:"🎪",rarity:"epic",secret:false,name:stickerText("Sticker-Sammler","Sticker Hunter"),hint:stickerText("Sammle zwanzig Sticker.","Collect twenty stickers."),progress:c=>({current:c.unlockedCount,target:20})},
  {id:"master-streak-30",category:"skill",icon:"🌋",rarity:"rare",secret:false,name:stickerText("Meisterserie","Master Streak"),hint:stickerText("Triff dreißigmal direkt hintereinander.","Get thirty first-try answers in a row."),progress:c=>({current:c.bestFirstTryStreak,target:30})},
  {id:"master-streak-50",category:"skill",icon:"🚀",rarity:"epic",secret:false,name:stickerText("Unaufhaltsam","Unstoppable"),hint:stickerText("Triff fünfzigmal direkt hintereinander.","Get fifty first-try answers in a row."),progress:c=>({current:c.bestFirstTryStreak,target:50})},
  {id:"master-streak-100",category:"skill",icon:"🌌",rarity:"legend",secret:false,name:stickerText("Legendäre Serie","Legendary Streak"),hint:stickerText("Triff hundertmal direkt hintereinander.","Get one hundred first-try answers in a row."),progress:c=>({current:c.bestFirstTryStreak,target:100})},
  {id:"perfect-10",category:"skill",icon:"💠",rarity:"epic",secret:false,name:stickerText("Perfektionssammler","Perfect Ten"),hint:stickerText("Schaffe zehn perfekte Runden.","Finish ten perfect rounds."),progress:c=>({current:c.perfectRounds,target:10})},
  {id:"perfect-25",category:"skill",icon:"🏆",rarity:"legend",secret:false,name:stickerText("Makellose Legende","Perfect Twenty-Five"),hint:stickerText("Schaffe fünfundzwanzig perfekte Runden.","Finish twenty-five perfect rounds."),progress:c=>({current:c.perfectRounds,target:25})},
  {id:"speed-runner",category:"skill",icon:"💫",rarity:"epic",secret:false,name:stickerText("Tempo-Profi","Speed Runner"),hint:stickerText("Triff zehnmal direkt und schnell.","Get ten first-try answers under three seconds in a row."),progress:c=>({current:c.bestQuickStreak,target:10})},
  {id:"lightning-master",category:"skill",icon:"🌠",rarity:"legend",secret:false,name:stickerText("Blitzmeister","Lightning Master"),hint:stickerText("Triff zwanzigmal direkt und schnell.","Get twenty first-try answers under three seconds in a row."),progress:c=>({current:c.bestQuickStreak,target:20})},
  {id:"note-expert",category:"skill",icon:"🎓",rarity:"epic",secret:false,name:stickerText("Notenexperte","Note Expert"),hint:stickerText("Triff jeden Notenbuchstaben zwanzigmal direkt.","Get every note letter right first try twenty times."),progress:c=>({current:LETTERS.every(letter=>(c.firstTryByLetter[letter]||0)>=20)?1:0,target:1})},
  {id:"treble-champion",category:"exploration",icon:"👑",rarity:"rare",secret:false,name:stickerText("Violinschlüssel-Champion","Treble Champion"),hint:stickerText("Triff hundert Noten im Violinschlüssel.","Get 100 treble-clef answers right."),progress:c=>({current:c.correctByClef.treble||0,target:100})},
  {id:"bass-champion",category:"exploration",icon:"🛡️",rarity:"rare",secret:false,name:stickerText("Bassschlüssel-Champion","Bass Champion"),hint:stickerText("Triff hundert Noten im Bassschlüssel.","Get 100 bass-clef answers right."),progress:c=>({current:c.correctByClef.bass||0,target:100})},
  {id:"ledger-legend",category:"exploration",icon:"⛰️",rarity:"epic",secret:false,name:stickerText("Hilfslinien-Legende","Ledger Legend"),hint:stickerText("Triff fünfzig Noten mit Hilfslinien.","Get 50 ledger-line notes right."),progress:c=>({current:c.ledgerCorrect,target:50})},
  {id:"piano-virtuoso",category:"exploration",icon:"🎹",rarity:"epic",secret:false,name:stickerText("Klaviervirtuose","Piano Virtuoso"),hint:stickerText("Beantworte fünfzig Klaviertasten-Fragen.","Answer 50 piano-key questions."),progress:c=>({current:c.pianoQuestions,target:50})},
  {id:"piano-maestro",category:"exploration",icon:"🎼",rarity:"legend",secret:false,name:stickerText("Klaviermeister","Piano Maestro"),hint:stickerText("Beantworte hundert Klaviertasten-Fragen.","Answer 100 piano-key questions."),progress:c=>({current:c.pianoQuestions,target:100})},
  {id:"four-directions",category:"exploration",icon:"🧭",rarity:"rare",secret:false,name:stickerText("Vier Wege","Four Directions"),hint:stickerText("Spiele jeden Fragetyp mindestens einmal.","Try all four question types."),progress:c=>({current:c.types.size>=4?1:0,target:1})},
  {id:"chromatic-explorer",category:"exploration",icon:"🌈",rarity:"epic",secret:false,name:stickerText("Chromatik-Forscher","Chromatic Explorer"),hint:stickerText("Triff Noten aus allen zwölf Tonhöhenklassen.","Answer notes from all twelve pitch classes."),progress:c=>({current:c.notes.size,target:12})},
  {id:"fortnight-focus",category:"consistency",icon:"📅",rarity:"rare",secret:false,name:stickerText("Zwei-Wochen-Fokus","Fortnight Focus"),hint:stickerText("Übe vierzehn verschiedene Tage.","Practice on fourteen different days."),progress:c=>({current:c.days.size,target:14})},
  {id:"month-focus",category:"consistency",icon:"🗓️",rarity:"epic",secret:false,name:stickerText("Monatsfokus","Month Focus"),hint:stickerText("Übe dreißig verschiedene Tage.","Practice on thirty different days."),progress:c=>({current:c.days.size,target:30})},
  {id:"streak-14",category:"consistency",icon:"🔥",rarity:"epic",secret:false,name:stickerText("Vierzehn-Tage-Serie","Fourteen-Day Streak"),hint:stickerText("Übe vierzehn Tage hintereinander.","Practice fourteen days in a row."),progress:c=>({current:c.bestDayStreak,target:14})},
  {id:"streak-30",category:"consistency",icon:"☄️",rarity:"legend",secret:false,name:stickerText("Monatsserie","Thirty-Day Streak"),hint:stickerText("Übe dreißig Tage hintereinander.","Practice thirty days in a row."),progress:c=>({current:c.bestDayStreak,target:30})},
  {id:"correct-2500",category:"milestones",icon:"🏅",rarity:"epic",secret:false,name:stickerText("Zweieinhalbtausend","Two Thousand Five Hundred"),hint:stickerText("Sammle 2.500 richtige Antworten.","Collect 2,500 correct answers."),progress:c=>({current:c.correct,target:2500})},
  {id:"correct-5000",category:"milestones",icon:"💎",rarity:"legend",secret:false,name:stickerText("Fünftausend Treffer","Five Thousand"),hint:stickerText("Sammle 5.000 richtige Antworten.","Collect 5,000 correct answers."),progress:c=>({current:c.correct,target:5000})},
  {id:"rounds-10",category:"milestones",icon:"🎟️",rarity:"rare",secret:false,name:stickerText("Rundenprofi","Round Pro"),hint:stickerText("Beende zehn Runden.","Finish ten rounds."),progress:c=>({current:c.finishedRounds,target:10})},
  {id:"rounds-50",category:"milestones",icon:"🎡",rarity:"epic",secret:false,name:stickerText("Rundenmeister","Round Master"),hint:stickerText("Beende fünfzig Runden.","Finish fifty rounds."),progress:c=>({current:c.finishedRounds,target:50})},
  {id:"rounds-100",category:"milestones",icon:"🏰",rarity:"legend",secret:false,name:stickerText("Rundenlegende","Round Legend"),hint:stickerText("Beende hundert Runden.","Finish one hundred rounds."),progress:c=>({current:c.finishedRounds,target:100})},
  {id:"complete-collection",category:"milestones",icon:"👑",rarity:"legend",secret:false,name:stickerText("Volle Sammlung","Complete Collection"),hint:stickerText("Sammle alle normalen Sticker.","Collect every non-secret sticker."),progress:c=>({current:c.nonSecretUnlocked,target:c.nonSecretTotal})}
];
let audio,pianoHammerBuffer;
const t = (key, vars={}) => Object.entries(vars).reduce((s,[k,v])=>s.replace(`{${k}}`,v), I18N[state.language]?.[key] || I18N.de[key] || key);
function load() { try { return JSON.parse(localStorage.getItem(STORE)); } catch (_) { return null; } }
function save() { try { localStorage.setItem(STORE,JSON.stringify(state)); } catch (_) { toast(t("storage")); } }
function escapeHtml(s) { return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c])); }
function el(html) { const root=document.createElement("div"); root.innerHTML=html.trim(); return root.firstElementChild; }
function app(html) { document.querySelector("#app").replaceChildren(el(html)); document.documentElement.lang=state.language; }
function toast(message) { const old=document.querySelector(".toast"); if(old) old.remove(); const node=el(`<div class="toast">${escapeHtml(message)}</div>`); document.body.append(node); setTimeout(()=>node.remove(),2500); }
function rarityLabel(rarity) { return t(`stickerRarity${rarity[0].toUpperCase()+rarity.slice(1)}`); }
function noteLetterFromMidi(midi) { return ["C","","D","","E","F","","G","","A","","B"][midi%12]||""; }
function needsLedger(midi,clef) { return clef==="bass" ? midi<43||midi>57 : midi<64||midi>77; }
function stickerCopy(def,field) { const text=def[field]?.[state.language]||""; return def.letter?text.replace(new RegExp(`\\b${def.letter}\\b`,"g"),noteLabel({n:def.letter})):text; }
function buildContext() {
  const results=Array.isArray(state.results)?state.results:[], days=new Set(results.map(r=>r.day).filter(Boolean)), correct=results.filter(r=>r.ok), first=results.filter(r=>r.ok&&(r.attempt||1)===1);
  const correctByClef={}, firstTryByLetter={}, presetsUsed=new Set(), namings=new Set(), types=new Set(), notes=new Set(), rounds=new Map(), noteHistory=new Map();
  results.forEach(r=>{
    if(r.clef) correctByClef[r.clef]=(correctByClef[r.clef]||0)+(r.ok?1:0);
    if(r.preset) presetsUsed.add(r.preset);
    if(r.naming) namings.add(r.naming);
    if(r.type) types.add(r.type);
    if(r.note!==undefined) notes.add(r.note%12);
    const letter=noteLetterFromMidi(r.note); if(r.ok&&(r.attempt||1)===1&&letter) firstTryByLetter[letter]=(firstTryByLetter[letter]||0)+1;
    const roundId=r.roundId||`legacy-${r.qid||r.time}`, round=rounds.get(roundId)||{ids:new Set(),clefs:new Set(),all:[],finished:false};
    round.ids.add(r.qid||r.time); round.all.push(r); if(r.clef) round.clefs.add(r.clef); if(r.roundFinished)round.finished=true; rounds.set(roundId,round);
    if(r.note!==undefined){const history=noteHistory.get(r.note)||{wrong:0,rightFirst:false};if(!r.ok)history.wrong++;if(r.ok&&(r.attempt||1)===1)history.rightFirst=true;noteHistory.set(r.note,history);}
  });
  const ordered=[...results].sort((a,b)=>(a.time||0)-(b.time||0)), firstStreaks=[], quickStreaks=[]; let run=0,quick=0;
  ordered.forEach(r=>{const direct=r.ok&&(r.attempt||1)===1;run=direct?run+1:0;quick=direct&&r.responseMs<3000?quick+1:0;firstStreaks.push(run);quickStreaks.push(quick);});
  const dates=[...days].sort(), dayNumbers=dates.map(d=>Date.parse(`${d}T00:00:00Z`)), dayRuns=[]; let dayRun=0;
  dayNumbers.forEach((day,i)=>{dayRun=i&&day-dayNumbers[i-1]===86400000?dayRun+1:1;dayRuns.push(dayRun);});
  const now=new Date(), early=results.some(r=>new Date(r.time||0).getHours()<9), night=results.some(r=>new Date(r.time||0).getHours()>19);
  const lastDay=dayNumbers.length?dayNumbers[dayNumbers.length-1]:0, comeback=dayNumbers.some((day,i)=>i&&day-dayNumbers[i-1]>=3*86400000);
  const roundsList=[...rounds.values()], perfectRounds=roundsList.filter(r=>r.finished&&r.all.length&&r.all.every(x=>x.ok&&(x.attempt||1)===1)).length;
  const last20=ordered.slice(-20), before20=ordered.slice(-40,-20), accuracy=a=>a.length?a.filter(r=>r.ok).length/a.length:0, average=a=>a.length?a.reduce((s,r)=>s+(r.responseMs||Infinity),0)/a.length:Infinity;
  const ctx={total:results.length,correct:correct.length,firstTryCorrect:first.length,finishedRounds:roundsList.filter(r=>r.finished).length,days,bestDayStreak:Math.max(0,...dayRuns),currentDayStreak:dayRuns[dayRuns.length-1]||0,bestFirstTryStreak:Math.max(0,...firstStreaks),bestQuickStreak:Math.max(0,...quickStreaks),correctByClef,firstTryByLetter,perfectRounds,presets:presetsUsed,namings,types,notes,ledgerCorrect:correct.filter(r=>needsLedger(r.note,r.clef)).length,pianoQuestions:results.filter(r=>r.type==="staff-piano"||r.type==="piano-note"||r.type==="piano-staff").length,twoWorlds:roundsList.some(r=>r.clefs.has("treble")&&r.clefs.has("bass")),early,night,comeback,improvementAccuracy:last20.length===20&&before20.length===20&&accuracy(last20)>=accuracy(before20)+.15,improvementSpeed:last20.length===20&&before20.length===20&&average(last20)<=average(before20)*.8,toughNote:[...noteHistory.values()].some(n=>n.wrong>=3&&n.rightFirst),freePianoPlayed:!!state.freePianoPlayed,unlockedCount:Object.keys(state.stickers.unlocked).length,nonSecretTotal:stickerDefs.filter(s=>!s.secret).length,nonSecretUnlocked:stickerDefs.filter(s=>!s.secret&&state.stickers.unlocked[s.id]).length};
  return ctx;
}
let stickerToastQueue=[],stickerToastBusy=false;
function evaluateStickers() {
  try {
    const newly=[];
    for(let pass=0;pass<2;pass++){const ctx=buildContext();stickerDefs.forEach(def=>{if(state.stickers.unlocked[def.id])return;const progress=def.progress(ctx);if(progress&&progress.current>=progress.target){state.stickers.unlocked[def.id]=Date.now();newly.push(def.id);}});}
    if(newly.length){save();if(state.settings.celebrations)stickerToastQueue.push(...newly.filter((id,i)=>newly.indexOf(id)===i));}
    return newly;
  } catch (_) { return []; }
}
function flushStickerCelebrations() {
  if(stickerToastBusy||!state.settings.celebrations||!stickerToastQueue.length)return;
  const id=stickerToastQueue.shift(),def=stickerDefs.find(s=>s.id===id); if(!def)return flushStickerCelebrations();
  stickerToastBusy=true; const node=el(`<div class="sticker-toast rarity-${def.rarity}" role="status"><span class="sticker-toast-icon">${def.icon}</span><span><b>${escapeHtml(stickerCopy(def,"name"))}</b><small>${rarityLabel(def.rarity)}</small></span></div>`); document.body.append(node);
  playTone(76,true); setTimeout(()=>playTone(def.rarity==="legend"?84:def.rarity==="epic"?81:79,true),110);
  setTimeout(()=>{node.remove();stickerToastBusy=false;flushStickerCelebrations();},3000);
}
function stickerProgress(def,ctx=buildContext()) { try { const p=def.progress(ctx)||{current:0,target:1}; return {current:Math.max(0,Math.floor(p.current||0)),target:Math.max(1,Math.floor(p.target||1))}; } catch (_) { return {current:0,target:1}; } }
function pianoSound(now,fundamental,duration,happy) {
  const filter=audio.createBiquadFilter(),master=audio.createGain();
  filter.type="lowpass"; filter.frequency.setValueAtTime(6200,now); filter.frequency.exponentialRampToValueAtTime(2500,now+duration); filter.Q.value=.55;
  master.gain.setValueAtTime(.0001,now); master.gain.exponentialRampToValueAtTime(happy ? .16 : .23,now+.006); master.gain.exponentialRampToValueAtTime(.0001,now+duration);
  filter.connect(master).connect(audio.destination);
  const partials=[[1,.62,.92],[2.01,.28,.7],[3.02,.16,.56],[4.05,.1,.46],[5.1,.065,.37],[6.2,.04,.3],[7.3,.025,.25],[8.5,.014,.2]];
  partials.forEach(([ratio,amplitude,decay],index)=>{
    const voices=index?1:3;
    for(let voice=0;voice<voices;voice++){
      const oscillator=audio.createOscillator(),gain=audio.createGain();
      oscillator.type="sine"; oscillator.frequency.value=fundamental*ratio; oscillator.detune.value=voices===3?(voice-1)*(1.2+fundamental/500):0;
      const end=now+Math.max(.08,duration*decay);
      gain.gain.setValueAtTime(.0001,now); gain.gain.exponentialRampToValueAtTime(amplitude/(voices===3?1.7:1),now+.004+index*.0007); gain.gain.exponentialRampToValueAtTime(.0001,end);
      oscillator.connect(gain).connect(filter); oscillator.start(now); oscillator.stop(end+.03);
    }
  });
  if(!pianoHammerBuffer){
    const length=Math.floor(audio.sampleRate*.055); pianoHammerBuffer=audio.createBuffer(1,length,audio.sampleRate);
    const data=pianoHammerBuffer.getChannelData(0); for(let i=0;i<length;i++) data[i]=(Math.random()*2-1)*Math.pow(1-i/length,2.4);
  }
  const hammer=audio.createBufferSource(),hammerFilter=audio.createBiquadFilter(),hammerGain=audio.createGain();
  hammer.buffer=pianoHammerBuffer; hammerFilter.type="bandpass"; hammerFilter.frequency.value=Math.min(5200,1700+fundamental*.8); hammerFilter.Q.value=.7;
  hammerGain.gain.setValueAtTime(.0001,now); hammerGain.gain.exponentialRampToValueAtTime(.055,now+.001); hammerGain.gain.exponentialRampToValueAtTime(.0001,now+.05);
  hammer.connect(hammerFilter).connect(hammerGain).connect(master); hammer.start(now); hammer.stop(now+.06);
}
function playTone(midi,happy=false) {
  if(!state.settings.sound) return;
  try {
    audio ||= new(window.AudioContext||window.webkitAudioContext)();
    const profiles={
      piano:{duration:1.8},
      marimba:{duration:.8,attack:.008,filter:3000,type:"sine",partials:[[1,.72],[2,.28],[3,.16],[4,.08],[5,.03]]},
      organ:{duration:.95,attack:.025,filter:3600,type:"sine",partials:[[1,.5],[2,.24],[3,.18],[4,.12],[6,.06],[8,.025]]},
      bell:{duration:1.35,attack:.006,filter:5200,type:"sine",partials:[[1,.52],[2,.26],[3,.18],[4,.1],[6,.07],[8,.04]]}
    };
    const profile=profiles[state.settings.instrument]||profiles.piano;
    const now=audio.currentTime, duration=happy?.9:profile.duration, fundamental=440*Math.pow(2,(midi-69)/12);
    if(state.settings.instrument==="piano"){pianoSound(now,fundamental,duration,happy);return;}
    const filter=audio.createBiquadFilter(), master=audio.createGain();
    filter.type="lowpass"; filter.frequency.setValueAtTime(profile.filter,now); filter.Q.value=.7;
    master.gain.setValueAtTime(.0001,now); master.gain.exponentialRampToValueAtTime(.22,now+profile.attack); master.gain.exponentialRampToValueAtTime(.0001,now+duration);
    filter.connect(master).connect(audio.destination);
    profile.partials.forEach(([partial,amplitude])=>{
      const oscillator=audio.createOscillator(),gain=audio.createGain();
      oscillator.type=profile.type; oscillator.frequency.value=fundamental*partial;
      gain.gain.setValueAtTime(.0001,now); gain.gain.exponentialRampToValueAtTime(amplitude,now+profile.attack); gain.gain.exponentialRampToValueAtTime(.0001,now+duration*(.72+partial*.025));
      oscillator.connect(gain).connect(filter); oscillator.start(now); oscillator.stop(now+duration+.05);
    });
  } catch (_) {}
}
function speak(text) { try { const u=new SpeechSynthesisUtterance(text); u.lang="de-DE"; window.speechSynthesis?.speak(u); } catch (_) {} }
function currentPreset() { return [...presets,...state.custom].find(p=>p.id===state.preset)||presets[0]; }
function typeLabel(type) { return type==="staff-note"?t("typeStaffNote"):type==="staff-piano"?t("typeStaffPiano"):type==="piano-note"?t("typePianoNote"):type==="piano-staff"?t("typePianoStaff"):t("typeMixed"); }
function difficultyLabel(level) { return level===1?t("easy"):level===2?t("medium"):t("hard"); }
function modeForPreset(p) { return p.type==="mixed"?["staff-note","staff-piano","piano-note","piano-staff"][Math.floor(Math.random()*4)]:p.type; }
function noteLabel(note) {
  const natural=state.settings.naming==="solfege"?({C:"Do",D:"Re",E:"Mi",F:"Fa",G:"Sol",A:"La",B:"Ti"})[note.n]:state.settings.naming==="german"?(note.n==="B"?"H":note.n):note.n;
  if(!note.accidental)return natural;
  if(state.settings.naming==="german") return note.accidental==="sharp"?({C:"Cis",D:"Dis",F:"Fis",G:"Gis",A:"Ais"})[note.n]:({D:"Des",E:"Es",G:"Ges",A:"As",B:"B"}[note.n]);
  if(state.settings.naming==="solfege") return `${natural}${note.accidental==="sharp"?"♯":"♭"}`;
  return `${natural}${note.accidental==="sharp"?"♯":"♭"}`;
}
function noteKey(note) { return `${note.n}${note.accidental||""}${note.o}`; }
const VEX = window.Vex?.Flow;
/* VexFlow wird in seinen natürlichen Proportionen (10px Linienabstand) gezeichnet.
   Die ganze SVG wird anschließend über die viewBox skaliert, damit Schlüssel,
   Notenkopf, Hals und Hilfslinien zusammenpassen und scharf bleiben. */
const STAFF_OPTIONS = { width: 240, height: 170, x: 10, y: 65, staveWidth: 220, maxWidth: 420, color: "#2d2a4a" };
function vexKey(note, accidental="") { return `${note.n.toLowerCase()}${accidental}/${note.o}`; }
function accidentalFor(note) { return note.accidental==="sharp"?"#":note.accidental==="flat"?"b":""; }
function stemDirection(note,clef) {
  const middleLineMidi=clef==="bass"?50:71;
  return note.midi>=middleLineMidi?VEX.Stem.DOWN:VEX.Stem.UP;
}
function renderStaff(container, options={}) {
  if(!VEX || !container) return null;
  const note=options.note || {n:"C",o:4,midi:60}, clef=options.clef || "treble";
  const duration=options.duration||"q", color=options.color||STAFF_OPTIONS.color;
  const layout=options.compact?{width:220,height:155,x:5,y:35,staveWidth:210}:STAFF_OPTIONS;
  container.replaceChildren();
  const renderer=new VEX.Renderer(container,VEX.Renderer.Backends.SVG);
  renderer.resize(layout.width,layout.height);
  const context=renderer.getContext();
  try { context.setFillStyle(color); context.setStrokeStyle(color); } catch (_) {}
  const stave=new VEX.Stave(layout.x,layout.y,layout.staveWidth);
  stave.addClef(clef);
  try { stave.setStyle({fillStyle:color,strokeStyle:color}); } catch (_) {}
  stave.setContext(context).draw();
  const acc=accidentalFor(note);
  const staveNote=new VEX.StaveNote({keys:[vexKey(note,acc)],duration,clef,stem_direction:stemDirection(note,clef)});
  if(acc) staveNote.addModifier(new VEX.Accidental(acc),0);
  try { staveNote.setStyle({fillStyle:color,strokeStyle:color}); } catch (_) {}
  const voice=new VEX.Voice({num_beats:duration==="w"?4:1,beat_value:4}); voice.addTickables([staveNote]);
  new VEX.Formatter().joinVoices([voice]).format([voice],40);
  // Note in der freien Fläche hinter dem Schlüssel zentrieren
  const area=stave.getNoteEndX()-stave.getNoteStartX();
  staveNote.setXShift(Math.max(0,area/2-10));
  voice.draw(context,stave);
  const svg=container.querySelector("svg");
  if(svg) {
    svg.setAttribute("viewBox",`0 0 ${layout.width} ${layout.height}`);
    svg.removeAttribute("width"); svg.removeAttribute("height");
    svg.style.cssText=`display:block;width:100%;height:auto;max-width:${options.maxWidth||STAFF_OPTIONS.maxWidth}px;margin:0 auto;overflow:visible`;
    svg.setAttribute("class","staff"); svg.setAttribute("role","img");
    svg.setAttribute("aria-label",`${clef==="bass"?"Bassschlüssel":"Violinschlüssel"}, ${noteLabel(note)} ${note.o}`);
  }
  return svg;
}
function midiName(m) { const names=state.settings.naming==="german"?["C","Cis","D","Dis","E","F","Fis","G","Gis","A","B","H"]:["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"]; return names[m%12]; }
function midiNameVariants(m) {
  if(state.settings.naming==="german") return ({1:"Cis / Des",3:"Dis / Es",6:"Fis / Ges",8:"Gis / As",10:"Ais / B"})[m%12] || midiName(m);
  return ({1:"C♯ / D♭",3:"D♯ / E♭",6:"F♯ / G♭",8:"G♯ / A♭",10:"A♯ / B♭"})[m%12] || midiName(m);
}
function pianoHtml(active, options={}) {
  const showLabels=options.showLabels!==false&&state.settings.pianoLabels;
  const white=[]; for(let midi=48;midi<=84;midi++) if(![1,3,6,8,10].includes(midi%12)) white.push(midi);
  const black=[]; for(let midi=49;midi<=83;midi++) if([1,3,6,8,10].includes(midi%12)) black.push(midi);
  return `<div class="piano-scroll"><div class="piano" data-white-count="${white.length}" data-black-count="${black.length}">${white.map((m,i)=>`<button class="piano-key white ${m===active?"active":""}" data-midi="${m}" data-answerable="true" style="left:${i*56}px" aria-label="Klaviertaste ${m===60?"Mittel-C":midiName(m)}">${m%12===0?`<span class="octave-label ${m===60?"middle-c-marker":"other-c-label"}">${m===60?"● C":showLabels?"C"+(m/12-1):""}</span>`:""}${showLabels?`<span class="key-label">${midiName(m)}</span>`:""}</button>`).join("")}${state.settings.hideBlackKeys?"":black.map(m=>{const left=(white.findIndex(w=>w>m)-1)*56+40;return `<button class="piano-key black ${m===active?"active":""}" data-midi="${m}" data-answerable="false" style="left:${left}px" aria-label="Klaviertaste ${midiNameVariants(m)}">${showLabels?`<span class="key-label">${midiNameVariants(m)}</span>`:""}</button>`;}).join("")}</div></div>`;
}
function home() {
  const days=Math.min(7,new Set(state.results.map(r=>r.day)).size);
  const unlockedStickers=Object.keys(state.stickers.unlocked).length, unseenStickers=stickerDefs.some(s=>state.stickers.unlocked[s.id]&&!state.stickers.seen[s.id]);
  const gameTiles=[1,2,3].map(level=>{
    const levelPresets=presets.filter(p=>p.difficulty===level);
    const modes=["staff-note","staff-piano","piano-note","piano-staff","mixed"].map(mode=>{
      const modePresets=levelPresets.filter(p=>p.type===mode);
      if(!modePresets.length)return "";
      return `<div class="mode-block"><h4>${typeLabel(mode)}</h4><div class="game-tiles">${modePresets.map(p=>`<button class="game-tile" data-preset="${p.id}" aria-label="${escapeHtml(p.name)}"><span>${p.icon}</span><b>${escapeHtml(p.name)}</b></button>`).join("")}</div></div>`;
    }).join("");
    return `<section class="difficulty-block"><h3>${difficultyLabel(level)}</h3>${modes}</section>`;
  }).join("");
  app(`<div class="app-shell"><header class="topbar"><div class="brand"><span class="brand-icon">♪</span> NoteNest</div><div class="top-actions"><span class="pill">⭐ ${state.results.filter(r=>r.ok).length}</span><button class="icon-btn" id="parent" aria-label="${t("parent")}">⚙️</button></div></header><main class="main"><section class="hero"><div><div class="eyebrow">${t("adventure")}</div><h1>${t("adventure")}<br><span style="color:var(--pink)">${t("find")}</span></h1><p>${t("intro")}</p><button class="primary" id="play">${t("start")}</button></div><div class="mascot" aria-label="Freundlicher Fuchs">🦊</div></section><div class="section-title"><h2>${t("choose")}</h2><span class="pill">⭐ ${days}/7 ${t("days")}</span></div><div class="tiles"><button class="tile pink" id="adventure"><span class="tile-icon">🗺️</span><strong>${t("map")}</strong><small>${t("mapSmall")}</small></button><button class="tile gold sticker-home-tile" id="stickers"><span class="tile-icon">🎁</span><strong>${t("stickers")}${unseenStickers?"<i class=\"new-dot\" aria-label=\""+t("stickerNew")+"\"></i>":""}</strong><small>${unlockedStickers}/${stickerDefs.length} ${t("stickerTotal")}</small></button><button class="tile blue" id="free"><span class="tile-icon">🎹</span><strong>${t("free")}</strong><small>${t("freeSmall")}</small></button><button class="tile mint" id="stats"><span class="tile-icon">🌱</span><strong>${t("progress")}</strong><small>${t("progressSmall")}</small></button></div><section class="preset-catalog" aria-label="${t("presets")}">${gameTiles}</section><section class="progress-card"><div class="card"><h3>${t("sunshine")}</h3><div class="flowers">${"🌞".repeat(days)}${"⚪".repeat(7-days)}</div><p style="color:var(--muted)">${t("sunshineText")}</p></div><div class="card"><h3>${t("mission")}</h3><p>${t("missionText")}</p><div class="meter"><span style="width:${Math.min(100,state.results.length/5*100)}%"></span></div></div></section></main></div>`);
  document.querySelector("#play").onclick=()=>startRound(currentPreset()); let gateTimer; const gear=document.querySelector("#parent"); gear.onpointerdown=()=>{gateTimer=setTimeout(parentGate,1200);}; gear.onpointerup=()=>clearTimeout(gateTimer); gear.onpointerleave=()=>clearTimeout(gateTimer);
  document.querySelectorAll(".game-tile").forEach(tile=>tile.onclick=()=>{const p=presets.find(item=>item.id===tile.dataset.preset)||currentPreset();startRound(p);}); document.querySelector("#free").onclick=freePiano; document.querySelector("#stats").onclick=dashboard; document.querySelector("#adventure").onclick=adventure; document.querySelector("#stickers").onclick=()=>stickers();
}
function presetClef(p) { return p.clef || state.settings.clef || "treble"; }
function midiForName(name,octave) { return ({C:0,D:2,E:4,F:5,G:7,A:9,B:11})[name]+(octave+1)*12; }
function notesForPreset(p) {
  const match=String(p.range||"C4-F5").match(/^([A-G])(\d)-([A-G])(\d)$/);
  if(!match) return notePool.slice();
  let low=midiForName(match[1],+match[2]),high=midiForName(match[3],+match[4]); if(low>high)[low,high]=[high,low];
  const result=[]; for(let octave=1;octave<=7;octave++) for(const name of LETTERS){const midi=midiForName(name,octave);if(midi>=low&&midi<=high)result.push({n:name,o:octave,midi});}
  const accidentals={sharps:{1:["C","#"],3:["D","#"],6:["F","#"],8:["G","#"],10:["A","#"]},flats:{1:["D","b"],3:["E","b"],6:["G","b"],8:["A","b"],10:["B","b"]}};
  const modes=p.accidentalMode==="both"?["sharps","flats"]:p.accidentalMode&&accidentals[p.accidentalMode]?[p.accidentalMode]:[];
  modes.forEach(mode=>Object.values(accidentals[mode]).forEach(([name,acc])=>{for(let octave=1;octave<=7;octave++){const midi=({C:0,D:2,E:4,F:5,G:7,A:9,B:11})[name]+(octave+1)*12+(acc==="#"?1:-1);if(midi>=low&&midi<=high)result.push({n:name,o:octave,midi,accidental:acc});}}));
  return result.length?result:notePool.slice();
}
function startRound(p) { const clef=presetClef(p); state.round={preset:p.id,index:0,correct:0,notes:[],clef:clef==="both"?(Math.random()<.5?"treble":"bass"):clef,roundId:`round-${Date.now()}-${Math.random().toString(36).slice(2)}`,newStickers:[]}; save(); renderQuestion(); }
function questionNote(p) { const range=notesForPreset(p),pool=range.filter(n=>!state.round.notes.includes(n.midi)); const n=pool[Math.floor(Math.random()*pool.length)]||range[Math.floor(Math.random()*range.length)]; state.round.notes.push(n.midi); state.round.qid=`q-${Date.now()}-${Math.random().toString(36).slice(2)}`; state.round.attempt=0; return n; }
function renderQuestion() {
  const r=state.round,p=[...presets,...state.custom].find(item=>item.id===r.preset)||currentPreset(),note=questionNote(p),range=notesForPreset(p),mode=modeForPreset(p);
  // Bei "both" den Schlüssel nach Tonhöhe wählen, damit nicht viele Hilfslinien entstehen
  if(p.clef==="both") r.clef = note.midi<60 ? "bass" : note.midi>60 ? "treble" : (Math.random()<.5?"treble":"bass");
  r.note=note;r.mode=mode;r.started=Date.now(); save();
  const choices=[noteKey(note)],choiceLabels=new Set([noteLabel(note)]); while(choices.length<Math.min(4,state.settings.choices)){const x=range[Math.floor(Math.random()*range.length)],key=noteKey(x),label=noteLabel(x);if(!choices.includes(key)&&!choiceLabels.has(label)){choices.push(key);choiceLabels.add(label);}} choices.sort(()=>Math.random()-.5);
  const staffChoices=[note],nearby=range.filter(item=>item.midi!==note.midi).sort((a,b)=>Math.abs(a.midi-note.midi)-Math.abs(b.midi-note.midi)); nearby.forEach(x=>{if(staffChoices.length<Math.min(4,state.settings.choices)&&!staffChoices.some(item=>item.midi===x.midi))staffChoices.push(x);}); staffChoices.sort(()=>Math.random()-.5);
  const pianoPrompt=mode==="piano-note"||mode==="piano-staff",pianoAnswer=mode==="staff-piano",staffAnswer=mode==="piano-staff";
  const promptHtml=pianoPrompt?pianoHtml(note.midi,{showLabels:false}):`<div class="staff-container" data-note="${note.midi}"></div>`;
  const choiceByKey=new Map(range.map(item=>[noteKey(item),item]));
  const answerHtml=pianoAnswer?pianoHtml():staffAnswer?`<div class="choices staff-choices">${staffChoices.map(c=>`<button class="choice staff-choice" data-answer="${noteKey(c)}" aria-label="Notenzeile ${noteLabel(c)}"><span class="staff-container"></span></button>`).join("")}</div>`:`<div class="choices">${choices.map(c=>{const choice=choiceByKey.get(c)||note;return `<button class="choice" data-answer="${c}" aria-label="Note ${noteLabel(choice)}">${noteLabel(choice)}</button>`;}).join("")}</div>`;
  const questionLabel=mode==="piano-note"?t("questionPianoNote"):mode==="piano-staff"?t("questionPianoStaff"):pianoAnswer?t("questionPiano"):t("questionName");
  app(`<div class="app-shell"><header class="topbar"><div class="brand"><span class="brand-icon">♪</span> NoteNest</div><button class="icon-btn" id="exit" aria-label="${t("leave")}">${t("questionExit")}</button></header><main class="screen exercise-screen"><div class="progress-row"><span>⭐ ${r.index+1}/${state.settings.questions}</span><div class="meter"><span style="width:${r.index/state.settings.questions*100}%"></span></div><span>🌈 ${r.correct}</span></div><section class="card question-card"><div class="question-label">${questionLabel}</div>${promptHtml}${answerHtml}<div class="feedback" id="feedback">🦊 ${t("tryIt")}</div></section></main></div>`);
  if(!pianoPrompt) renderStaff(document.querySelector(".staff-container"),{note,clef:r.clef});
  if(staffAnswer) document.querySelectorAll(".staff-choice .staff-container").forEach((box,index)=>renderStaff(box,{note:staffChoices[index],clef:r.clef,compact:true,maxWidth:300}));
  document.querySelector("#exit").onclick=()=>{if(confirm(t("leave")))home();}; document.querySelectorAll(".piano-key").forEach(k=>k.onclick=()=>{playTone(+k.dataset.midi);if(!pianoPrompt&&k.dataset.answerable==="true")answer(+k.dataset.midi,k);}); document.querySelectorAll(".choice").forEach(k=>k.onclick=()=>answer(k.dataset.answer,k));
}
function answer(value,target) {
  const numeric=typeof value==="number",answerValue=numeric?+value:value;
  const r=state.round;r.attempt=(r.attempt||0)+1;const ok=numeric?answerValue===r.note.midi:String(answerValue)===noteKey(r.note); playTone(numeric?answerValue:r.note.midi,ok); target.classList.add(ok?"correct":"wrong"); document.querySelector("#feedback").textContent=ok?t("correct"):t("almost");
  const finishing=ok&&r.index+1>=state.settings.questions;
  state.results.push({day:new Date().toISOString().slice(0,10),time:Date.now(),type:r.mode,clef:r.clef,note:r.note.midi,ok,answer:answerValue,preset:r.preset,responseMs:Date.now()-r.started,attempt:r.attempt,qid:r.qid,roundId:r.roundId,naming:state.settings.naming,roundFinished:finishing}); const newStickers=evaluateStickers();r.newStickers=[...(r.newStickers||[]),...newStickers.filter(id=>!r.newStickers?.includes(id))]; save();
  if(ok){r.correct++;setTimeout(()=>{r.index++;if(r.index>=state.settings.questions)summary();else renderQuestion();flushStickerCelebrations();},650);} else setTimeout(()=>{target.classList.remove("wrong");flushStickerCelebrations();},650);
}
function stickerCard(def,forceUnlock=false) {
  const unlocked=forceUnlock||!!state.stickers.unlocked[def.id], progress=stickerProgress(def), name=unlocked?stickerCopy(def,"name"):"???";
  return `<button class="sticker-card ${unlocked?"is-unlocked":"is-locked"} rarity-${def.rarity}" data-sticker="${def.id}" aria-label="${escapeHtml(name)}"><span class="sticker-icon">${unlocked?def.icon:"✦"}</span><span class="sticker-card-body"><b>${escapeHtml(name)}</b><small>${rarityLabel(def.rarity)}</small>${unlocked?`<span>${t("stickerUnlocked")}</span>`:`<span>${def.secret?"???":escapeHtml(stickerCopy(def,"hint"))}</span><div class="sticker-progress"><i style="width:${Math.min(100,progress.current/progress.target*100)}%"></i></div><small>${progress.current}/${progress.target}</small>`}</span>${unlocked&&!state.stickers.seen[def.id]&&!forceUnlock?`<em>${t("stickerNew")}</em>`:""}</button>`;
}
function stickerDetail(id,forceUnlock=false) {
  const def=stickerDefs.find(s=>s.id===id); if(!def)return;
  const unlocked=forceUnlock||!!state.stickers.unlocked[id],progress=stickerProgress(def);
  if(unlocked&&!forceUnlock){state.stickers.seen[id]=true;save();}
  const node=el(`<div class="modal-backdrop sticker-detail-backdrop"><section class="modal sticker-detail" role="dialog" aria-modal="true" aria-label="${escapeHtml(unlocked?stickerCopy(def,"name"):"???")}"><button class="icon-btn detail-close" aria-label="${t("stickerClose")}">✕</button><div class="sticker-detail-icon rarity-${def.rarity}">${unlocked?def.icon:"✦"}</div><h2>${escapeHtml(unlocked?stickerCopy(def,"name"):"???")}</h2><p>${escapeHtml(unlocked?stickerCopy(def,"hint"):def.secret?"???":stickerCopy(def,"hint"))}</p><strong>${rarityLabel(def.rarity)}</strong>${unlocked?`<p>${t("stickerDate")}: ${new Date(state.stickers.unlocked[id]||Date.now()).toLocaleDateString(state.language==="de"?"de-DE":"en-US")}</p>`:`<div class="sticker-progress"><i style="width:${Math.min(100,progress.current/progress.target*100)}%"></i></div><p>${t("stickerProgress")}: ${progress.current}/${progress.target}</p>`}</section></div>`);
  document.body.append(node); node.querySelector(".detail-close").onclick=()=>node.remove(); node.onclick=e=>{if(e.target===node)node.remove();};
}
function stickers(filter="all") {
  try {
    const unlocked=Object.keys(state.stickers.unlocked).length,ctx=buildContext(),categories=["all","getting","skill","exploration","consistency","growth","milestones"];
    stickerDefs.filter(s=>state.stickers.unlocked[s.id]).forEach(s=>state.stickers.seen[s.id]=true); save();
    const list=stickerDefs.filter(s=>filter==="all"||s.category===filter).sort((a,b)=>{const au=state.stickers.unlocked[a.id],bu=state.stickers.unlocked[b.id];if(au&&bu)return bu-au;if(au!==bu)return au?-1:1;const ap=stickerProgress(a,ctx),bp=stickerProgress(b,ctx);return bp.current/bp.target-ap.current/ap.target;});
    const next=stickerDefs.filter(s=>!state.stickers.unlocked[s.id]).sort((a,b)=>{const ap=stickerProgress(a,ctx),bp=stickerProgress(b,ctx);return bp.current/bp.target-ap.current/ap.target;}).slice(0,3);
    app(`<div class="app-shell"><header class="topbar"><div class="brand"><span class="brand-icon">🎁</span> ${t("stickers")}</div><div class="top-actions"><span class="pill">${unlocked}/${stickerDefs.length}</span><button class="icon-btn" id="back" aria-label="${t("home")}">⌂</button></div></header><main class="screen sticker-book"><div class="card sticker-overview"><h2>${t("stickers")}</h2><p>${unlocked}/${stickerDefs.length} ${t("stickerUnlocked")}</p><div class="meter"><span style="width:${unlocked/stickerDefs.length*100}%"></span></div></div><section class="next-stickers"><h3>${t("stickerNext")}</h3><div class="next-sticker-list">${next.map(s=>stickerCard(s)).join("")||`<p>${t("stickerEmpty")}</p>`}</div></section><nav class="sticker-tabs" aria-label="${t("stickers")}">${categories.map(c=>`<button class="${filter===c?"active":""}" data-filter="${c}">${c==="all"?t("stickerAll"):t(`sticker${c[0].toUpperCase()+c.slice(1)}`)}</button>`).join("")}</nav><div class="sticker-grid">${list.map(s=>stickerCard(s)).join("")}</div></main></div>`);
    document.querySelector("#back").onclick=home; document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>stickers(b.dataset.filter)); document.querySelectorAll("[data-sticker]").forEach(b=>b.onclick=()=>stickerDetail(b.dataset.sticker));
  } catch (_) { home(); }
}
function summary() { const r=state.round,stars=Math.max(1,Math.round(r.correct/r.index*3)),newIds=r.newStickers||[]; evaluateStickers(); app(`<div class="app-shell"><main class="screen" style="padding-top:8vh"><section class="card question-card"><div class="mascot" style="width:180px;font-size:4rem">🦊</div><h1 style="font-size:3.3rem">${t("done")}</h1><div style="font-size:3rem">${"⭐".repeat(stars)}${"☆".repeat(3-stars)}</div><p>${t("found",{ok:r.correct,all:r.index})}</p>${newIds.length?`<section class="new-stickers-row"><h3>${t("stickerNewRow")}</h3>${newIds.map(id=>{const s=stickerDefs.find(x=>x.id===id);return `<span title="${escapeHtml(stickerCopy(s,"name"))}">${s.icon}</span>`;}).join("")}</section>`:""}<div class="tool-row" style="justify-content:center"><button class="primary" id="again">${t("again")}</button><button class="secondary" id="home">${t("home")}</button></div></section></main></div>`); playTone(72,true); document.querySelector("#again").onclick=()=>startRound(currentPreset()); document.querySelector("#home").onclick=home; setTimeout(flushStickerCelebrations,700); }
function parentGate(){const answer=prompt(t("gate"));if(answer==="5")parentArea();else if(answer!==null)toast(t("notQuite"));}
function parentStickerSection() {
  const ctx=buildContext();
  return `<section class="card parent-stickers"><h2>${t("stickers")}</h2><p>${Object.keys(state.stickers.unlocked).length}/${stickerDefs.length} ${t("stickerUnlocked")}</p><div class="parent-sticker-list">${stickerDefs.map(s=>{const p=stickerProgress(s,ctx),u=!!state.stickers.unlocked[s.id];return `<div class="parent-sticker-row"><span>${u?s.icon:"✦"} <b>${escapeHtml(u?stickerCopy(s,"name"):"???")}</b></span><small>${u?t("stickerUnlocked"):`${p.current}/${p.target}`}</small></div>`;}).join("")}</div><div class="tool-row"><button class="secondary" id="reset-stickers">${t("resetStickers")}</button></div></section>`;
}
function parentArea() {
  app(`<div class="app-shell"><header class="topbar"><div class="brand"><span class="brand-icon">♪</span> ${t("parentStudio")}</div><button class="icon-btn" id="back" aria-label="${t("home")}">⌂</button></header><main class="screen"><section class="card"><h2>${t("setup")}</h2><p style="color:var(--muted)">${t("setupText")}</p><div class="settings-grid"><label class="field">${t("questions")}<select id="questions"><option>5</option><option>10</option><option>15</option><option>20</option></select></label><label class="field">${t("choices")}<select id="choices"><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option></select></label><label class="field">${t("names")}<select id="naming"><option value="german">${t("german")}</option><option value="english">${t("english")}</option><option value="solfege">${t("solfege")}</option></select></label><label class="field">${t("sound")}<select id="sound"><option value="true">${t("soundOn")}</option><option value="false">${t("soundOff")}</option></select></label><label class="field">${t("instrument")}<select id="instrument"><option value="piano">${t("piano")}</option><option value="marimba">${t("marimba")}</option><option value="organ">${t("organ")}</option><option value="bell">${t("bell")}</option></select></label><label class="field">${t("celebrations")}<select id="celebrations"><option value="true">${t("celebrationsOn")}</option><option value="false">${t("celebrationsOff")}</option></select></label><label class="field">${t("labels")}<select id="labels"><option value="true">${t("labelsOn")}</option><option value="false">${t("labelsOff")}</option></select></label><label class="field">${t("lang")}<select id="language"><option value="de">${t("german")}</option><option value="en">${t("english")}</option></select></label><label class="field">${t("clef")}<select id="clef"><option value="treble">${t("treble")}</option><option value="bass">${t("bass")}</option></select></label><label class="field">${t("hideBlack")}<select id="hide-black"><option value="false">${t("labelsOff")}</option><option value="true">${t("labelsOn")}</option></select></label></div><div class="tool-row"><button class="primary" id="save-settings">${t("save")}</button><button class="secondary" id="dashboard">${t("dashboard")}</button></div></section><section class="card" style="margin-top:16px"><h2>${t("presets")}</h2><p style="color:var(--muted)">${t("presetsText")}</p><div class="preset-list">${[...presets,...state.custom].map(p=>`<div class="preset"><span>${p.icon} <b>${escapeHtml(p.name)}</b><small> · ${typeLabel(p.type)}</small></span><button class="tiny choose" data-id="${p.id}">${p.id===state.preset?t("selected"):t("use")}</button></div>`).join("")}</div><button class="secondary" id="new-preset">${t("savePreset")}</button></section>${parentStickerSection()}</main></div>`);
  document.querySelector("#back").onclick=home; document.querySelector("#dashboard").onclick=dashboard; document.querySelector("#questions").value=state.settings.questions; document.querySelector("#choices").value=state.settings.choices; document.querySelector("#naming").value=state.settings.naming; document.querySelector("#sound").value=String(state.settings.sound); document.querySelector("#instrument").value=state.settings.instrument; document.querySelector("#celebrations").value=String(state.settings.celebrations); document.querySelector("#labels").value=String(state.settings.pianoLabels); document.querySelector("#language").value=state.language; document.querySelector("#clef").value=state.settings.clef; document.querySelector("#hide-black").value=String(state.settings.hideBlackKeys);
  document.querySelector("#save-settings").onclick=()=>{state.settings.questions=+document.querySelector("#questions").value;state.settings.choices=+document.querySelector("#choices").value;state.settings.naming=document.querySelector("#naming").value;state.settings.sound=document.querySelector("#sound").value==="true";state.settings.instrument=document.querySelector("#instrument").value;state.settings.celebrations=document.querySelector("#celebrations").value==="true";state.settings.pianoLabels=document.querySelector("#labels").value==="true";state.settings.clef=document.querySelector("#clef").value;state.settings.hideBlackKeys=document.querySelector("#hide-black").value==="true";state.language=document.querySelector("#language").value;save();parentArea();};
  document.querySelectorAll(".choose").forEach(b=>b.onclick=()=>{state.preset=b.dataset.id;save();parentArea();}); document.querySelector("#new-preset").onclick=()=>{const name=prompt(t("presetName"));if(name){state.custom.push({id:"custom-"+Date.now(),name,icon:"🎼",type:"mixed",range:"C4-C5"});save();parentArea();}}; document.querySelector("#reset-stickers").onclick=()=>{if(confirm(t("resetStickersConfirm"))){state.stickers={unlocked:{},seen:{},pinned:[]};save();toast(t("stickerResetDone"));parentArea();}};
}
function dashboard(){const total=state.results.length,correct=state.results.filter(x=>x.ok).length;app(`<div class="app-shell"><header class="topbar"><div class="brand"><span class="brand-icon">♪</span> ${t("garden")}</div><button class="icon-btn" id="back" aria-label="${t("home")}">⌂</button></header><main class="screen"><section class="card"><h2>${t("garden")}</h2><p style="color:var(--muted)">${t("gardenText")}</p><div class="stat-grid"><div class="stat"><b>${total}</b>${t("tried")}</div><div class="stat"><b>${total?Math.round(correct/total*100):0}%</b>${t("accuracy")}</div><div class="stat"><b>${new Set(state.results.map(r=>r.day)).size}</b>${t("practiceDays")}</div></div><h3>${t("recent")}</h3>${total?`<div class="meter"><span style="width:${Math.round(correct/total*100)}%"></span></div><p>${t("recentText",{ok:correct,all:total})}</p>`:`<p>${t("empty")}</p>`}</section></main></div>`);document.querySelector("#back").onclick=home;}
function adventure(){toast(t("mapSmall"));startRound(currentPreset());}
function stickersTest() { app(`<div class="app-shell"><header class="topbar"><div class="brand">🔧 ${t("stickerTest")}</div><button class="icon-btn" id="back" aria-label="${t("home")}">⌂</button></header><main class="screen sticker-book"><div class="sticker-grid">${stickerDefs.map(s=>stickerCard(s,true)).join("")}</div></main></div>`);document.querySelector("#back").onclick=home;document.querySelectorAll("[data-sticker]").forEach(b=>b.onclick=()=>stickerDetail(b.dataset.sticker,true)); }
function freePiano(){app(`<div class="app-shell"><header class="topbar"><div class="brand"><span class="brand-icon">♪</span> ${t("free")}</div><button class="icon-btn" id="back" aria-label="${t("home")}">⌂</button></header><main class="screen"><section class="card question-card"><h2>${t("freeTitle")}</h2><p>${t("freeText")}</p>${pianoHtml()}<div class="feedback">${t("freeHint")}</div></section></main></div>`);document.querySelector("#back").onclick=home;document.querySelectorAll(".piano-key").forEach(k=>k.onclick=()=>{playTone(+k.dataset.midi);state.freePianoPlayed=true;save();evaluateStickers();flushStickerCelebrations();k.classList.add("correct");setTimeout(()=>k.classList.remove("correct"),250);});}
function testPage() {
  const testNotes=[]; for(let octave=1;octave<=7;octave++) for(const n of LETTERS){const midi=({C:0,D:2,E:4,F:5,G:7,A:9,B:11})[n]+(octave+1)*12;if(midi>=33&&midi<=96)testNotes.push({n,o:octave,midi});}
  app(`<div class="app-shell"><header class="topbar"><div class="brand">🔧 Noten-Testseite</div><button class="icon-btn" id="back" aria-label="${t("home")}">⌂</button></header><main class="screen test-screen"><h2>Naturtöne – Violinschlüssel</h2><div class="test-grid" id="treble-grid"></div><h2>Naturtöne – Bassschlüssel</h2><div class="test-grid" id="bass-grid"></div><h2>Kreuztöne</h2><div class="test-grid" id="sharp-grid"></div><h2>b-Töne</h2><div class="test-grid" id="flat-grid"></div><h2>Vier gleiche Mini-Notenzeilen</h2><div class="test-grid mini-grid" id="mini-grid"></div><h2>3-Oktaven-Klavier</h2>${pianoHtml()}</main></div>`);
  document.querySelector("#back").onclick=home;
  for(const note of testNotes){for(const [id,clef] of [["treble-grid","treble"],["bass-grid","bass"]]){const box=el(`<div class="mini-staff"><span>${note.n}${note.o}</span><div class="staff-container"></div></div>`);document.querySelector("#"+id).append(box);renderStaff(box.querySelector(".staff-container"),{note,clef});}}
  const sharpNames={1:"C",3:"D",6:"F",8:"G",10:"A"}; for(let midi=34;midi<=95;midi++) if(sharpNames[midi%12]){const note={n:sharpNames[midi%12],o:Math.floor(midi/12)-1,midi,accidental:"sharp"};const box=el(`<div class="mini-staff"><span>${noteLabel(note)}</span><div class="staff-container"></div></div>`);document.querySelector("#sharp-grid").append(box);renderStaff(box.querySelector(".staff-container"),{note,clef:"treble"});}
  const flatNames={1:"D",3:"E",6:"G",8:"A",10:"B"}; for(let midi=34;midi<=95;midi++) if(flatNames[midi%12]){const note={n:flatNames[midi%12],o:Math.floor(midi/12)-1,midi,accidental:"flat"};const box=el(`<div class="mini-staff"><span>${noteLabel(note)}</span><div class="staff-container"></div></div>`);document.querySelector("#flat-grid").append(box);renderStaff(box.querySelector(".staff-container"),{note,clef:"treble"});}
  for(let i=0;i<4;i++){const box=el(`<div class="mini-staff"><div class="staff-container"></div></div>`);document.querySelector("#mini-grid").append(box);renderStaff(box.querySelector(".staff-container"),{note:notePool[i],clef:"treble"});}
}
function selfCheck(){
  console.assert(typeof renderStaff==="function"&&VEX,"VexFlow ist nicht geladen");
  for(let midi=21;midi<=96;midi++){const natural=notePool.find(n=>n.midi===midi);if(natural)console.assert(vexKey(natural)==`${natural.n.toLowerCase()}/${natural.o}`,"VexFlow-Key ist falsch");}
  const piano=el(pianoHtml()); const white=piano.querySelectorAll(".white"),black=piano.querySelectorAll(".black"); console.assert(white.length===21&&black.length===15,"3-Oktaven-Klavier hat falsche Tastenanzahl"); console.assert(piano.querySelector('[data-midi="60"] .middle-c-marker'),"Mittel-C fehlt");
  console.assert(!piano.querySelector('[data-midi="65"].black')&&!piano.querySelector('[data-midi="71"].black'),"Zwischen E-F oder H-C liegt eine schwarze Taste");
  console.assert(accidentalFor({accidental:"sharp"})==="#"&&accidentalFor({accidental:"flat"})==="b","Vorzeichen werden nicht erkannt");
  const ids=new Set(stickerDefs.map(s=>s.id)); console.assert(ids.size===stickerDefs.length,"Sticker-IDs sind nicht eindeutig");
  stickerDefs.forEach(s=>{console.assert(s.name?.de&&s.name?.en&&s.hint?.de&&s.hint?.en,"Sticker-Texte fehlen");const p=stickerProgress(s);console.assert(p.target>0,"Sticker-Ziel muss positiv sein");});
  const firstUnlocks=evaluateStickers(); console.assert(evaluateStickers().length===0,"Sticker dürfen nicht doppelt freigeschaltet werden"); if(firstUnlocks.length)flushStickerCelebrations();
}
if(location.hash==="#/test") testPage(); else if(location.hash==="#/stickers-test") stickersTest(); else home(); selfCheck();