import fs from 'node:fs';

export const evidence = JSON.parse(fs.readFileSync(new URL('../data/ipa-sources.json', import.meta.url), 'utf8'));
export const tones = { mid: '˧', low: '˨˩', falling: '˥˩', high: '˦˥', rising: '˩˩˦' };
export const strip = value => value.replace(/^\//, '').replace(/\/$/, '');
export const readings = {};
export const provenance = {};
for (const [thai, entry] of Object.entries(evidence.entries)) {
  const ipa = entry.ipa.find(value => /^\/.*[˥˦˧˨˩].*\/$/u.test(value));
  if (entry.status === 200 && ipa) {
    readings[thai] = strip(ipa);
    provenance[thai] = { kind: 'dictionary', sources: [entry.url] };
  }
}
// ภาษาไทย redirects to ไทย on English Wiktionary: compose both words explicitly.
delete readings['ภาษาไทย'];
const compounds = {
  'ภาษาไทย': ['ภาษา', 'ไทย'], 'แปลว่า': ['แปล', 'ว่า'],
  'ช้าๆ': ['ช้า', 'ช้า'], 'ได้ไหม': ['ได้', 'ไหม'],
  'เล่นไพ่': ['เล่น', 'ไพ่'], 'ขับรถ': ['ขับ', 'รถ']
};
for (const [thai, parts] of Object.entries(compounds)) {
  if (parts.some(part => !readings[part])) throw new Error(`Missing dictionary component: ${thai}`);
  readings[thai] = parts.map(part => readings[part]).join(' ');
  provenance[thai] = { kind: 'composed', parts, sources: parts.flatMap(part => provenance[part].sources) };
}
if (!readings['ผม'] || !readings['ฉัน'] || !readings['ราเม็ง']) throw new Error('Missing pronoun or ramen dictionary source');
readings['ผม/ฉัน'] = readings['ผม'] + ' / ' + readings['ฉัน'];
provenance['ผม/ฉัน'] = {kind:'alternatives', parts:['ผม','ฉัน'], sources:[provenance['ผม'].sources[0],provenance['ฉัน'].sources[0]]};
// Thai Wiktionary explicitly lists the project's spelling as a nonstandard variant.
readings['ราเมน'] = readings['ราเม็ง'];
provenance['ราเมน'] = { kind:'spelling-variant', sources:[provenance['ราเม็ง'].sources[0], 'https://th.wiktionary.org/wiki/ราเม็ง'], note:'ราเมน is listed as a nonstandard spelling of ราเม็ง; use the lemma pronunciation.' };

export const consonants = JSON.parse(fs.readFileSync(new URL('../data/jam-akson-thai.json', import.meta.url),'utf8')).consonantIpa;
export const letterNames = {};
for (const char of Object.keys(consonants)) {
  const choices = evidence.entries[char]?.ipa.filter(value => value.startsWith('/') && value.includes('.')) || [];
  if (!choices.length) throw new Error(`Missing full alphabet name for ${char}`);
  letterNames[char] = strip(choices[0]);
}
// นกฮูก redirects to ฮูก: use the full word in the dictionary name of ฮ.
readings['นกฮูก'] = letterNames['ฮ'].split('.').slice(1).join('.');
provenance['นกฮูก'] = { kind:'dictionary-letter-name', sources:[evidence.entries['ฮ'].url], note:'The full owl word occurs in the name of ฮ; the นกฮูก entry redirects to ฮูก.' };

// Vowel sounds are segmental units: tones belong to the complete carrier syllable.
export const vowelCards = {
  'กะ': ['kaʔ˨˩','/a/'], 'กา':['kaː˧','/aː/'],
  'กิ':['kiʔ˨˩','/i/'], 'กี':['kiː˧','/iː/'],
  'กุ':['kuʔ˨˩','/u/'], 'กู':['kuː˧','/uː/'],
  'กึ':['kɯʔ˨˩','/ɯ/'], 'กื':['kɯː˧','/ɯː/'], 'กือ':['kɯː˧','/ɯː/'],
  'เกะ':['keʔ˨˩','/e/'], 'เก':['keː˧','/eː/'],
  'โกะ':['koʔ˨˩','/o/'], 'โก':['koː˧','/oː/'],
  'แกะ':['kɛʔ˨˩','/ɛ/'], 'แก':['kɛː˧','/ɛː/'],
  'เกาะ':['kɔʔ˨˩','/ɔ/'], 'กอ':['kɔː˧','/ɔː/'],
  'เกอะ':['kɤʔ˨˩','/ɤ/'], 'เกอ':['kɤː˧','/ɤː/'],
  'เกียะ':['kia̯ʔ˨˩','/ia̯/'], 'เกีย':['kia̯˧','/ia̯/'],
  'เกือะ':['kɯa̯ʔ˨˩','/ɯa̯/'], 'เกือ':['kɯa̯˧','/ɯa̯/'],
  'กัวะ':['kua̯ʔ˨˩','/ua̯/'], 'กัว':['kua̯˧','/ua̯/'],
  'ไก':['kaj˧','/aj/'], 'เกา':['kaw˧','/aw/']
};
export const carrierVowels = {
  'อะ':'ʔaʔ˨˩','อา':'ʔaː˧','อิ':'ʔiʔ˨˩','อี':'ʔiː˧','อุ':'ʔuʔ˨˩','อู':'ʔuː˧',
  'เอ':'ʔeː˧','แอ':'ʔɛː˧','โอ':'ʔoː˧','ไอ':'ʔaj˧','ใอ':'ʔaj˧','เอา':'ʔaw˧','อำ':'ʔam˧'
};
export const vowelNuclei = {'ะ':'a','า':'aː','ิ':'i','ี':'iː','ุ':'u','ู':'uː','เ':'eː','แ':'ɛː','โ':'oː','ไ':'aj','ใ':'aj'};

export function pronounce(thai) {
  if (readings[thai]) return readings[thai];
  // Only known lexical words may segment a sentence; do not use alphabet names.
  const candidates = Object.keys(readings).filter(word => word.length > 1).sort((a,b)=>b.length-a.length);
  const parts = [];
  let rest = thai;
  while (rest) {
    const space = rest.match(/^\s+/);
    if (space) { rest = rest.slice(space[0].length); continue; }
    const word = candidates.find(word => rest.startsWith(word));
    if (!word) throw new Error(`Unverified Thai reading: ${thai} (remaining ${rest})`);
    parts.push(readings[word]);
    rest = rest.slice(word.length);
  }
  return parts.join(' ');
}
