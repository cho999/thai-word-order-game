// Run from the project root after fetch-thai-ipa.mjs. Fails on unverified words.
import fs from 'node:fs';
import { readings, provenance, pronounce, consonants, letterNames, vowelCards, carrierVowels, vowelNuclei } from './ipa-data.mjs';
const read = p => fs.readFileSync(p,'utf8');
const write = (p,s) => { if (!fs.existsSync(p) || read(p)!==s) { fs.writeFileSync(p,s,'utf8'); console.log(p); } };
const writeJson = (p,o) => write(p,JSON.stringify(o,null,2)+'\n');
const planned = new Map();
const plan = (p,s) => planned.set(p,s);

function transformRows(source) {
  return source.replace(/\{[^{}\n]*\}/g, object => {
    const field = name => object.match(new RegExp('(?:^|[,{]\\s*)'+name+'\\s*:\\s*(["\x27])([^"\x27]*)\\1'))?.[2];
    const update = (name,value) => { object = object.replace(new RegExp('('+name+'\\s*:\\s*)(["\x27])[^"\x27]*\\2'), (_,prefix,quote)=>prefix+quote+value+quote); };
    if (field('thai') && field('roman')) update('roman',pronounce(field('thai')));
    if (field('th') && field('thaiReading')) update('thaiReading',pronounce(field('th')));
    if (field('th') && field('reading')) update('reading',pronounce(field('th')));
    if (field('nounThai') && field('noun')) update('noun',pronounce(field('nounThai')));
    if (field('word') && field('wordIpa')) update('wordIpa','/'+pronounce(field('word'))+'/');
    return object;
  });
}
for (const path of ['script.js','games/rian/script.js','vocab-practice.js','games/phuk-thai-kham-sap/script.js','games/tok-thai/script.js','games/classifiers/script.js','output/classifiers-emoji-quest/script.js']) {
  let source = transformRows(read(path));
  source = source.replaceAll('choose romanization','choose IPA').replaceAll('Thai, Paiboon, English','Thai, IPA, English').replaceAll('タイ語, roman, English','タイ語, IPA, English');
  plan(path,source);
}
for (const path of ['games/akson-thai/script.js','thai-letter-memory/script.js']) {
  let source = read(path).replace(/card\("([^"]+)", "[^"]+", "[^"]+", "([^"]+)"\)/g, (_,symbol,hint) => {
    const label = letterNames[symbol] || vowelCards[symbol]?.[0];
    const ipa = consonants[symbol] || vowelCards[symbol]?.[1];
    if (!label || !ipa) throw new Error('Missing letter card: '+symbol);
    return `card("${symbol === 'กื' ? 'กือ' : symbol}", "${label}", "${ipa}", "${symbol === 'กื' ? 'ก + ◌ือ' : hint}")`;
  });
  plan(path,source);
}

let jam = transformRows(read('games/jam-akson-thai/script.js'));
jam = jam.replace(/const CONSONANT_LABEL_LATIN = \{[\s\S]*?\n\s*\};/, 'const CONSONANT_LABEL_LATIN = '+JSON.stringify(letterNames,null,2)+';');
jam = jam.replace(/const VOWEL_PAIRS = \[[\s\S]*?\n\s*\];/, 'const VOWEL_PAIRS = '+JSON.stringify(Object.entries(carrierVowels),null,2)+';');
jam = jam.replace(/\{thai:'([^']+)', latin:'[^']+',\s*pattern:'([^']+)'\}/g,(_,thai,pattern)=>`{thai:'${thai}', latin:'${vowelNuclei[thai]}', pattern:'${pattern}'}`);
jam = jam.replace(/function consonantToLatin\(c\)\{[\s\S]*?\n  \}/, `function consonantToLatin(c){
    // The initial sound, not the alphabet name; อ supplies a glottal onset.
    return (CONSONANT_IPA[c]?.match(/^\\/([^/]+)\\//)?.[1] || '?').replace('r~ɾ','r');
  }`);
jam = jam.replace(/function applyTone\(base, tone\) \{[\s\S]*?\n  \}/, `function applyTone(base, tone) {
    const marks = { mid:'˧', low:'˨˩', falling:'˥˩', high:'˦˥', rising:'˩˩˦' };
    return base + marks[tone];
  }`);
jam = jam.replace(/function romanizeSyntheticSyllable\(consonant, vowel\) \{[\s\S]*?\n  \}/, `function romanizeSyntheticSyllable(consonant, vowel) {
    const live = !['ะ','ิ','ุ'].includes(vowel.thai);
    const base = consonantToLatin(consonant) + vowel.latin + (live ? '' : 'ʔ');
    const klass = consonantClass(consonant);
    if (live) return applyTone(base, klass === 'high' ? 'rising' : 'mid');
    return applyTone(base, klass === 'low' ? 'high' : 'low');
  }`);
jam = jam.replaceAll('Latin+IPA','IPA + tones').replaceAll('/iaː/','/ia̯/').replaceAll('/ia/','/ia̯/').replaceAll('/ɯaː/','/ɯa̯/').replaceAll('/ɯa/','/ɯa̯/');
plan('games/jam-akson-thai/script.js',jam);

for (const path of ['data/vocabulary.json','data/word-order-challenges.json','data/vocab-lessons.json']) {
  const data=JSON.parse(read(path));
  const walk = item => {
    if (!item || typeof item!=='object') return;
    if (item.thai && item.roman) item.roman=pronounce(item.thai);
    if (item.th && item.thaiReading) item.thaiReading=pronounce(item.th);
    if (item.th && item.reading) item.reading=pronounce(item.th);
    Object.values(item).forEach(walk);
  };
  walk(data); plan(path,JSON.stringify(data,null,2)+'\n');
}
const letters=JSON.parse(read('data/thai-letters.json'));
for (const level of Object.values(letters.data).flat()) for (const card of level.items) {
  card.label=letterNames[card.symbol] || vowelCards[card.symbol][0];
  card.ipa=consonants[card.symbol] || vowelCards[card.symbol][1];
  if(card.symbol==='กื') {card.symbol='กือ';card.hint='ก + ◌ือ';}
}
plan('data/thai-letters.json',JSON.stringify(letters,null,2)+'\n');
const jamData=JSON.parse(read('data/jam-akson-thai.json'));
jamData.consonantLabels=letterNames;
jamData.consonantPairs=Object.entries(letterNames).map(([thai,ipa])=>[thai,ipa+' '+consonants[thai]]);
jamData.vowelPairs=Object.entries(carrierVowels);
jamData.syllableVowels.forEach(row=>row.latin=vowelNuclei[row.thai]);
plan('data/jam-akson-thai.json',JSON.stringify(jamData,null,2)+'\n');

const htmlFiles=['index.html','word-order.html','vocab-practice.html','thai-letter-memory/index.html',...['rian','akson-thai','phuk-thai-kham-sap','tok-thai','jam-akson-thai','classifiers'].map(g=>'games/'+g+'/index.html'),'output/classifiers-emoji-quest/index.html'];
for(const path of htmlFiles) {
  let html=read(path);
  html=html.replaceAll('Paiboon-style romanization','IPA transcription with tone marks').replaceAll('Paiboon-style readings','IPA readings with tone marks').replaceAll('Paiboon romanization','IPA transcription with tone marks').replaceAll('Paiboon','IPA').replaceAll('Writing and romanization system','Writing and IPA transcription').replaceAll('Latin+IPA','IPA + tones').replaceAll('Latin consonant name + IPA','IPA consonant name with tones + consonant sound').replaceAll('Latin sound labels, IPA hints','IPA transcriptions with tone marks').replaceAll('ローマ字','IPA').replaceAll('タイ語, roman, English','タイ語, IPA, English').replaceAll('授業ノート由来の読み','声調付きIPAの読み').replaceAll('หมา, mǎa, dog','หมา, maː˩˩˦, dog').replaceAll('หมา, maa, dog','หมา, maː˩˩˦, dog');
  html=html.replaceAll('Meeo Saam Tua','mɛːw˧ saːm˩˩˦ tua̯˧').replaceAll('These simplified romanizations omit tone marks.','IPA transcriptions include the tone of every syllable.').replaceAll('1 Nung · 2 Song · 3 Saam · 4 Shii · 5 Haa','1 nɯŋ˨˩ · 2 sɔːŋ˩˩˦ · 3 saːm˩˩˦ · 4 siː˨˩ · 5 haː˥˩');
  const prefix=path.startsWith('games/')?'../../':path.startsWith('thai-letter-memory/')?'../':path.startsWith('output/')?'../../':'';
  // Keep the exported classifier bundle independently usable.
  const standalone=path.startsWith('output/');
  const css=standalone?'ipa.css':prefix+'assets/css/ipa.css';
  const guide=standalone?'pronunciation.html':prefix+'pronunciation.html';
  if(!html.includes('class="ipa-guide"')) {
    html=html.replace('</head>',`  <link rel="stylesheet" href="${css}">\n</head>`);
    const japanese=/<html lang="ja"/.test(html);
    const details=japanese
      ? `<details class="ipa-guide"><summary>IPA・声調記号の読み方</summary><p>中声 ˧ ／低声 ˨˩ ／下降声 ˥˩ ／高声 ˦˥ ／上昇声 ˩˩˦。声調記号は音節末に付きます。ː は長母音、ʰ は有気音、ʔ は声門閉鎖、. は音節の区切りです。</p><p>単独の子音・母音の音素には声調を付けず、単語・文字名・練習音節に声調を付けています。</p><a href="${guide}">発音表記と単語ごとの出典</a></details>`
      : `<details class="ipa-guide"><summary>How to read IPA and tone marks</summary><p>Mid ˧ · Low ˨˩ · Falling ˥˩ · High ˦˥ · Rising ˩˩˦. Tone marks follow each syllable. ː = long vowel; ʰ = aspiration; ʔ = glottal stop; . = syllable boundary.</p><p>Words, letter names and practice syllables carry tones. Individual consonant and vowel sounds do not have an inherent tone.</p><a href="${guide}">Pronunciation guide and word-by-word sources</a></details>`;
    html=html.replace('</body>',details+'\n</body>');
  }
  plan(path,html);
}
// The separate vowel lab already uses IPA; harmonize its diphthong convention.
for(const path of ['thai-vowel-lab/dist/app.js','thai-vowel-lab/dist/index.html']) {
  plan(path,read(path).replaceAll('iəʔ','ia̯ʔ').replaceAll('ɯəʔ','ɯa̯ʔ').replaceAll('uəʔ','ua̯ʔ'));
}
// Validate all planned data before writing any migrated file.
for(const [path,contents] of planned) write(path,contents);
writeJson('data/ipa-readings.json',{convention:'Wiktionary Thai IPA; tones at the end of each syllable',license:'Wiktionary-derived pronunciation data: CC BY-SA 4.0; links identify contributing pages.',readings:Object.fromEntries(Object.keys(readings).sort().map(thai=>[thai,{ipa:readings[thai],...provenance[thai]}]))});
