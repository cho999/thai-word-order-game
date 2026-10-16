import { shuffle } from '../../shared/random.js';

// Positions are explicit: Thai vowels and tone marks are not separate graphemes.
// Only these short, previously taught words are used across all four levels.
export const targets = [
  ['แมว',1,0,null,null], ['แพง',1,0,null,null],
  ['แดง',1,0,null,null], ['เร็ว',1,0,null,null],
  ['เล่น',1,0,2,null], ['เหล้า',1,0,3,4],
  ['ไป',1,0,null,null], ['เรือ',1,0,null,null],
  ['ชา',0,null,null,1], ['หมา',1,null,null,2],
  ['ช้า',0,null,1,2], ['มี',0,null,null,1],
  ['สี',0,null,null,1], ['ดู',0,null,null,1],
  ['นี่',0,null,2,1], ['แม่',1,0,2,null],
  ['ดื่ม',0,null,2,null], ['อ่าน',0,null,1,null],
  ['ร้อง',0,null,1,null]
];
export const alphabets = [
  [...'กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ'],
  [...'เแโใไ'], [...'่้๊๋'], [...'ะาำิีึืุูๅ']
];
const meanings = {
  'แมว': 'cat', 'แพง': 'expensive', 'แดง': 'red', 'เร็ว': 'fast',
  'เล่น': 'play', 'เหล้า': 'alcohol', 'ไป': 'go', 'เรือ': 'boat',
  'ชา': 'tea', 'หมา': 'dog', 'ช้า': 'slow', 'มี': 'have',
  'สี': 'color', 'ดู': 'watch / look', 'นี่': 'this', 'แม่': 'mother',
  'ดื่ม': 'drink', 'อ่าน': 'read', 'ร้อง': 'sing'
};
const names = ['子音','語頭の母音','声調記号','語末の母音'];
const $ = id => document.getElementById(id);
let vocabulary, round = [], index = 0, correct = 0, locked = true, timer, mode = 0, mistakes = [];

export function makePool(words, level) {
  return targets.filter(row => row[level + 1] !== null).map(row => {
    const entry = words.find(word => word.th === row[0]);
    if (!entry) throw new Error(`Missing vocabulary: ${row[0]}`);
    const position = row[level + 1];
    return { ...entry, english: meanings[entry.th], answer: entry.th[position], masked: entry.th.slice(0, position) + '＿' + entry.th.slice(position + 1) };
  });
}

function start() {
  clearTimeout(timer);
  mode = Number($('level').value);
  round = shuffle(makePool(vocabulary, mode)).slice(0, 8);
  index = 0; correct = 0; mistakes = [];
  $('result').hidden = true; $('game').hidden = false;
  $('status').textContent = '正解すると自動で次へ進みます。間違えたら答えを確認して「次へ」を押してください。';
  show();
}

function show() {
  locked = false;
  const question = round[index];
  $('progress').textContent = `第${index + 1}問 / 8 ・ 正解 ${correct}`;
  $('meter').value = index;
  $('meaning').textContent = question.english;
  $('word').textContent = question.masked;
  $('instruction').textContent = `空欄に入る${names[mode]}を選んでください。`;
  $('feedback').replaceChildren(); $('next').hidden = true;
  $('choicesTitle').textContent = `${names[mode]}の一覧`;
  $('choices').replaceChildren(...alphabets[mode].map(letter => {
    const button = document.createElement('button');
    button.type = 'button'; button.lang = 'th'; button.dataset.letter = letter;
    button.textContent = /[่้๊๋ิีึืุู]/u.test(letter) ? '◌' + letter : letter;
    button.setAttribute('aria-label', `${names[mode]} ${button.textContent}`);
    button.addEventListener('click', () => answer(letter));
    return button;
  }));
}

function answer(letter) {
  if (locked) return;
  locked = true;
  const question = round[index], success = letter === question.answer;
  if (success) correct++; else mistakes.push(question);
  $('word').textContent = question.th;
  const message = document.createElement('strong');
  message.textContent = success ? '正解！' : `正解は「${question.answer}」です。`;
  const reading = document.createElement('span'); reading.className = 'reading';
  reading.textContent = `発音：${question.thaiReading}`;
  $('feedback').replaceChildren(message, reading);
  for (const button of $('choices').children) {
    button.disabled = true;
    if (button.dataset.letter === question.answer) button.classList.add('correct');
    else if (button.dataset.letter === letter) button.classList.add('wrong');
  }
  if (success) timer = setTimeout(advance, 1800);
  else { $('next').hidden = false; $('next').focus(); }
}

function advance() {
  clearTimeout(timer);
  index++;
  if (index < 8) { show(); $('choices').firstElementChild.focus(); return; }
  $('game').hidden = true; $('result').hidden = false;
  $('score').textContent = `8問中 ${correct}問正解`;
  $('status').textContent = '練習が終わりました。';
  $('review').replaceChildren(...mistakes.map(question => {
    const row = document.createElement('p'); row.className = 'review-row';
    const word = document.createElement('span'); word.lang = 'th'; word.textContent = question.th;
    row.append(word, `${question.english} ｜ ${question.thaiReading}`); return row;
  }));
  $('levelUp').hidden = mode === 3;
  $('again').focus();
}

async function init() {
  $('start').disabled = true;
  try {
    const responses = await Promise.all([fetch('../../data/vocabulary.json'), fetch('../../data/vocab-lessons.json')]);
    if (responses.some(response => !response.ok)) throw new Error('Vocabulary request failed');
    const [words, lessons] = await Promise.all(responses.map(response => response.json()));
    vocabulary = [...words];
    // Mother is already taught in the vocabulary lessons.
    const mother = lessons.flatMap(lesson => lesson.words).find(word => word.thai === 'แม่');
    if (mother) vocabulary.push({ th: mother.thai, ja: '母', thaiReading: mother.roman });
    for (let level = 0; level < 4; level++) {
      if (makePool(vocabulary, level).length < 8) throw new Error('Not enough questions');
    }
    $('start').disabled = false;
    $('start').addEventListener('click', start);
    $('again').addEventListener('click', start);
    $('next').addEventListener('click', advance);
    $('levelUp').addEventListener('click', () => { $('level').value = String(mode + 1); start(); });
  } catch (error) {
    $('status').textContent = '語彙を読み込めませんでした。ページを再読み込みしてください。';
    console.error(error);
  }
}
if (typeof document !== 'undefined') init();
