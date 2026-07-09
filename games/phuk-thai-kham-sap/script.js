const fallbackLessons = [
  {
    id: "lesson1",
    title: "Lesson 1",
    source: "Online lesson notes",
    words: [
      { id: "l1-dog", thai: "หมา", roman: "mǎa", english: "dog" },
      { id: "l1-cat", thai: "แมว", roman: "maaeo", english: "cat" },
      { id: "l1-bread", thai: "ขนมปัง", roman: "khà-nǒm bpang", english: "bread" },
      { id: "l1-milk", thai: "นม", roman: "nom", english: "milk" },
      { id: "l1-movie", thai: "หนัง", roman: "nǎng", english: "movie" },
      { id: "l1-book", thai: "หนังสือ", roman: "nǎng sʉ̌ʉ", english: "book" },
      { id: "l1-song", thai: "เพลง", roman: "phleeng", english: "song" },
      { id: "l1-question", thai: "คำถาม", roman: "kham tǎam", english: "question" },
      { id: "l1-alcohol", thai: "เหล้า", roman: "lâo", english: "alcohol" },
      { id: "l1-travel", thai: "ไปเที่ยว", roman: "bpai thîao", english: "travel" },
      { id: "l1-shopping", thai: "ซื้อของ", roman: "sʉ́ʉ khǎawng", english: "shopping" },
      { id: "l1-like", thai: "ชอบ", roman: "châawp", english: "like" },
      { id: "l1-you", thai: "คุณ", roman: "khun", english: "you" },
      { id: "l1-i", thai: "ผม/ฉัน", roman: "phǒm / chǎn", english: "I" },
      { id: "l1-he-she", thai: "เขา", roman: "khǎo", english: "he / she" },
      { id: "l1-they", thai: "พวกเขา", roman: "phûuak khǎo", english: "they" },
      { id: "l1-we", thai: "เรา", roman: "rao", english: "we" },
      { id: "l1-this", thai: "นี่", roman: "nîi", english: "this" },
      { id: "l1-what", thai: "อะไร", roman: "à-rai", english: "what" },
      { id: "l1-speak", thai: "พูด", roman: "phûut", english: "speak" },
      { id: "l1-again", thai: "อีกครั้ง", roman: "ìik khráng", english: "again" },
      { id: "l1-slowly", thai: "ช้าๆ", roman: "cháa cháa", english: "slowly" },
      { id: "l1-sleep", thai: "นอน", roman: "naawn", english: "sleep" },
      { id: "l1-eat", thai: "กิน", roman: "gin", english: "eat" },
      { id: "l1-drink", thai: "ดื่ม", roman: "dèum", english: "drink" },
      { id: "l1-watch", thai: "ดู", roman: "duu", english: "watch" },
      { id: "l1-play", thai: "เล่น", roman: "lên", english: "play" },
      { id: "l1-do", thai: "ทำ", roman: "tam", english: "do" },
      { id: "l1-read", thai: "อ่าน", roman: "àan", english: "read" },
      { id: "l1-go", thai: "ไป", roman: "bpai", english: "go" },
      { id: "l1-ask", thai: "ถาม", roman: "tǎam", english: "ask" },
      { id: "l1-work", thai: "ทำงาน", roman: "tam ngaan", english: "work" },
      { id: "l1-sing", thai: "ร้อง", roman: "ráawng", english: "sing" },
      { id: "l1-listen", thai: "ฟัง", roman: "fang", english: "listen" },
      { id: "l1-have", thai: "มี", roman: "mii", english: "have" },
      { id: "l1-want", thai: "อยาก", roman: "yàak", english: "want" }
    ]
  }
];

const storageKey = "nariThaiVocabTrainer.v1";
const bookmarkStorageKey = "nariThaiVocabBookmarks.v1";
const lessonsUrl = "../../data/vocab-lessons.json";
let lessons = fallbackLessons;
const $ = (selector) => document.querySelector(selector);

const lessonSelect = $("#lessonSelect");
const lessonBadge = $("#lessonBadge");
const correctCount = $("#correctCount");
const reviewCount = $("#reviewCount");
const normalButton = $("#normalButton");
const reviewButton = $("#reviewButton");
const promptText = $("#promptText");
const promptSub = $("#promptSub");
const choiceGrid = $("#choiceGrid");
const feedback = $("#feedback");
const modeLabel = $("#modeLabel");
const progressLabel = $("#progressLabel");
const normalProgressText = $("#normalProgressText");
const normalProgressBar = $("#normalProgressBar");
const reviewProgressText = $("#reviewProgressText");
const reviewProgressBar = $("#reviewProgressBar");
const ocrText = $("#ocrText");
const parsePreview = $("#parsePreview");
const scorePanel = $("#scorePanel");
const scoreTitle = $("#scoreTitle");
const scoreCorrect = $("#scoreCorrect");
const scoreAnswered = $("#scoreAnswered");
const scoreWrong = $("#scoreWrong");
const scoreMessage = $("#scoreMessage");
const wrongWordList = $("#wrongWordList");
const reviewMistakesButton = $("#reviewMistakesButton");
const againLessonButton = $("#againLessonButton");
const vocabSearchInput = $("#vocabSearchInput");
const vocabListStatus = $("#vocabListStatus");
const vocabList = $("#vocabList");
const showAllWordsButton = $("#showAllWordsButton");
const showBookmarksButton = $("#showBookmarksButton");

const state = {
  lessonId: lessons[0].id,
  display: "thai",
  mode: "thaiToEnglish",
  activeMode: "normal",
  current: null,
  queue: [],
  correct: 0,
  answered: 0,
  sessionTotal: 0,
  sessionWrongIds: new Set(),
  sessionWrongCounts: {},
  locked: true,
  progress: loadProgress(),
  bookmarks: loadBookmarks(),
  vocabFilter: "all"
};

init();

async function init() {
  lessons = await loadLessons();
  state.lessonId = lessons[0]?.id || state.lessonId;
  lessonSelect.innerHTML = lessons.map((lesson) => `<option value="${lesson.id}">${lesson.title}</option>`).join("");
  lessonSelect.value = state.lessonId;
  lessonSelect.addEventListener("change", () => {
    state.lessonId = lessonSelect.value;
    state.queue = [];
    state.current = null;
    state.locked = true;
    updateStatus();
    renderVocabularyList();
    showIdlePrompt();
  });

  document.querySelectorAll(".display-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.display = button.dataset.display;
      document.querySelectorAll(".display-button").forEach((item) => item.classList.toggle("active", item === button));
      if (state.current) renderQuestion();
    });
  });

  document.querySelectorAll(".mode-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.mode;
      document.querySelectorAll(".mode-button").forEach((item) => item.classList.toggle("active", item === button));
      if (state.current) renderQuestion();
    });
  });

  normalButton.addEventListener("click", () => startPractice("normal"));
  reviewButton.addEventListener("click", () => startPractice("review"));
  reviewMistakesButton.addEventListener("click", () => {
    startPractice("mistakeReview", [...state.sessionWrongIds]);
  });
  againLessonButton.addEventListener("click", () => startPractice("normal"));
  $("#parseButton").addEventListener("click", renderOcrPreview);
  vocabSearchInput.addEventListener("input", renderVocabularyList);
  showAllWordsButton.addEventListener("click", () => setVocabFilter("all"));
  showBookmarksButton.addEventListener("click", () => setVocabFilter("bookmarks"));
  updateStatus();
  renderVocabularyList();
  showIdlePrompt();
}

async function loadLessons() {
  try {
    const response = await fetch(lessonsUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Lesson data request failed: ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || !data.length) throw new Error("Lesson data is empty");
    data.forEach(validateLesson);
    return data;
  } catch (error) {
    console.warn("Using embedded fallback lessons.", error);
    return fallbackLessons;
  }
}

function validateLesson(lesson) {
  if (!lesson?.id || !lesson?.title || !Array.isArray(lesson.words)) {
    throw new Error("Invalid lesson shape");
  }
  lesson.words.forEach((word) => {
    if (!word?.id || !word?.thai || !word?.roman || !word?.english) {
      throw new Error(`Invalid word shape in ${lesson.id}`);
    }
  });
}

function startPractice(activeMode, sourceIds = null) {
  state.activeMode = activeMode;
  state.correct = 0;
  state.answered = 0;
  state.sessionWrongIds = new Set();
  state.sessionWrongCounts = {};
  scorePanel.classList.add("hidden");
  state.queue = buildQueue(activeMode, sourceIds);
  state.sessionTotal = state.queue.length;
  if (!state.queue.length) {
    state.current = null;
    choiceGrid.innerHTML = "";
    const emptyText = activeMode !== "normal"
      ? "There are no review words yet. Words missed two or more times will appear here."
      : "This lesson has no words yet.";
    promptText.textContent = emptyText;
    promptSub.textContent = "Add lesson notes to grow this lesson list.";
    feedback.textContent = "";
    updateStatus();
    return;
  }
  nextQuestion();
}

function buildQueue(activeMode, sourceIds = null) {
  const lessonWords = getLessonWords();
  if (activeMode === "mistakeReview" && sourceIds) {
    const sourceSet = new Set(sourceIds);
    return shuffle(lessonWords.filter((word) => sourceSet.has(word.id)));
  }
  if (activeMode === "review") {
    return shuffle(lessonWords.filter((word) => getWordProgress(word.id).inReview));
  }
  return shuffle(lessonWords);
}

function nextQuestion() {
  if (!state.queue.length) {
    showScoreScreen();
    return;
  }
  state.current = state.queue.shift();
  state.locked = false;
  renderQuestion();
}

function renderQuestion() {
  const word = state.current;
  const choices = makeChoices(word);
  const prompt = state.mode === "thaiToEnglish" ? thaiText(word) : word.english;
  const sub = state.mode === "thaiToEnglish"
    ? `${currentLesson().title} / ${state.display === "thai" ? word.roman : word.thai}`
    : `${currentLesson().title} / choose ${state.display === "thai" ? "Thai script" : "romanization"}`;

  promptText.textContent = prompt;
  promptSub.textContent = sub;
  modeLabel.textContent = state.activeMode === "review" ? "Review mode" : "Practice";
  progressLabel.textContent = currentLesson().title;
  feedback.textContent = "";
  feedback.className = "feedback";
  scorePanel.classList.add("hidden");
  choiceGrid.innerHTML = choices.map((choice) => `
    <button class="choice-button" type="button" data-id="${choice.id}">
      ${choiceText(choice)}
    </button>
  `).join("");
  choiceGrid.querySelectorAll(".choice-button").forEach((button) => {
    button.addEventListener("click", () => answer(button.dataset.id));
  });
  updateStatus();
}

function answer(chosenId) {
  if (state.locked || !state.current) return;
  state.locked = true;
  const correct = chosenId === state.current.id;
  const buttons = [...choiceGrid.querySelectorAll(".choice-button")];
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.dataset.id === state.current.id) button.classList.add("correct");
    if (button.dataset.id === chosenId && !correct) button.classList.add("wrong");
  });

  if (correct) {
    state.correct += 1;
    state.answered += 1;
    handleCorrect(state.current);
    feedback.textContent = state.activeMode !== "normal"
      ? "Correct. In review mode, three correct answers graduate the word."
      : "Correct.";
    feedback.className = "feedback good";
    window.setTimeout(nextQuestion, 850);
  } else {
    state.answered += 1;
    state.sessionWrongIds.add(state.current.id);
    state.sessionWrongCounts[state.current.id] = (state.sessionWrongCounts[state.current.id] || 0) + 1;
    handleWrong(state.current);
    state.sessionTotal += 1;
    state.queue.splice(Math.min(2, state.queue.length), 0, state.current);
    feedback.textContent = `Not quite. The answer is ${answerLabel(state.current)}. It will come back later.`;
    feedback.className = "feedback bad";
    window.setTimeout(nextQuestion, 1350);
  }
  saveProgress();
  updateStatus();
}

function showScoreScreen() {
  state.current = null;
  state.locked = true;
  choiceGrid.innerHTML = "";
  feedback.textContent = "";
  promptText.textContent = "Nice work!";
  promptSub.textContent = `Check your practice result for ${currentLesson().title}.`;
  modeLabel.textContent = "Result";
  progressLabel.textContent = currentLesson().title;

  const wrongWords = getLessonWords().filter((word) => state.sessionWrongIds.has(word.id));
  scoreTitle.textContent = state.activeMode === "normal" ? "Practice Result" : "Review Result";
  scoreCorrect.textContent = state.correct;
  scoreAnswered.textContent = state.answered;
  scoreWrong.textContent = wrongWords.length;
  reviewMistakesButton.hidden = !wrongWords.length;
  scoreMessage.textContent = wrongWords.length
    ? "You can review only the words you missed."
    : "No missed words in this round. Great work.";
  wrongWordList.innerHTML = wrongWords.length
    ? wrongWords.map((word) => `
      <article class="wrong-word">
        <strong>${word.thai}</strong>
        <span>${word.roman}</span>
        <em>${word.english}</em>
        <small>${state.sessionWrongCounts[word.id] || 0} misses</small>
      </article>
    `).join("")
    : '<div class="empty-wrong">No review items.</div>';
  scorePanel.classList.remove("hidden");
  updateStatus();
}

function setVocabFilter(filter) {
  state.vocabFilter = filter;
  showAllWordsButton.classList.toggle("active", filter === "all");
  showBookmarksButton.classList.toggle("active", filter === "bookmarks");
  renderVocabularyList();
}

function renderVocabularyList() {
  const query = vocabSearchInput.value.trim().toLowerCase();
  const words = getLessonWords().filter((word) => {
    const bookmarked = state.bookmarks.has(word.id);
    if (state.vocabFilter === "bookmarks" && !bookmarked) return false;
    if (!query) return true;
    return [word.thai, word.roman, word.english].some((value) => value.toLowerCase().includes(query));
  });
  const bookmarkCount = getLessonWords().filter((word) => state.bookmarks.has(word.id)).length;
  const scopeLabel = state.vocabFilter === "bookmarks" ? "Bookmarks" : "All";
  vocabListStatus.textContent = `${scopeLabel}: ${words.length} items / Bookmarks ${bookmarkCount}`;
  vocabList.innerHTML = words.length
    ? words.map(renderVocabularyCard).join("")
    : '<div class="empty-vocab">No matching vocabulary.</div>';
  vocabList.querySelectorAll(".bookmark-button").forEach((button) => {
    button.addEventListener("click", () => toggleBookmark(button.dataset.id));
  });
}

function renderVocabularyCard(word) {
  const bookmarked = state.bookmarks.has(word.id);
  return `
    <article class="vocab-card${bookmarked ? " bookmarked" : ""}">
      <button class="bookmark-button" type="button" data-id="${escapeHtml(word.id)}" aria-pressed="${bookmarked}" aria-label="${bookmarked ? "Remove bookmark" : "Add bookmark"}">
        ${bookmarked ? "★" : "☆"}
      </button>
      <div>
        <strong>${escapeHtml(word.thai)}</strong>
        <span>${escapeHtml(word.roman)}</span>
        <em>${escapeHtml(word.english)}</em>
      </div>
    </article>
  `;
}

function toggleBookmark(id) {
  if (state.bookmarks.has(id)) {
    state.bookmarks.delete(id);
  } else {
    state.bookmarks.add(id);
  }
  saveBookmarks();
  renderVocabularyList();
}

function handleWrong(word) {
  const progress = getWordProgress(word.id);
  progress.wrong += 1;
  progress.reviewCorrect = 0;
  if (progress.wrong >= 2) progress.inReview = true;
}

function handleCorrect(word) {
  const progress = getWordProgress(word.id);
  if (state.activeMode === "review" && progress.inReview) {
    progress.reviewCorrect += 1;
    if (progress.reviewCorrect >= 3) {
      progress.inReview = false;
      progress.reviewCorrect = 0;
      progress.wrong = 0;
    }
  }
}

function makeChoices(answerWord) {
  const pool = getLessonWords().filter((word) => word.id !== answerWord.id);
  const distractors = shuffle(pool).slice(0, 5);
  return shuffle([answerWord, ...distractors]);
}

function thaiText(word) {
  return state.display === "thai" ? word.thai : word.roman;
}

function choiceText(word) {
  return state.mode === "thaiToEnglish" ? word.english : thaiText(word);
}

function answerLabel(word) {
  return state.mode === "thaiToEnglish" ? word.english : `${thaiText(word)} / ${word.english}`;
}

function getLessonWords() {
  return currentLesson().words;
}

function currentLesson() {
  return lessons.find((lesson) => lesson.id === state.lessonId) || lessons[0];
}

function getWordProgress(id) {
  if (!state.progress[id]) {
    state.progress[id] = { wrong: 0, reviewCorrect: 0, inReview: false };
  }
  return state.progress[id];
}

function updateStatus() {
  lessonBadge.textContent = currentLesson().title.replace("Lesson ", "");
  correctCount.textContent = state.correct;
  reviewCount.textContent = getLessonWords().filter((word) => getWordProgress(word.id).inReview).length;
  updateProgressBars();
}

function showIdlePrompt() {
  promptText.textContent = "Choose practice or review mode.";
  promptSub.textContent = `${currentLesson().title} / ${currentLesson().source}`;
  choiceGrid.innerHTML = "";
  feedback.textContent = "";
  scorePanel.classList.add("hidden");
  modeLabel.textContent = "Ready";
  progressLabel.textContent = currentLesson().title;
  state.sessionTotal = state.queue.length;
  updateStatus();
}

function updateProgressBars() {
  const normalTotal = state.activeMode === "normal" ? state.sessionTotal || getLessonWords().length : getLessonWords().length;
  const normalDone = state.activeMode === "normal" ? Math.min(state.answered, normalTotal) : 0;
  const normalPercent = normalTotal ? Math.min(100, Math.round((normalDone / normalTotal) * 100)) : 0;
  normalProgressText.textContent = `${normalDone} / ${normalTotal}`;
  normalProgressBar.style.width = `${normalPercent}%`;

  const reviewWords = getLessonWords().filter((word) => getWordProgress(word.id).inReview);
  const reviewTotal = reviewWords.length * 3;
  const reviewDone = reviewWords.reduce((sum, word) => sum + Math.min(3, getWordProgress(word.id).reviewCorrect), 0);
  const reviewPercent = reviewTotal ? Math.min(100, Math.round((reviewDone / reviewTotal) * 100)) : 0;
  reviewProgressText.textContent = `${reviewDone} / ${reviewTotal}`;
  reviewProgressBar.style.width = `${reviewPercent}%`;
}

function renderOcrPreview() {
  const rows = parseOcrText(ocrText.value);
  if (!rows.length) {
    parsePreview.innerHTML = '<div class="preview-row">No readable rows. Enter comma-separated rows as "Thai, Paiboon, English".</div>';
    return;
  }
  parsePreview.innerHTML = rows.map((row) => `
    <div class="preview-row">${row.thai} / ${row.roman} / ${row.english}</div>
  `).join("");
}

function parseOcrText(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split(/[,，\t]/).map((part) => part.trim()))
    .filter((parts) => parts.length >= 3 && parts[0] && parts[1] && parts[2])
    .map(([thai, roman, english]) => ({ thai, roman, english }));
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    return {};
  }
}

function saveProgress() {
  localStorage.setItem(storageKey, JSON.stringify(state.progress));
}

function loadBookmarks() {
  try {
    return new Set(JSON.parse(localStorage.getItem(bookmarkStorageKey)) || []);
  } catch {
    return new Set();
  }
}

function saveBookmarks() {
  localStorage.setItem(bookmarkStorageKey, JSON.stringify([...state.bookmarks]));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function shuffle(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
