const LEVEL_LIMIT_SECONDS = 60;
const LEVEL_MIXES = {
  1: [{ level: 1, weight: 100 }],
  2: [
    { level: 1, weight: 30 },
    { level: 2, weight: 70 }
  ],
  3: [
    { level: 1, weight: 10 },
    { level: 2, weight: 20 },
    { level: 3, weight: 70 }
  ],
  4: [
    { level: 1, weight: 10 },
    { level: 2, weight: 10 },
    { level: 3, weight: 20 },
    { level: 4, weight: 60 }
  ]
};
const removedConsonants = ["ฃ", "ฅ", "ฆ", "ฌ", "ฎ", "ฏ", "ฐ", "ฑ", "ฒ", "ณ", "ศ", "ษ", "ฬ"];

const data = {
  consonant: [
    level(1, "Lv1 Most frequent", "Consonants you will see again and again first", [
      card("ก", "gɔɔ gài", "/k/", "chicken"),
      card("น", "nɔɔ nǔu", "/n/", "mouse"),
      card("ม", "mɔɔ máa", "/m/", "horse"),
      card("ร", "rɔɔ rʉʉa", "/r/", "boat"),
      card("อ", "ɔɔ àang", "/ʔ/", "basin"),
      card("ส", "sɔ̌ɔ sʉ̌ʉa", "/s/", "tiger"),
      card("ต", "dtɔɔ dtào", "/t/", "turtle"),
      card("ป", "bpɔɔ bplaa", "/p/", "fish")
    ]),
    level(2, "Lv2 Common", "Consonants common in beginner vocabulary", [
      card("บ", "bɔɔ bai mái", "/b/", "leaf"),
      card("ล", "lɔɔ ling", "/l/", "monkey"),
      card("ด", "dɔɔ dèk", "/d/", "child"),
      card("ช", "chɔɔ cháang", "/ch/", "elephant"),
      card("ค", "kɔɔ khwaai", "/kh/", "buffalo"),
      card("ท", "tɔɔ tá-hǎan", "/th/", "soldier"),
      card("ย", "yɔɔ yák", "/y/", "giant"),
      card("ห", "hɔ̌ɔ hìip", "/h/", "chest")
    ]),
    level(3, "Lv3 Standard", "Consonants to secure for reading and writing", [
      card("ว", "wɔɔ wɛ̌ɛn", "/w/", "ring"),
      card("พ", "pɔɔ phaan", "/ph/", "tray"),
      card("ฟ", "fɔɔ fan", "/f/", "teeth"),
      card("ง", "ngɔɔ nguu", "/ng/", "snake"),
      card("จ", "jɔɔ jaan", "/ch/", "plate"),
      card("ข", "kɔ̌ɔ kài", "/kh/", "egg"),
      card("ภ", "pɔɔ sǎm-phao", "/ph/", "sailboat"),
      card("ธ", "tɔɔ thong", "/th/", "flag")
    ]),
    level(4, "Lv4 Extra", "Less frequent consonants kept for coverage", [
      card("ญ", "yɔɔ yǐng", "/y/", "woman"),
      card("ถ", "tɔ̌ɔ tǔng", "/th/", "bag"),
      card("ผ", "pɔ̌ɔ phʉ̂ng", "/ph/", "bee"),
      card("ฝ", "fɔ̌ɔ fǎa", "/f/", "lid"),
      card("ซ", "sɔɔ sôo", "/s/", "chain"),
      card("ฉ", "chɔ̌ɔ chìng", "/ch/", "cymbals"),
      card("ฮ", "hɔɔ nók-hûuk", "/h/", "owl")
    ])
  ],
  vowel: [
    level(1, "Lv1 Most frequent", "Basic short and long vowels", [
      card("กะ", "gà", "/a/", "ก + ◌ะ"),
      card("กา", "gaa", "/aː/", "ก + า"),
      card("กิ", "gì", "/i/", "ก + ◌ิ"),
      card("กี", "gii", "/iː/", "ก + ◌ี"),
      card("กุ", "gù", "/u/", "ก + ◌ุ"),
      card("กู", "guu", "/uː/", "ก + ◌ู")
    ]),
    level(2, "Lv2 Common", "Central vowels and e/o patterns", [
      card("กึ", "gʉ̀", "/ɯ/", "ก + ◌ึ"),
      card("กื", "gʉʉ", "/ɯː/", "ก + ◌ื"),
      card("เกะ", "gè", "/e/", "เ + ก + ะ"),
      card("เก", "gee", "/eː/", "เ + ก"),
      card("โกะ", "gò", "/o/", "โ + ก + ะ"),
      card("โก", "goo", "/oː/", "โ + ก")
    ]),
    level(3, "Lv3 Standard", "ae/o/oe patterns", [
      card("แกะ", "gɛ̀", "/ɛ/", "แ + ก + ะ"),
      card("แก", "gɛɛ", "/ɛː/", "แ + ก"),
      card("เกาะ", "gɔ̀", "/ɔ/", "เ + ก + าะ"),
      card("กอ", "gɔɔ", "/ɔː/", "ก + อ"),
      card("เกอะ", "gə̀", "/ɤ/", "เ + ก + อะ"),
      card("เกอ", "gəə", "/ɤː/", "เ + ก + อ")
    ]),
    level(4, "Lv4 Extra", "Compound vowels and common forms", [
      card("เกียะ", "gìa", "/ia/", "เ + ก + ียะ"),
      card("เกีย", "gia", "/iaː/", "เ + ก + ีย"),
      card("เกือะ", "gʉ̀a", "/ɯa/", "เ + ก + ือะ"),
      card("เกือ", "gʉa", "/ɯaː/", "เ + ก + ือ"),
      card("กัวะ", "gùa", "/ua/", "ก + ัวะ"),
      card("กัว", "gua", "/uaː/", "ก + ัว"),
      card("ไก", "gai", "/gai/", "ไ + ก"),
      card("เกา", "gao", "/gao/", "เ + ก + า")
    ])
  ]
};

const labels = {
  consonant: "Consonants",
  vowel: "Vowels"
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
        <p class="preview-note">${levelData.note}${active ? " / Current range" : ""}</p>
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
  setMessage(`Lv${state.selectedLevel}  in progress. Clear it to move to the next level.`, "");
  showScreen("game");
  startTimer();
}

function syncSettings() {
  state.selectedLevel = Number(levelSelect.value);
  state.range = rangeSelect.value;
  state.pairCount = pairCountSelect.value;
}

function pickItems() {
  const pool = getAvgailableItems();
  const desired = state.pairCount === "all" ? pool.length : Number(state.pairCount);
  const count = Math.min(desired, pool.length);

  if (state.range === "cumulative") {
    return shuffle(pool).slice(0, count);
  }

  return pickWeightedItems(count);
}

function getAvgailableItems() {
  const ids = getActiveLevelIds();
  return data[state.kind]
    .filter((levelData) => ids.includes(levelData.id))
    .flatMap((levelData) => levelData.items.map((itemData) => ({ ...itemData, level: levelData.id })));
}

function getActiveLevelIds() {
  if (state.range === "cumulative") {
    return data[state.kind].filter((levelData) => levelData.id <= state.selectedLevel).map((levelData) => levelData.id);
  }
  return getLevelMix().map((mix) => mix.level);
}

function getLevelMix() {
  return LEVEL_MIXES[state.selectedLevel] || LEVEL_MIXES[1];
}

function pickWeightedItems(count) {
  const itemsByLevel = new Map(data[state.kind].map((levelData) => [
    levelData.id,
    shuffle(levelData.items.map((itemData) => ({ ...itemData, level: levelData.id })))
  ]));
  const allocations = allocateLevelCounts(count);
  const selected = [];

  allocations.forEach(({ level: levelId, count: levelCount }) => {
    const levelItems = itemsByLevel.get(levelId) || [];
    selected.push(...levelItems.splice(0, Math.min(levelCount, levelItems.length)));
  });

  if (selected.length < count) {
    const leftovers = shuffle([...itemsByLevel.values()].flat());
    selected.push(...leftovers.slice(0, count - selected.length));
  }

  return shuffle(selected);
}

function allocateLevelCounts(count) {
  const mix = getLevelMix();
  const totalWeight = mix.reduce((sum, entry) => sum + entry.weight, 0);
  const allocations = mix.map((entry) => {
    const raw = (count * entry.weight) / totalWeight;
    return { level: entry.level, count: Math.floor(raw), remainder: raw % 1 };
  });
  let remaining = count - allocations.reduce((sum, entry) => sum + entry.count, 0);

  [...allocations]
    .sort((a, b) => b.remainder - a.remainder || b.level - a.level)
    .forEach((entry) => {
      if (remaining <= 0) return;
      entry.count += 1;
      remaining -= 1;
    });

  return allocations;
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
    button.setAttribute("aria-label", "Face-down card");
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
  setMessage("Correct.", "good");
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
  setMessage("Not quite. Remember the positions and keep going.", "bad");
  window.setTimeout(() => {
    state.firstCard.classList.remove("is-flipped", "is-wrong");
    state.secondCard.classList.remove("is-flipped", "is-wrong");
    resetSelection();
    setMessage("Keep going.", "");
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
    ? "Lv4 cleared"
    : clearedLevel === 0
      ? "Practicing Lv1"
      : `Lv${clearedLevel} cleared / Lv${clearedLevel + 1} in practice`;
  const removedText = state.kind === "consonant" ? ` Excluded consonants: ${removedConsonants.join(" ")}` : "";
  const rows = state.levelRecords
    .map((record) => `Lv${record.level}: ${record.pairs}pairs / ${record.turns}turns / ${record.seconds}s`)
    .join("　");
  const summary = completed
    ? `${labels[state.kind]} cleared through Lv4.`
    : `One minute is up. Current position: "${location}".`;
  resultText.textContent = `${summary} Total ${totalTurns}turns / ${totalSeconds}s。${rows || "No cleared levels yet."}${removedText}`;
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
