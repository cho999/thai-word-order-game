const vocabulary = [
  { id: 1, ja: "おかし", romaji: "okashi", th: "ขนม", thaiReading: "khanom" },
  { id: 2, ja: "くるま", romaji: "kuruma", th: "รถ", thaiReading: "rot" },
  { id: 3, ja: "ガパオ", romaji: "gapao", th: "กะเพรา", thaiReading: "kaprao" },
  { id: 4, ja: "かいせん", romaji: "kaisen", th: "ทะเล", thaiReading: "thale" },
  { id: 5, ja: "ラーメン", romaji: "raamen", th: "ราเมน", thaiReading: "ramen" },
  { id: 6, ja: "しょうゆ", romaji: "shouyu", th: "โชยุ", thaiReading: "shoyu" },
  { id: 7, ja: "おちゃ", romaji: "ocha", th: "ชา", thaiReading: "chaa" },
  { id: 8, ja: "ふね", romaji: "fune", th: "เรือ", thaiReading: "ruea" },
  { id: 9, ja: "タイの", romaji: "tai no", th: "ไทย", thaiReading: "thai" },
  { id: 10, ja: "にほんの", romaji: "nihon no", th: "ญี่ปุ่น", thaiReading: "yipun" },
  { id: 11, ja: "からい", romaji: "karai", th: "เผ็ด", thaiReading: "phet" },
  { id: 12, ja: "あまい", romaji: "amai", th: "หวาน", thaiReading: "waan" },
  { id: 13, ja: "やすい", romaji: "yasui", th: "ถูก", thaiReading: "thuuk" },
  { id: 14, ja: "たかい", romaji: "takai", th: "แพง", thaiReading: "phaeng" },
  { id: 15, ja: "とても", romaji: "totemo", th: "มาก", thaiReading: "maak" },
  { id: 16, ja: "いろの", romaji: "iro no", th: "สี", thaiReading: "sii" },
  { id: 17, ja: "ねだんの", romaji: "nedan no", th: "ราคา", thaiReading: "raakhaa" },
  { id: 18, ja: "あじの", romaji: "aji no", th: "รส", thaiReading: "rot" },
  { id: 19, ja: "あかい", romaji: "akai", th: "แดง", thaiReading: "daeng" },
  { id: 20, ja: "くろい", romaji: "kuroi", th: "ดำ", thaiReading: "dam" },
  { id: 21, ja: "ペン", romaji: "pen", th: "ปากกา", thaiReading: "paakkaa" },
  { id: 22, ja: "かみ", romaji: "kami", th: "กระดาษ", thaiReading: "kradaat" },
  { id: 23, ja: "スープ", romaji: "suupu", th: "ซุป", thaiReading: "sup" },
  { id: 24, ja: "バイク", romaji: "baiku", th: "มอเตอร์ไซค์", thaiReading: "motosai" },
  { id: 25, ja: "あおい", romaji: "aoi", th: "น้ำเงิน", thaiReading: "nam ngoen" },
  { id: 26, ja: "ゆうめいな", romaji: "yuumei na", th: "ดัง", thaiReading: "dang" },
  { id: 27, ja: "はやい", romaji: "hayai", th: "เร็ว", thaiReading: "reo" },
  { id: 28, ja: "おそい", romaji: "osoi", th: "ช้า", thaiReading: "chaa" }
];

const challenges = [
  { no: 1, ids: [10, 8], th: "เรือญี่ปุ่น", reading: "ruea yipun" },
  { no: 2, ids: [15, 11, 18, 9, 1], th: "ขนมไทยรสเผ็ดมาก", reading: "khanom thai rot phet maak" },
  { no: 3, ids: [19, 16, 2], th: "รถสีแดง", reading: "rot sii daeng" },
  { no: 4, ids: [15, 13, 17, 5], th: "ราเมนราคาถูกมาก", reading: "ramen raakhaa thuuk maak" },
  { no: 5, ids: [15, 13, 17, 10, 6, 5], th: "ราเมนโชยุญี่ปุ่นราคาถูกมาก", reading: "ramen shoyu yipun raakhaa thuuk maak" },
  { no: 6, ids: [20, 16, 10, 2], th: "รถญี่ปุ่นสีดำ", reading: "rot yipun sii dam" },
  { no: 7, ids: [10, 6, 5], th: "ราเมนโชยุญี่ปุ่น", reading: "ramen shoyu yipun" },
  { no: 8, ids: [15, 14, 17, 10, 8], th: "เรือญี่ปุ่นราคาแพงมาก", reading: "ruea yipun raakhaa phaeng maak" },
  { no: 9, ids: [15, 12, 18, 7], th: "ชารสหวานมาก", reading: "chaa rot waan maak" },
  { no: 10, ids: [9, 7], th: "ชาไทย", reading: "chaa thai" },
  { no: 11, ids: [15, 13, 17, 9, 7], th: "ชาไทยราคาถูกมาก", reading: "chaa thai raakhaa thuuk maak" },
  { no: 12, ids: [11, 18, 4, 3], th: "กะเพราทะเลรสเผ็ด", reading: "kaprao thale rot phet" },
  { no: 13, ids: [20, 16, 8], th: "เรือสีดำ", reading: "ruea sii dam" },
  { no: 14, ids: [15, 11, 18, 9, 4, 3], th: "กะเพราทะเลไทยรสเผ็ดมาก", reading: "kaprao thale thai rot phet maak" },
  { no: 15, ids: [15, 14, 17, 2], th: "รถราคาแพงมาก", reading: "rot raakhaa phaeng maak" },
  { no: 16, ids: [15, 12, 18, 9, 7], th: "ชาไทยรสหวานมาก", reading: "chaa thai rot waan maak" },
  { no: 17, ids: [13, 17, 1], th: "ขนมราคาถูก", reading: "khanom raakhaa thuuk" },
  { no: 18, ids: [19, 16, 9, 8], th: "เรือไทยสีแดง", reading: "ruea thai sii daeng" },
  { no: 19, ids: [14, 17, 20, 16, 2], th: "รถสีดำราคาแพง", reading: "rot sii dam raakhaa phaeng" },
  { no: 20, ids: [12, 18, 9, 1], th: "ขนมไทยรสหวาน", reading: "khanom thai rot waan" },
  { no: 21, ids: [14, 17, 19, 16, 8], th: "เรือสีแดงราคาแพง", reading: "ruea sii daeng raakhaa phaeng" },
  { no: 22, ids: [15, 11, 18, 3], th: "กะเพรารสเผ็ดมาก", reading: "kaprao rot phet maak" }
];

challenges.push(
  { no: 23, ids: [19, 16, 22], th: "กระดาษสีแดง", reading: "kradaat sii daeng" },
  { no: 24, ids: [20, 16, 21], th: "ปากกาสีดำ", reading: "paakkaa sii dam" },
  { no: 25, ids: [25, 16, 22], th: "กระดาษสีน้ำเงิน", reading: "kradaat sii nam ngoen" },
  { no: 26, ids: [27, 24], th: "มอเตอร์ไซค์เร็ว", reading: "motosai reo" },
  { no: 27, ids: [28, 24], th: "มอเตอร์ไซค์ช้า", reading: "motosai chaa" },
  { no: 28, ids: [26, 2], th: "รถดัง", reading: "rot dang" },
  { no: 29, ids: [26, 23], th: "ซุปดัง", reading: "sup dang" },
  { no: 30, ids: [14, 17, 21], th: "ปากการาคาแพง", reading: "paakkaa raakhaa phaeng" },
  { no: 31, ids: [13, 17, 22], th: "กระดาษราคาถูก", reading: "kradaat raakhaa thuuk" },
  { no: 32, ids: [25, 16, 26, 2], th: "รถดังสีน้ำเงิน", reading: "rot dang sii nam ngoen" },
  { no: 33, ids: [27, 26, 24], th: "มอเตอร์ไซค์ดังเร็ว", reading: "motosai dang reo" },
  { no: 34, ids: [15, 14, 17, 24], th: "มอเตอร์ไซค์ราคาแพงมาก", reading: "motosai raakhaa phaeng maak" },
  { no: 35, ids: [12, 18, 23], th: "ซุปรสหวาน", reading: "sup rot waan" },
  { no: 36, ids: [11, 18, 23], th: "ซุปรสเผ็ด", reading: "sup rot phet" },
  { no: 37, ids: [14, 17, 20, 16, 21], th: "ปากกาสีดำราคาแพง", reading: "paakkaa sii dam raakhaa phaeng" },
  { no: 38, ids: [15, 14, 17, 20, 16, 21], th: "ปากกาสีดำราคาแพงมาก", reading: "paakkaa sii dam raakhaa phaeng maak" },
  { no: 39, ids: [15, 13, 17, 25, 16, 22], th: "กระดาษสีน้ำเงินราคาถูกมาก", reading: "kradaat sii nam ngoen raakhaa thuuk maak" },
  { no: 40, ids: [27, 25, 16, 26, 2], th: "รถดังสีน้ำเงินเร็ว", reading: "rot dang sii nam ngoen reo" },
  { no: 41, ids: [28, 20, 16, 24], th: "มอเตอร์ไซค์สีดำช้า", reading: "motosai sii dam chaa" },
  { no: 42, ids: [15, 11, 18, 26, 23], th: "ซุปดังรสเผ็ดมาก", reading: "sup dang rot phet maak" },
  { no: 43, ids: [25, 26, 2], th: "รถดังสีน้ำเงิน", reading: "rot dang sii nam ngoen" }
);

const levels = {
  1: { min: 2, max: 3, seconds: 13, rows: 1 },
  2: { min: 2, max: 3, seconds: 13, rows: 2 },
  3: { min: 3, max: 4, seconds: 12, rows: 2 },
  4: { min: 3, max: 4, seconds: 12, rows: 3 },
  5: { min: 4, max: 5, seconds: 12, rows: 3 },
  6: { min: 4, max: 5, seconds: 12, rows: 4 }
};

const maxMistakes = 4;

const $ = (selector) => document.querySelector(selector);
const vocabById = new Map(vocabulary.map((word) => [word.id, word]));

const state = {
  mode: "thaiToJapanese",
  level: 1,
  score: 0,
  streak: 0,
  levelCorrect: 0,
  misses: 0,
  wrongs: [],
  current: null,
  poolIds: [],
  handIds: [],
  timerId: null,
  nextTimerId: null,
  startedAt: 0,
  duration: 0,
  locked: true,
  gameOver: false
};

const pool = $("#pool");
const hand = $("#hand");
const promptMain = $("#promptMain");
const promptReading = $("#promptReading");
const roundLabel = $("#roundLabel");
const motto = $("#motto");
const message = $("#message");
const timerText = $("#timerText");
const timerBar = $("#timerBar");
const score = $("#score");
const streak = $("#streak");
const misses = $("#misses");
const titleScreen = $("#titleScreen");
const gameScreen = $("#gameScreen");
const reviewScreen = $("#reviewScreen");
const reviewList = $("#reviewList");
let audioContext = null;
let bgmTimer = null;
let bgmStep = 0;

document.querySelectorAll(".mode-button").forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    document.querySelectorAll(".mode-button").forEach((item) => item.classList.toggle("active", item === button));
    motto.textContent = "";
    if (state.current) renderChallenge();
  });
});

$("#levelSelect").addEventListener("change", (event) => {
  state.level = Number(event.target.value);
  state.levelCorrect = 0;
  updateStatus();
});

$("#startButton").addEventListener("click", () => {
  startAudio();
  resetGame();
  showScreen("game");
  startRound();
});

$("#backToTitleButton").addEventListener("click", () => {
  showScreen("title");
});

$("#clearButton").addEventListener("click", () => {
  if (state.locked) return;
  state.handIds = [];
  renderCards();
  setMessage("てふだをばにもどしました。", "");
});

pool.addEventListener("dragover", allowDrop);
hand.addEventListener("dragover", allowDrop);
pool.addEventListener("drop", (event) => dropToZone(event, "pool"));
hand.addEventListener("drop", (event) => dropToZone(event, "hand"));

function startRound() {
  if (state.nextTimerId) {
    window.clearTimeout(state.nextTimerId);
    state.nextTimerId = null;
  }
  if (state.gameOver) return;
  const config = levels[state.level];
  const candidates = challenges.filter((item) => item.ids.length >= config.min && item.ids.length <= config.max);
  state.current = candidates[Math.floor(Math.random() * candidates.length)];
  state.poolIds = makeChoices(state.current.ids, config.rows);
  state.handIds = [];
  state.duration = config.seconds * 1000;
  state.startedAt = performance.now();
  state.locked = false;
  renderChallenge();
  renderCards();
  updateStatus();
  setMessage("ただしいじゅんばんにおけたら、じどうではんていします。", "");
  startTimer();
}

function renderChallenge() {
  const challenge = state.current;
  const words = challenge.ids.map((id) => vocabById.get(id));
  roundLabel.textContent = `No.${challenge.no} / ${challenge.ids.length}ご`;
  if (state.mode === "thaiToJapanese") {
    promptMain.textContent = challenge.th;
    promptReading.textContent = challenge.reading;
  } else {
    promptMain.textContent = words.map((word) => word.ja).join("");
    promptReading.textContent = words.map((word) => word.romaji).join(" / ");
  }
}

function renderCards() {
  renderZone(pool, state.poolIds, "pool");
  renderZone(hand, state.handIds, "hand");
}

function renderZone(zone, ids, zoneName) {
  zone.innerHTML = "";
  ids.forEach((id, index) => {
    const card = createCard(id, zoneName, index);
    zone.appendChild(card);
  });
}

function createCard(id, zoneName, index) {
  const word = vocabById.get(id);
  const card = document.createElement("button");
  card.type = "button";
  card.className = "word-card";
  const usedInHand = zoneName === "pool" && state.handIds.includes(id);
  if (usedInHand) card.classList.add("used");
  card.draggable = !state.locked && !usedInHand;
  card.dataset.id = id;
  card.dataset.zone = zoneName;
  card.dataset.index = index;
  const main = state.mode === "thaiToJapanese" ? word.ja : word.th;
  const reading = state.mode === "thaiToJapanese" ? word.romaji : word.thaiReading;
  card.innerHTML = `
    <span class="word">${main}</span>
    <span class="reading">${reading}</span>
  `;
  card.addEventListener("click", () => moveByClick(id, zoneName));
  card.addEventListener("dragstart", (event) => {
    if (usedInHand) {
      event.preventDefault();
      return;
    }
    event.dataTransfer.setData("text/plain", JSON.stringify({ id, from: zoneName }));
    card.classList.add("dragging");
  });
  card.addEventListener("dragend", () => card.classList.remove("dragging"));
  return card;
}

function moveByClick(id, from) {
  if (state.locked) return;
  if (from === "pool") {
    if (state.handIds.includes(id)) return;
    state.handIds.push(id);
  } else {
    removeId(state.handIds, id);
  }
  renderCards();
  autoCheckAnswer();
}

function allowDrop(event) {
  event.preventDefault();
}

function dropToZone(event, targetZone) {
  event.preventDefault();
  if (state.locked) return;
  const raw = event.dataTransfer.getData("text/plain");
  if (!raw) return;
  const data = JSON.parse(raw);
  if (targetZone === "pool") {
    removeId(state.handIds, data.id);
    renderCards();
    autoCheckAnswer();
    return;
  }
  if (data.from === "pool" && state.handIds.includes(data.id)) return;
  removeId(state.handIds, data.id);
  const targetArray = state.handIds;
  const afterElement = getDragAfterElement(event.currentTarget, event.clientX, event.clientY);
  if (!afterElement) {
    targetArray.push(data.id);
  } else {
    const afterId = Number(afterElement.dataset.id);
    targetArray.splice(targetArray.indexOf(afterId), 0, data.id);
  }
  renderCards();
  autoCheckAnswer();
}

function getDragAfterElement(container, x, y) {
  const cards = [...container.querySelectorAll(".word-card:not(.dragging)")];
  return cards.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2 + (x - box.left - box.width / 2) * .15;
    if (offset < 0 && offset > closest.offset) return { offset, element: child };
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}

function autoCheckAnswer() {
  if (state.locked || !state.current) return;
  const answer = getAnswerIds();
  if (state.handIds.length < answer.length) {
    setMessage(`あと${answer.length - state.handIds.length}まいです。`, "");
    return;
  }
  if (arraysEqual(state.handIds, answer)) {
    finishRound(true, "せいかいです。ポイントをとりました。");
    return;
  }
  finishRound(false, "ちがいます。");
}

function finishRound(correct, text) {
  stopTimer();
  state.locked = true;
  if (correct) {
    playSe("correct");
    state.score += 1;
    state.streak += 1;
    state.levelCorrect += 1;
    const promoted = advanceLevelIfNeeded();
    const nextText = promoted ? ` Lv${state.level}へアップ。` : " つぎのおだいへ。";
    setMessage(`${text}${nextText}`, "good");
    state.nextTimerId = window.setTimeout(startRound, 900);
  } else {
    playSe(state.misses + 1 >= maxMistakes ? "gameover" : "wrong");
    state.streak = 0;
    state.misses += 1;
    rememberWrong(text);
    if (state.misses >= maxMistakes) {
      state.gameOver = true;
      stopBgm();
      setMessage(`${text} GAME OVER せいかい: ${answerText()}`, "bad");
      window.setTimeout(showReview, 1100);
    } else {
      setMessage(`${text} ミス ${state.misses}/${maxMistakes}。つぎのおだいへ。せいかい: ${answerText()}`, "bad");
      state.nextTimerId = window.setTimeout(startRound, 1400);
    }
  }
  updateStatus();
  markCards();
}

function markCards() {
  const answer = getAnswerIds();
  [...hand.children].forEach((card, index) => {
    card.classList.add(Number(card.dataset.id) === answer[index] ? "correct" : "wrong");
  });
}

function getAnswerIds() {
  return state.mode === "thaiToJapanese" ? [...state.current.ids] : [...state.current.ids].reverse();
}

function answerText() {
  const ids = getAnswerIds();
  return ids.map((id) => {
    const word = vocabById.get(id);
    return state.mode === "thaiToJapanese" ? word.ja : `${word.th}(${word.thaiReading})`;
  }).join(" / ");
}

function startTimer() {
  stopTimer();
  updateTimer();
  state.timerId = window.setInterval(updateTimer, 80);
}

function stopTimer() {
  if (state.timerId) window.clearInterval(state.timerId);
  state.timerId = null;
}

function updateTimer() {
  const elapsed = performance.now() - state.startedAt;
  const remaining = Math.max(0, state.duration - elapsed);
  const ratio = remaining / state.duration;
  timerText.textContent = (remaining / 1000).toFixed(1);
  timerBar.style.width = `${ratio * 100}%`;
  if (remaining <= 0) {
    finishRound(false, "じかんぎれです。");
  }
}

function setMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
}

function resetGame() {
  stopTimer();
  if (state.nextTimerId) {
    window.clearTimeout(state.nextTimerId);
    state.nextTimerId = null;
  }
  state.level = Number($("#levelSelect").value);
  state.score = 0;
  state.streak = 0;
  state.levelCorrect = 0;
  state.misses = 0;
  state.wrongs = [];
  state.gameOver = false;
  state.locked = true;
  updateStatus();
}

function rememberWrong(reason) {
  const words = state.current.ids.map((id) => vocabById.get(id));
  const prompt = state.mode === "thaiToJapanese"
    ? `${state.current.th} / ${state.current.reading}`
    : words.map((word) => word.ja).join("");
  const userAnswer = state.handIds.length
    ? state.handIds.map((id) => cardText(id)).join(" / ")
    : "みかいとう";
  state.wrongs.push({
    no: state.current.no,
    reason,
    prompt,
    userAnswer,
    answer: answerText()
  });
}

function cardText(id) {
  const word = vocabById.get(id);
  return state.mode === "thaiToJapanese" ? word.ja : `${word.th}(${word.thaiReading})`;
}

function showReview() {
  renderReview();
  showScreen("review");
}

function renderReview() {
  if (!state.wrongs.length) {
    reviewList.innerHTML = '<p class="review-empty">ミスはありません。</p>';
    return;
  }
  reviewList.innerHTML = state.wrongs.map((item) => `
    <article class="review-card">
      <div class="review-head">No.${item.no} / ${item.reason}</div>
      <div><span>おだい</span><p>${item.prompt}</p></div>
      <div><span>あなた</span><p>${item.userAnswer}</p></div>
      <div><span>せいかい</span><p>${item.answer}</p></div>
    </article>
  `).join("");
}

function showScreen(name) {
  titleScreen.classList.toggle("hidden", name !== "title");
  gameScreen.classList.toggle("hidden", name !== "game");
  reviewScreen.classList.toggle("hidden", name !== "review");
}

function startAudio() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  if (!audioContext) audioContext = new AudioCtx();
  if (audioContext.state === "suspended") audioContext.resume();
  startBgm();
}

function startBgm() {
  if (!audioContext || bgmTimer) return;
  const notes = [196, 247, 294, 247, 220, 277, 330, 277];
  bgmTimer = window.setInterval(() => {
    playTone(notes[bgmStep % notes.length], .055, .025, "triangle");
    bgmStep += 1;
  }, 420);
}

function stopBgm() {
  if (!bgmTimer) return;
  window.clearInterval(bgmTimer);
  bgmTimer = null;
}

function playSe(type) {
  if (!audioContext) return;
  if (type === "correct") {
    playTone(660, .08, .09, "sine");
    window.setTimeout(() => playTone(990, .1, .075, "sine"), 80);
  } else if (type === "wrong") {
    playTone(180, .12, .12, "sawtooth");
  } else {
    playTone(120, .32, .16, "square");
    window.setTimeout(() => playTone(85, .38, .13, "square"), 120);
  }
}

function playTone(frequency, duration, gainValue, type) {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainValue, now + .012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + .03);
}

function advanceLevelIfNeeded() {
  if (state.levelCorrect < 3) return false;
  state.levelCorrect = 0;
  if (state.level < 6) {
    state.level += 1;
    $("#levelSelect").value = String(state.level);
    return true;
  }
  return false;
}

function updateStatus() {
  score.textContent = state.score;
  streak.textContent = `Lv${state.level} ${state.levelCorrect}/3`;
  misses.textContent = `${state.misses}/${maxMistakes}`;
}

function shuffle(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function makeChoices(answerIds, rows) {
  const targetCount = Math.min(vocabulary.length, Math.max(answerIds.length, rows * 5));
  const answerSet = new Set(answerIds);
  const distractors = shuffle(vocabulary.map((word) => word.id).filter((id) => !answerSet.has(id)));
  return shuffle([...answerIds, ...distractors.slice(0, targetCount - answerIds.length)]);
}

function removeId(items, id) {
  const index = items.indexOf(id);
  if (index >= 0) items.splice(index, 1);
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}
