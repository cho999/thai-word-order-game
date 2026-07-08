import fs from "node:fs";
import vm from "node:vm";

const read = (path) => fs.readFileSync(path, "utf8");
const writeJson = (path, value) => {
  fs.writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

function evaluate(code, extra = "") {
  const context = {};
  vm.runInNewContext(`${code}\n${extra}`, context);
  return context.__data;
}

function extractWordOrder() {
  const source = read("games/rian/script.js");
  const code = source.slice(0, source.indexOf("const maxMistakes"));
  return evaluate(code, "globalThis.__data = { vocabulary, challenges, levels };");
}

function extractThaiLetters() {
  const source = read("games/akson-thai/script.js");
  const end = source.indexOf("const labels");
  const prefix = `
    function level(id, title, note, items) { return { id, title, note, items }; }
    function card(symbol, label, ipa, hint) { return { symbol, label, ipa, hint }; }
  `;
  const code = `${prefix}\n${source.slice(0, end)}`;
  return evaluate(code, "globalThis.__data = { levelLimitSeconds: LEVEL_LIMIT_SECONDS, removedConsonants, data };");
}

function extractVocabLessons() {
  const source = read("games/phuk-thai-kham-sap/script.js");
  const code = source.slice(0, source.indexOf("const storageKey"));
  return evaluate(code, "globalThis.__data = { lessons };");
}

function extractJamAksonThai() {
  const html = read("games/jam-akson-thai/index.html");
  const rareLine = html.match(/const RARE_CONSONANTS = new Set\([^\n]+\);/)?.[0] ?? "const RARE_CONSONANTS = new Set([]);";
  const start = html.indexOf("const CONSONANT_LABEL_LATIN");
  const end = html.indexOf("function composeSyllable");
  const code = `${rareLine}\n${html.slice(start, end)}`;
  return evaluate(code, `globalThis.__data = {
    rareConsonants: [...RARE_CONSONANTS],
    consonantLabels: CONSONANT_LABEL_LATIN,
    consonantIpa: CONSONANT_IPA,
    consonantPairs: CONSONANT_PAIRS_ALL,
    vowelPairs: VOWEL_PAIRS,
    syllableBaseConsonants: SYLLABLE_BASE_CONSONANTS_ALL,
    syllableVowels: SYLLABLE_VOWELS
  };`);
}

const wordOrder = extractWordOrder();
writeJson("data/vocabulary.json", wordOrder.vocabulary);
writeJson("data/word-order-challenges.json", wordOrder.challenges);
writeJson("data/word-order-levels.json", wordOrder.levels);
writeJson("data/thai-letters.json", extractThaiLetters());
writeJson("data/vocab-lessons.json", extractVocabLessons().lessons);
writeJson("data/jam-akson-thai.json", extractJamAksonThai());
