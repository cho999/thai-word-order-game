const LEVEL_LIMIT_SECONDS = 60;
const removedConsonants = ["ฃ", "ฅ", "ฆ", "ฌ", "ฎ", "ฏ", "ฐ", "ฑ", "ฒ", "ณ", "ศ", "ษ", "ฬ"];

const data = {
  consonant: [
    level(1, "Lv1 最頻出", "最初に何度も見る子音字", [
      card("ก", "ko kai", "/k/", "chicken"),
      card("น", "no nu", "/n/", "mouse"),
      card("ม", "mo ma", "/m/", "horse"),
      card("ร", "ro ruea", "/r/", "boat"),
      card("อ", "o ang", "/ʔ/", "basin"),
      card("ส", "so suea", "/s/", "tiger"),
      card("ต", "to tao", "/t/", "turtle"),
      card("ป", "po pla", "/p/", "fish")
    ]),
    level(2, "Lv2 よく使う", "初級語彙でよく出る子音字", [
      card("บ", "bo baimai", "/b/", "leaf"),
      card("ล", "lo ling", "/l/", "monkey"),
      card("ด", "do dek", "/d/", "child"),
      card("ช", "cho chang", "/ch/", "elephant"),
      card("ค", "kho khwai", "/kh/", "buffalo"),
      card("ท", "tho thahan", "/th/", "soldier"),
      card("ย", "yo yak", "/y/", "giant"),
      card("ห", "ho hip", "/h/", "chest")
    ]),
    level(3, "Lv3 標準", "読み書きで押さえたい子音字", [
      card("ว", "wo waen", "/w/", "ring"),
      card("พ", "pho phan", "/ph/", "tray"),
      card("ฟ", "fo fan", "/f/", "teeth"),
      card("ง", "ngo ngu", "/ng/", "snake"),
      card("จ", "cho chan", "/ch/", "plate"),
      card("ข", "kho khai", "/kh/", "egg"),
      card("ภ", "pho samphao", "/ph/", "sailboat"),
      card("ธ", "tho thong", "/th/", "flag")
    ]),
    level(4, "Lv4 追加", "頻度は下がるが残す子音字", [
      card("ญ", "yo ying", "/y/", "woman"),
      card("ถ", "tho thung", "/th/", "bag"),
      card("ผ", "pho phueng", "/ph/", "bee"),
      card("ฝ", "fo fa", "/f/", "lid"),
      card("ซ", "so so", "/s/", "chain"),
      card("ฉ", "cho ching", "/ch/", "cymbals"),
      card("ฮ", "ho nok huk", "/h/", "owl")
    ])
  ],
  vowel: [
    level(1, "Lv1 最頻出", "基本の短母音・長母音", [
      card("กะ", "a short", "/a/", "ก + ◌ะ"),
      card("กา", "aa long", "/aː/", "ก + า"),
      card("กิ", "i short", "/i/", "ก + ◌ิ"),
      card("กี", "ii long", "/iː/", "ก + ◌ี"),
      card("กุ", "u short", "/u/", "ก + ◌ุ"),
      card("กู", "uu long", "/uː/", "ก + ◌ู")
    ]),
    level(2, "Lv2 よく使う", "中舌母音とe/o系", [
      card("กึ", "ue short", "/ɯ/", "ก + ◌ึ"),
      card("กื", "uee long", "/ɯː/", "ก + ◌ื"),
      card("เกะ", "e short", "/e/", "เ + ก + ะ"),
      card("เก", "ee long", "/eː/", "เ + ก"),
      card("โกะ", "o short", "/o/", "โ + ก + ะ"),
      card("โก", "oo long", "/oː/", "โ + ก")
    ]),
    level(3, "Lv3 標準", "ae/o/oe 系", [
      card("แกะ", "ae short", "/ɛ/", "แ + ก + ะ"),
      card("แก", "aae long", "/ɛː/", "แ + ก"),
      card("เกาะ", "aw short", "/ɔ/", "เ + ก + าะ"),
      card("กอ", "aw long", "/ɔː/", "ก + อ"),
      card("เกอะ", "oe short", "/ɤ/", "เ + ก + อะ"),
      card("เกอ", "oe long", "/ɤː/", "เ + ก + อ")
    ]),
    level(4, "Lv4 追加", "複合母音・よく見る形", [
      card("เกียะ", "ia short", "/ia/", "เ + ก + ียะ"),
      card("เกีย", "ia long", "/iaː/", "เ + ก + ีย"),
      card("เกือะ", "uea short", "/ɯa/", "เ + ก + ือะ"),
      card("เกือ", "uea long", "/ɯaː/", "เ + ก + ือ"),
      card("กัวะ", "ua short", "/ua/", "ก + ัวะ"),
      card("กัว", "ua long", "/uaː/", "ก + ัว"),
      card("ไก", "ai", "/ai/", "ไ + ก"),
      card("เกา", "ao", "/ao/", "เ + ก + า")
    ])
  ]
};

const labels = {
  consonant: "子音字",
  vowel: "母音字"
};

const state = {
  kind: "consonant",
  selectedLevel: 1,
  range: "single",
  pairCount: "8",
  deck: [],
  selectedItems: [],
  firstCard: null,
  secondCard: null,
  lockBoard: false,
  matchedPairs: 0,
  turns: 0,
  seconds: 0,
  remainingSeconds: LEVEL_LIMIT_SECONDS,
  timerId: null,
  levelRecords: []
};

const titleScreen = document.querySelector("#titleScreen");
const gameScreen = document.querySelector("#gameScreen");
const resultScreen = document.querySelector("#resultScreen");
const levelSelect = document.querySelector("#levelSelect");
const rangeSelect = document.querySelector("#rangeSelect");
const pairCountSelect = document.querySelector("#pairCountSelect");
const fontSelect = document.querySelector("#fontSelect");
const levelPreview = document.querySelector("#levelPreview");
const board = document.querySelector("#board");
const timer = document.querySelector("#timer");
const turns = document.querySelector("#turns");
const pairs = document.querySelector("#pairs");
const levelLabel = document.querySelector("#levelLabel");
const kindLabel = document.querySelector("#kindLabel");
const message = document.querySelector("#message");
const resultText = document.querySelector("#resultText");
const resultLetters = document.querySelector("#resultLetters");

document.querySelectorAll(".mode-card").forEach((button) => {
  button.addEventListener("click", () => {
    state.kind = button.dataset.kind;
    document.querySelectorAll(".mode-card").forEach((item) => item.classList.toggle("active", item === button));
    renderPreview();
  });
});

levelSelect.addEventListener("change", () => {
  state.selectedLevel = Number(levelSelect.value);
  renderPreview();
});

rangeSelect.addEventListener("change", () => {
  state.range = rangeSelect.value;
  renderPreview();
});

pairCountSelect.addEventListener("change", () => {
  state.pairCount = pairCountSelect.value;
});

fontSelect.addEventListener("change", () => {
  document.documentElement.style.setProperty("--thai-font", fontSelect.value);
});

document.querySelector("#startButton").addEventListener("click", startGame);
document.querySelector("#restartButton").addEventListener("click", startGame);
document.querySelector("#againButton").addEventListener("click", startGame);
document.querySelector("#homeButton").addEventListener("click", showTitle);
document.querySelector("#titleButton").addEventListener("click", showTitle);

fontSelect.value = "'Sarabun', 'Noto Sans JP', sans-serif";
document.documentElement.style.setProperty("--thai-font", fontSelect.value);
renderPreview();

function level(id, title, note, items) {
  return { id, title, note, items };
}

function card(symbol, label, ipa, hint) {
  return { symbol, label, ipa, hint };
}

function renderPreview() {
  const activeIds = getActiveLevelIds();
  levelPreview.innerHTML = data[state.kind].map((levelData) => {
    const active = activeIds.includes(levelData.id);
    const letters = levelData.items.map((itemData) => `<span>${itemData.symbol}</span>`).join("");
    return `
      <article class="preview-card ${active ? "active" : ""}" aria-label="${levelData.title}">
        <h3>${levelData.title}</h3>
        <div class="preview-letters">${letters}</div>
        <p class="preview-note">${levelData.note}${active ? " / 今回の範囲" : ""}</p>
      </article>
    `;
  }).join("");
}

function startGame() {
  stopTimer();
  syncSettings();
  state.selectedLevel = 1;
  state.range = "single";
  state.levelRecords = [];
  levelSelect.value = "1";
  rangeSelect.value = "single";
  startLevel();
}

function startLevel() {
  stopTimer();
  state.turns = 0;
  state.seconds = 0;
  state.remainingSeconds = LEVEL_LIMIT_SECONDS;
  state.matchedPairs = 0;
  state.firstCard = null;
  state.secondCard = null;
  state.lockBoard = false;
  state.selectedItems = pickItems();
  state.deck = buildDeck(state.selectedItems);
  renderBoard();
  updateStats();
  renderPreview();
  setMessage(`Lv${state.selectedLevel} 判定中。クリアすると次のレベルへ進みます。`, "");
  showScreen("game");
  startTimer();
}

function syncSettings() {
  state.selectedLevel = Number(levelSelect.value);
  state.range = rangeSelect.value;
  state.pairCount = pairCountSelect.value;
}

function pickItems() {
  const pool = getAvailableItems();
  const desired = state.pairCount === "all" ? pool.length : Number(state.pairCount);
  return shuffle(pool).slice(0, Math.min(desired, pool.length));
}

function getAvailableItems() {
  const ids = getActiveLevelIds();
  return data[state.kind]
    .filter((levelData) => ids.includes(levelData.id))
    .flatMap((levelData) => levelData.items.map((itemData) => ({ ...itemData, level: levelData.id })));
}

function getActiveLevelIds() {
  if (state.range === "cumulative") {
    return data[state.kind].filter((levelData) => levelData.id <= state.selectedLevel).map((levelData) => levelData.id);
  }
  return [state.selectedLevel];
}

function buildDeck(items) {
  const cards = items.flatMap((itemData) => [
    { id: `${itemData.symbol}-symbol`, matchId: itemData.symbol, type: "symbol", item: itemData },
    { id: `${itemData.symbol}-reading`, matchId: itemData.symbol, type: "reading", item: itemData }
  ]);
  return shuffle(cards);
}

function renderBoard() {
  board.innerHTML = "";
  state.deck.forEach((deckCard) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "memory-card";
    button.dataset.id = deckCard.id;
    button.dataset.matchId = deckCard.matchId;
    button.setAttribute("aria-label", "伏せられたカード");
    button.innerHTML = `
      <span class="card-inner">
        <span class="card-face card-back"><span>TH</span></span>
        <span class="card-face card-front">${renderCardFront(deckCard)}</span>
      </span>
    `;
    button.addEventListener("click", () => flipCard(button));
    board.appendChild(button);
  });
}

function renderCardFront(deckCard) {
  if (deckCard.type === "symbol") {
    return `<span class="symbol-card">${deckCard.item.symbol}</span>`;
  }
  return `
    <span class="reading-card">
      <span class="reading-main">${deckCard.item.label}</span>
      <span class="reading-sub">${deckCard.item.ipa} / ${deckCard.item.hint}</span>
    </span>
  `;
}

function flipCard(cardEl) {
  if (state.lockBoard || cardEl.classList.contains("is-flipped") || cardEl.classList.contains("is-matched")) return;

  cardEl.classList.add("is-flipped");

  if (!state.firstCard) {
    state.firstCard = cardEl;
    return;
  }

  state.secondCard = cardEl;
  state.turns += 1;
  updateStats();
  checkMatch();
}

function checkMatch() {
  if (state.firstCard.dataset.matchId === state.secondCard.dataset.matchId) {
    handleMatch();
    return;
  }
  handleMiss();
}

function handleMatch() {
  state.firstCard.classList.add("is-matched");
  state.secondCard.classList.add("is-matched");
  state.firstCard.disabled = true;
  state.secondCard.disabled = true;
  state.matchedPairs += 1;
  setMessage("正解です。", "good");
  resetSelection();
  updateStats();

  if (state.matchedPairs === state.selectedItems.length) {
    finishLevel();
  }
}

function handleMiss() {
  state.lockBoard = true;
  state.firstCard.classList.add("is-wrong");
  state.secondCard.classList.add("is-wrong");
  setMessage("違います。位置を覚えて続けましょう。", "bad");
  window.setTimeout(() => {
    state.firstCard.classList.remove("is-flipped", "is-wrong");
    state.secondCard.classList.remove("is-flipped", "is-wrong");
    resetSelection();
    setMessage("続けてください。", "");
  }, 780);
}

function resetSelection() {
  state.firstCard = null;
  state.secondCard = null;
  state.lockBoard = false;
}

function finishLevel() {
  stopTimer();
  state.levelRecords.push({
    level: state.selectedLevel,
    pairs: state.selectedItems.length,
    turns: state.turns,
    seconds: state.seconds,
    symbols: state.selectedItems.map((itemData) => itemData.symbol)
  });

  if (state.selectedLevel < 4) {
    const nextLevel = state.selectedLevel + 1;
    setMessage(`Lv${state.selectedLevel} clear. Next: Lv${nextLevel}`, "good");
    state.selectedLevel = nextLevel;
    levelSelect.value = String(nextLevel);
    window.setTimeout(startLevel, 1300);
    return;
  }

  showFinalResult(true);
}

function showFinalResult(completed) {
  const totalTurns = state.levelRecords.reduce((sum, record) => sum + record.turns, 0);
  const totalSeconds = state.levelRecords.reduce((sum, record) => sum + record.seconds, 0);
  const clearedLevel = state.levelRecords.length ? state.levelRecords[state.levelRecords.length - 1].level : 0;
  const location = completed
    ? "Lv4クリア"
    : clearedLevel === 0
      ? "Lv1練習中"
      : `Lv${clearedLevel}クリア / Lv${clearedLevel + 1}練習中`;
  const removedText = state.kind === "consonant" ? ` 除外子音: ${removedConsonants.join(" ")}` : "";
  const rows = state.levelRecords
    .map((record) => `Lv${record.level}: ${record.pairs}ペア / ${record.turns}手 / ${record.seconds}秒`)
    .join("　");
  const summary = completed
    ? `${labels[state.kind]}はLv4までクリアです。`
    : `1分経過です。現在地は「${location}」です。`;
  resultText.textContent = `${summary} 合計 ${totalTurns}手 / ${totalSeconds}秒。${rows || "まだクリアしたLvはありません。"}${removedText}`;
  resultLetters.innerHTML = state.levelRecords
    .flatMap((record) => record.symbols)
    .map((symbol) => `<span>${symbol}</span>`)
    .join("");
  showScreen("result");
}

function startTimer() {
  timer.textContent = `${LEVEL_LIMIT_SECONDS}s`;
  state.timerId = window.setInterval(() => {
    state.seconds += 1;
    state.remainingSeconds = Math.max(0, LEVEL_LIMIT_SECONDS - state.seconds);
    timer.textContent = `${state.remainingSeconds}s`;
    if (state.remainingSeconds <= 0) {
      stopTimer();
      state.lockBoard = true;
      showFinalResult(false);
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerId) window.clearInterval(state.timerId);
  state.timerId = null;
}

function updateStats() {
  const ids = getActiveLevelIds();
  kindLabel.textContent = labels[state.kind];
  levelLabel.textContent = ids.length === 1 ? `Lv${ids[0]}` : `Lv1-${ids[ids.length - 1]}`;
  turns.textContent = state.turns;
  pairs.textContent = `${state.matchedPairs}/${state.selectedItems.length}`;
}

function setMessage(text, type) {
  message.textContent = text;
  message.className = type;
}

function showTitle() {
  stopTimer();
  showScreen("title");
}

function showScreen(name) {
  titleScreen.classList.toggle("hidden", name !== "title");
  gameScreen.classList.toggle("hidden", name !== "game");
  resultScreen.classList.toggle("hidden", name !== "result");
}

function shuffle(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
