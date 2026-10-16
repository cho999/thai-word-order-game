import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const lessons = JSON.parse(fs.readFileSync('data/vocab-lessons.json', 'utf8'));
const lesson = lessons.find(item => item.id === 'lesson4');
assert.equal(lesson.words.length, 88);
assert.equal(new Set(lessons.flatMap(item => item.words.map(word => word.id))).size, lessons.flatMap(item => item.words).length);
for (const key of ['thai', 'roman', 'english']) {
  assert.equal(new Set(lesson.words.map(word => word[key])).size, lesson.words.length, `Duplicate ${key} choices`);
}
const stub = () => ({textContent: '', innerHTML: '', style: {}, classList: {add(){}, remove(){}, contains(){return true;}, toggle(){}}, querySelectorAll(){return [];}});
const context = vm.createContext({document: {querySelector: stub}, localStorage: {getItem(){return null;}}, console});
const source = fs.readFileSync('games/phuk-thai-kham-sap/script.js', 'utf8').replace('\ninit();', '');
vm.runInContext(source + '\nlessons = fallbackLessons; state.lessonId = "lesson4";', context);
vm.runInContext(`
  for (const word of getLessonWords()) {
    for (const mode of ['thaiToEnglish', 'englishToThai']) {
      for (const display of ['thai', 'roman']) {
        state.mode = mode; state.display = display;
        const choices = makeChoices(word);
        if (choices.length !== 6 || new Set(choices.map(choiceText)).size !== 6) throw new Error('Invalid six choices');
        if (choices.filter(choice => choice.id === word.id).length !== 1) throw new Error('Missing correct choice');
      }
    }
    handleWrong(word); handleWrong(word);
    if (!getWordProgress(word.id).inReview) throw new Error('Missing review word');
    state.activeMode = 'review';
    handleCorrect(word); handleCorrect(word);
    if (!getWordProgress(word.id).inReview) throw new Error('Graduated too early');
    handleCorrect(word);
    if (getWordProgress(word.id).inReview) throw new Error('Failed to graduate');
  }
`, context);
const ron = fs.readFileSync('games/tok-thai/script.js', 'utf8');
const filter = ron.slice(ron.indexOf('function isShortThaiWord'), ron.indexOf('function startGame'));
const ronContext = vm.createContext({words: lesson.words});
vm.runInContext('const thaiConsonantPattern = /[\\u0E01-\\u0E2E]/g;\n' + filter + '\nglobalThis.count = words.filter(isShortThaiWord).length;', ronContext);
console.log(`PASS: 88 entries, unique choices in both directions and displays, review entry/graduation; ${ronContext.count} Lesson 4 entries eligible for Ron.`);
