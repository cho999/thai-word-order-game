// Read-only dictionary lookup; stores the pronunciation evidence used by the migration.
import fs from 'node:fs';
import vm from 'node:vm';
const read = p => fs.readFileSync(p, 'utf8');
const words = new Set();
for (const row of JSON.parse(read('data/vocabulary.json'))) words.add(row.th);
for (const lesson of JSON.parse(read('data/vocab-lessons.json'))) {
  for (const row of lesson.words) words.add(row.thai);
}
const classifiers = read('games/classifiers/script.js');
const context = {};
vm.runInNewContext(classifiers.slice(0, classifiers.indexOf('const $')) + '\nglobalThis.rows = [...CLASSIFIERS, ...NUMBERS.filter(Boolean)];', context);
for (const row of context.rows) { words.add(row.thai); if (row.nounThai) words.add(row.nounThai); }
const jam = read('games/jam-akson-thai/script.js');
for (const match of jam.matchAll(/word:\s*'([^']+)'/g)) if (/^[\u0e00-\u0e7f]+$/.test(match[1])) words.add(match[1]);
// Alphabet names and words used to name the letters.
for (const word of 'ก ข ฃ ค ฅ ฆ ง จ ฉ ช ซ ฌ ญ ฎ ฏ ฐ ฑ ฒ ณ ด ต ถ ท ธ น บ ป ผ ฝ พ ฟ ภ ม ย ร ล ว ศ ษ ส ห ฬ อ ฮ ไก่ ไข่ ขวด ควาย คน ระฆัง งู จาน ฉิ่ง ช้าง โซ่ เฌอ หญิง ชฎา ปฏัก ฐาน มณโฑ ผู้เฒ่า เณร เด็ก เต่า ถุง ทหาร ธง หนู ใบไม้ ปลา ผึ้ง ฝา พาน ฟัน สำเภา ม้า ยักษ์ เรือ ลิง แหวน ศาลา ฤๅษี เสือ หีบ จุฬา อ่าง นกฮูก ผม ฉัน ช้า ไป เที่ยว ซื้อ ขนม ปัง พวก น้ำ ไม่ ใช่ น่า สนใจ เพื่อน ร่วม งาน นัก ว่าย ดนตรี ธุรกิจ ลงทุน ร้อง ภาษา ว่า ได้ ไหม แปล'.split(' ')) words.add(word);
words.delete('ผม/ฉัน');
for (const word of ['ขับ', 'ไพ่', 'ราเม็ง']) words.add(word);
const path = 'data/ipa-sources.json';
// Components of the expressions in the Cho PDF lesson.
for (const word of 'อีก แค่ เป็น ยัง ไง บ้าง ช่วง ยุ่ง มาก เหนื่อย ว่าง เหมือน เดิม อะไร พิเศษ ดี ต่อ สุขภาพ ยังไง'.split(' ')) words.add(word);
const existing = fs.existsSync(path) ? JSON.parse(read(path)) : { retrieved: '2026-10-16', source: 'English Wiktionary, Thai pronunciation sections', entries: {} };
const decode = s => s.replace(/<[^>]*>/g, '').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n,16))).replace(/&nbsp;/g,' ').replace(/&amp;/g,'&');
const pending = [...words].filter(w => !existing.entries[w] || existing.entries[w].status === 429);
for (let start = 0; start < pending.length; start += 1) {
  await Promise.all(pending.slice(start,start+1).map(async word => {
    const url = 'https://en.wiktionary.org/wiki/' + encodeURIComponent(word);
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(25000), headers: { 'User-Agent': 'ThaiLearningMaterials/1.0 (pronunciation verification)' } });
      const html = await response.text();
      const thaiStart = html.search(/<h2[^>]*id="Thai"/);
      const section = thaiStart < 0 ? '' : html.slice(thaiStart).split(/<h2\b/).slice(0,2).join('<h2');
      const ipa = [...new Set([...section.matchAll(/<span class="IPA"[^>]*>(.*?)<\/span>/gs)].map(m => decode(m[1])))];
      if (response.status === 429) {
        console.log('Rate limited; stop and retry later.');
        throw new Error('HTTP 429');
      }
      existing.entries[word] = { url, resolvedUrl: response.url, status: response.status, ipa };
      console.log(word, JSON.stringify(ipa));
    } catch (error) { console.log('FAILED', word, error.message); throw error; }
  }));
  fs.writeFileSync(path, JSON.stringify(existing,null,2)+'\n');
  await new Promise(resolve => setTimeout(resolve, 1400));
}
