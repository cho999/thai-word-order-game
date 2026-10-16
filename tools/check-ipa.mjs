import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { pronounce, readings, letterNames } from './ipa-data.mjs';
const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const evaluate=(code,expression)=>JSON.parse(JSON.stringify(vm.runInNewContext(code+'\n'+expression)));
let checked=0;
function checkTone(ipa,label) {
  for(const syllable of ipa.split(/[.\s/]+/).filter(Boolean)) {
    assert.match(syllable,/[˥˦˧˨˩]$/u,`${label}: missing tone on ${syllable}`);
    assert.doesNotMatch(syllable,/[?]|undefined|NaN/,`${label}: invalid IPA`);
  }
  checked++;
}
for(const [thai,ipa] of Object.entries(readings)) checkTone(ipa,thai);
// Dictionary-backed regression examples cover five tones, aspiration and vowels.
for(const [thai,ipa] of Object.entries({'หมา':'maː˩˩˦','แมว':'mɛːw˧','ไก่':'kaj˨˩','ม้า':'maː˦˥','พ่อ':'pʰɔː˥˩','ดื่ม':'dɯːm˨˩','คำถาม':'kʰam˧.tʰaːm˩˩˦'})) assert.equal(pronounce(thai),ipa);
for(const file of ['script.js','games/rian/script.js']) {
  const source=read(file);
  const data=evaluate(source.slice(0,source.indexOf('const maxMistakes')),'({vocabulary,challenges})');
  assert.deepEqual(data.vocabulary,json('data/vocabulary.json'));
  assert.deepEqual(data.challenges,json('data/word-order-challenges.json'));
  for(const row of data.vocabulary) {assert.equal(row.thaiReading,pronounce(row.th));checkTone(row.thaiReading,row.th);}
  for(const row of data.challenges) {assert.equal(row.reading,pronounce(row.th));checkTone(row.reading,row.th);}
}
for(const [file,name] of [['games/phuk-thai-kham-sap/script.js','fallbackLessons'],['vocab-practice.js','lessons']]) {
  const source=read(file);
  const lessons=evaluate(source.slice(0,source.indexOf('const storageKey')),name);
  assert.deepEqual(lessons.map(l=>l.words),json('data/vocab-lessons.json').map(l=>l.words));
  for(const lesson of lessons) for(const word of lesson.words) {assert.equal(word.roman,pronounce(word.thai));checkTone(word.roman,word.thai);}
}
for(const file of ['games/akson-thai/script.js','thai-letter-memory/script.js']) {
  const source=read(file);
  const data=evaluate('function level(id,title,note,items){return {id,title,note,items};} function card(symbol,label,ipa,hint){return {symbol,label,ipa,hint};}\n'+source.slice(0,source.indexOf('const labels')),'data');
  for(const levels of Object.values(data)) for(const level of levels) for(const card of level.items) {
    checkTone(card.label,card.symbol);
    if(letterNames[card.symbol]) assert.equal(card.label,letterNames[card.symbol]);
    assert.doesNotMatch(card.ipa,/\/(?:kh|ph|th|ch|ng|y|gai|gao)\//);
  }
}
const jam=read('games/jam-akson-thai/script.js');
const code=jam.slice(jam.indexOf('const CONSONANT_LABEL_LATIN'),jam.indexOf('// Match game state'));
const context=vm.createContext({});vm.runInContext(code,context);
for(const [consonant,vowel,ipa] of [['ก','ะ','kaʔ˨˩'],['ค','ะ','kʰaʔ˦˥'],['ข','า','kʰaː˩˩˦'],['ก','า','kaː˧'],['อ','ิ','ʔiʔ˨˩'],['จ','า','tɕaː˧']]) {
  assert.equal(vm.runInContext(`romanizeSyntheticSyllable('${consonant}',SYLLABLE_VOWELS.find(v=>v.thai==='${vowel}'))`,context),ipa);
}
const generated=vm.runInContext('SYLLABLE_BASE_CONSONANTS_ALL.flatMap(c=>SYLLABLE_VOWELS.map(v=>romanizeSyntheticSyllable(c,v)))',context);
assert.equal(generated.length,484);
generated.forEach(ipa=>checkTone(ipa,'generated syllable'));
const falling=read('games/tok-thai/script.js');
const fallingContext=vm.createContext({});
vm.runInContext(falling.slice(falling.indexOf('function buildChoices'),falling.indexOf('function colorThaiWord'))+'\n'+falling.slice(falling.indexOf('function shuffle'),falling.indexOf('function randomInt')),fallingContext);
for(const lesson of json('data/vocab-lessons.json')) for(const word of lesson.words) {
  fallingContext.testWord=word;
  const choices=vm.runInContext('buildChoices(testWord)',fallingContext);
  assert.equal(choices.length,4);
  assert.equal(new Set(choices).size,4);
  assert.equal(choices.filter(choice=>choice===word.roman).length,1);
  for(const choice of choices) {
    checkTone(choice,'falling-word choice');
    assert.doesNotMatch(choice,/kh|ph|th|ch|ng|bp|dt|aa|ii|uu|ee|oo/);
  }
}
for(const file of ['games/classifiers/script.js','output/classifiers-emoji-quest/script.js']) {
  const source=read(file);
  const rows=evaluate(source.slice(0,source.indexOf('const $')),'[...CLASSIFIERS,...NUMBERS.filter(Boolean)]');
  rows.forEach(row=>{assert.equal(row.roman,pronounce(row.thai));if(row.nounThai) assert.equal(row.noun,pronounce(row.nounThai));});
}
// Check syntax for all changed game scripts and all local resource references.
const pages=['index.html','pronunciation.html','word-order.html','vocab-practice.html','thai-letter-memory/index.html',...['rian','akson-thai','phuk-thai-kham-sap','tok-thai','jam-akson-thai','classifiers'].map(g=>'games/'+g+'/index.html'),'thai-vowel-lab/dist/index.html','output/classifiers-emoji-quest/index.html','output/classifiers-emoji-quest/pronunciation.html'];
const path=await import('node:path');
const scripts=new Set();
for(const page of pages) {
  const html=read(page);
  if(!page.startsWith('thai-vowel-lab')&&!page.endsWith('pronunciation.html')) assert.ok(html.includes('class="ipa-guide"'),page);
  for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const ref=match[1];if(/^(https?:|data:|mailto:)/.test(ref)) continue;
    const target=path.resolve(path.dirname(page),ref.split(/[?#]/)[0]);
    assert.ok(fs.existsSync(target),`${page}: missing ${ref}`);
    if(target.endsWith('.js')) scripts.add(target);
  }
}
for(const script of scripts) execFileSync(process.execPath,['--check',script]);
console.log(`PASS: ${checked} tone-bearing readings, 484 generated syllables, embedded/JSON consistency, ${pages.length} pages and ${scripts.size} scripts.`);
