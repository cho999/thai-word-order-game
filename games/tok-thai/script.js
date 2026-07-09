const lessonsUrl = "../../data/vocab-lessons.json";
const targetCorrect = 15;
const baseFallDuration = 7200;
const thaiConsonantPattern = /[\u0E01-\u0E2E]/g;
const thaiConsonantSet = new Set("กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ".split(""));
const thaiMarkPattern = /[\u0E30-\u0E3A\u0E40-\u0E4E]/;

const fallbackWords = [
  { id: "dog", thai: "หมา", roman: "mǎa", english: "dog" },
  { id: "cat", thai: "แมว", roman: "maaeo", english: "cat" },
  { id: "milk", thai: "นม", roman: "nom", english: "milk" },
  { id: "you", thai: "คุณ", roman: "khun", english: "you" },
  { id: "go", thai: "ไป", roman: "bpai", english: "go" },
  { id: "watch", thai: "ดู", roman: "duu", english: "watch" }
];

const $ = (selector) => document.querySelector(selector);
const startButton = $("#startButton");
const againButton = $("#againButton");
const fallingWord = $("#fallingWord");
const stoneStack = $("#stoneStack");
const well = $("#well");
const wellMessage = $("#wellMessage");
const choiceGrid = $("#choiceGrid");
const feedback = $("#feedback");
const correctCount = $("#correctCount");
const speedLabel = $("#speedLabel");
const roundLabel = $("#roundLabel");
const poolLabel = $("#poolLabel");
const resultPanel = $("#resultPanel");
const resultText = $("#resultText");
const mistakeList = $("#mistakeList");

const state = {
  words: [],
  queue: [],
  current: null,
  correct: 0,
  speedMultiplier: 1,
  mistakes: [],
  stones: [],
  active: false,
  fallStart: 0,
  fallDuration: baseFallDuration,
  rafId: null
};

init();

async function init() {
  state.words = await loadWords();
  poolLabel.textContent = state.words.length;
  startButton.addEventListener("click", startGame);
  againButton.addEventListener("click", startGame);
  document.addEventListener("keydown", handleKeyPress);
  renderChoices([]);
  updateHud();
}

async function loadWords() {
  try {
    const response = await fetch(lessonsUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Vocabulary request failed: ${response.status}`);
    const lessons = await response.json();
    const words = lessons
      .flatMap((lesson) => lesson.words || [])
      .filter(isShortThaiWord)
      .map((word, index) => ({ ...word, gameId: `${word.id || "word"}-${index}` }));
    return words.length >= targetCorrect ? words : [...words, ...fallbackWords];
  } catch (error) {
    console.warn("Using fallback Ron Kham Sap words.", error);
    return fallbackWords;
  }
}

function isShortThaiWord(word) {
  if (!word?.thai || !word?.roman) return false;
  if (/[\s/]/.test(word.roman.trim())) return false;
  const consonants = word.thai.match(thaiConsonantPattern) || [];
  return consonants.length > 0 && consonants.length <= 2;
}

function startGame() {
  cancelAnimationFrame(state.rafId);
  state.queue = shuffle([...state.words]);
  state.current = null;
  state.correct = 0;
  state.speedMultiplier = 1;
  state.mistakes = [];
  state.stones = [];
  state.active = true;
  resultPanel.classList.add("hidden");
  wellMessage.classList.add("hidden");
  feedback.className = "feedback";
  feedback.textContent = "Read the pronunciation and choose quickly. Each correct answer raises the speed by 0.1.";
  renderStones();
  updateHud();
  spawnWord();
}

function spawnWord() {
  if (state.correct >= targetCorrect) {
    finishGame();
    return;
  }
  if (!state.queue.length) state.queue = shuffle([...state.words]);
  state.current = state.queue.pop();
  state.fallDuration = baseFallDuration / state.speedMultiplier;
  state.fallStart = performance.now();
  fallingWord.innerHTML = colorThaiWord(state.current.thai);
  fallingWord.classList.remove("hidden");
  renderChoices(buildChoices(state.current));
  setChoiceDisabled(false);
  tick(state.fallStart);
}

function tick(now) {
  if (!state.active || !state.current) return;
  const progress = Math.min((now - state.fallStart) / state.fallDuration, 1);
  const wellHeight = well.clientHeight;
  const wordHeight = fallingWord.offsetHeight || 72;
  const stoneRows = Math.ceil(state.stones.length / 4);
  const stoneHeight = Math.min(stoneRows * 44, wellHeight * .38);
  const maxY = Math.max(0, wellHeight - wordHeight - stoneHeight - 18);
  fallingWord.style.transform = `translate(-50%, ${progress * maxY}px)`;
  if (progress >= 1) {
    missCurrent("time");
    return;
  }
  state.rafId = requestAnimationFrame(tick);
}

function answer(choice) {
  if (!state.active || !state.current) return;
  if (choice === state.current.roman) {
    cancelAnimationFrame(state.rafId);
    state.correct += 1;
    state.speedMultiplier = Number((state.speedMultiplier + 0.1).toFixed(1));
    feedback.className = "feedback good";
    feedback.textContent = `Correct: ${state.current.thai} = ${state.current.roman}`;
    fallingWord.classList.add("hidden");
    state.current = null;
    updateHud();
    setChoiceDisabled(true);
    window.setTimeout(spawnWord, 420);
    return;
  }
  missCurrent("wrong", choice);
}

function missCurrent(reason, choice = "") {
  if (!state.current) return;
  cancelAnimationFrame(state.rafId);
  const missed = state.current;
  state.mistakes.push({ ...missed, selected: choice, reason });
  state.stones.push(missed);
  if (state.stones.length > 16) state.stones.shift();
  feedback.className = "feedback bad";
  feedback.textContent = reason === "time"
    ? `Time out: ${missed.thai} is ${missed.roman}`
    : `Not quite: ${missed.thai} is ${missed.roman}`;
  fallingWord.classList.add("hidden");
  state.current = null;
  renderStones();
  updateHud();
  setChoiceDisabled(true);
  window.setTimeout(spawnWord, 640);
}

function finishGame() {
  state.active = false;
  state.current = null;
  cancelAnimationFrame(state.rafId);
  fallingWord.classList.add("hidden");
  choiceGrid.innerHTML = "";
  wellMessage.innerHTML = "<strong>Clear!</strong><span>15 words cleared.</span>";
  wellMessage.classList.remove("hidden");
  resultPanel.classList.remove("hidden");
  resultText.textContent = state.mistakes.length
    ? `${state.mistakes.length} words turned to stone. Check the correct pronunciation below.`
    : "No misses. Your reaction to short Thai words is getting sharp.";
  renderMistakes();
  updateHud();
}

function buildChoices(word) {
  const variants = new Set([word.roman]);
  generateSoundAlikes(word.roman).forEach((variant) => variants.add(variant));
  generateFallbackDistractors(word.roman).forEach((variant) => variants.add(variant));
  return shuffle([...variants].slice(0, 4));
}

function generateSoundAlikes(roman) {
  const variants = new Set();
  const swaps = [
    [/aa/g, "a"], [/a(?!a)/g, "aa"],
    [/ii/g, "i"], [/i(?!i)/g, "ii"],
    [/uu/g, "u"], [/u(?!u)/g, "uu"],
    [/ee/g, "e"], [/e(?!e)/g, "ee"],
    [/oo/g, "o"], [/o(?!o)/g, "oo"],
    [/ɛɛ/g, "ee"], [/ɔɔ/g, "oo"], [/ʉʉ/g, "uu"],
    [/kh/g, "k"], [/(^|[^k])k/g, "$1kh"],
    [/ph/g, "p"], [/(^|[^p])p/g, "$1ph"],
    [/th/g, "t"], [/(^|[^t])t/g, "$1th"],
    [/ch/g, "j"], [/j/g, "ch"],
    [/d/g, "t"], [/t/g, "d"],
    [/s/g, "th"], [/r/g, "l"], [/l/g, "r"],
    [/bp/g, "b"], [/b(?!p)/g, "bp"],
    [/ai/g, "aai"], [/ao/g, "aao"], [/ʉ/g, "u"]
  ];
  swaps.forEach(([pattern, replacement]) => {
    const candidate = roman.replace(pattern, replacement);
    if (candidate !== roman && candidate.length <= roman.length + 3) variants.add(candidate);
  });
  if (roman.endsWith("ng")) variants.add(`${roman.slice(0, -2)}n`);
  if (roman.endsWith("n")) variants.add(`${roman.slice(0, -1)}ng`);
  if (roman.endsWith("m")) variants.add(`${roman.slice(0, -1)}n`);
  return shuffle([...variants]).slice(0, 8);
}

function generateFallbackDistractors(roman) {
  const variants = new Set();
  const plain = roman.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const vowels = ["a", "i", "u", "e", "o"];
  vowels.forEach((vowel) => {
    if (plain.includes(vowel)) {
      variants.add(plain.replace(vowel, `${vowel}${vowel}`));
      variants.add(plain.replace(`${vowel}${vowel}`, vowel));
    }
  });
  ["h", "ng", "n", "t", "k"].forEach((ending) => variants.add(`${plain}${ending}`));
  if (plain.length > 2) variants.add(plain.slice(0, -1));
  return [...variants].filter((variant) => variant && variant !== roman && variant.length <= roman.length + 3);
}

function colorThaiWord(thai) {
  return [...thai].map((char) => {
    const className = thaiConsonantSet.has(char)
      ? "letter-consonant"
      : thaiMarkPattern.test(char)
        ? "letter-vowel"
        : "letter-other";
    return `<span class="${className}">${char}</span>`;
  }).join("");
}

function renderChoices(choices) {
  choiceGrid.innerHTML = choices.map((choice, index) => (
    `<button class="choice-button" type="button" data-choice="${escapeAttribute(choice)}">${index + 1}. ${choice}</button>`
  )).join("");
  choiceGrid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => answer(button.dataset.choice));
  });
}

function renderStones() {
  stoneStack.innerHTML = state.stones.map((word) => `<div class="stone">${colorThaiWord(word.thai)}</div>`).join("");
}

function renderMistakes() {
  if (!state.mistakes.length) {
    mistakeList.innerHTML = "";
    return;
  }
  mistakeList.innerHTML = state.mistakes.map((word) => {
    const note = word.reason === "time" ? "time out" : `picked ${word.selected}`;
    return `
      <div class="mistake-item">
        <strong>${colorThaiWord(word.thai)}</strong>
        <span>${word.roman} / ${word.english || ""} (${note})</span>
      </div>
    `;
  }).join("");
}

function setChoiceDisabled(disabled) {
  choiceGrid.querySelectorAll("button").forEach((button) => {
    button.disabled = disabled;
  });
}

function updateHud() {
  correctCount.textContent = state.correct;
  speedLabel.textContent = `${state.speedMultiplier.toFixed(1)}x`;
  roundLabel.textContent = `${state.correct} / ${targetCorrect}`;
}

function handleKeyPress(event) {
  const key = Number(event.key);
  if (!key || key < 1 || key > 4) return;
  const button = choiceGrid.querySelectorAll("button")[key - 1];
  if (button && !button.disabled) answer(button.dataset.choice);
}

function shuffle(items) {
  const array = [...items];
  for (let index = array.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }
  return array;
}

function escapeAttribute(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
