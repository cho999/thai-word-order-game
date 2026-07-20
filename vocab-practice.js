const lessons = [
  {
    id: "lesson1",
    title: "Lesson 1",
    source: "オンライン授業ノート",
    words: [
      { id: "l1-dog", thai: "หมา", roman: "maa", english: "dog" },
      { id: "l1-cat", thai: "แมว", roman: "maaeo", english: "cat" },
      { id: "l1-bread", thai: "ขนมปัง", roman: "khanom pang", english: "bread" },
      { id: "l1-milk", thai: "นม", roman: "nom", english: "milk" },
      { id: "l1-movie", thai: "หนัง", roman: "nang", english: "movie" },
      { id: "l1-book", thai: "หนังสือ", roman: "nang sue", english: "book" },
      { id: "l1-song", thai: "เพลง", roman: "phleeng", english: "song" },
      { id: "l1-question", thai: "คำถาม", roman: "kham thaam", english: "question" },
      { id: "l1-alcohol", thai: "เหล้า", roman: "lao", english: "alcohol" },
      { id: "l1-travel", thai: "ไปเที่ยว", roman: "bpai thiao", english: "travel" },
      { id: "l1-shopping", thai: "ซื้อของ", roman: "sue khong", english: "shopping" },
      { id: "l1-like", thai: "ชอบ", roman: "choop", english: "like" },
      { id: "l1-you", thai: "คุณ", roman: "khun", english: "you" },
      { id: "l1-i", thai: "ผม/ฉัน", roman: "phom / chan", english: "I" },
      { id: "l1-he-she", thai: "เขา", roman: "khao", english: "he / she" },
      { id: "l1-they", thai: "พวกเขา", roman: "phuak khao", english: "they" },
      { id: "l1-we", thai: "เรา", roman: "rao", english: "we" },
      { id: "l1-this", thai: "นี่", roman: "nii", english: "this" },
      { id: "l1-what", thai: "อะไร", roman: "arai", english: "what" },
      { id: "l1-speak", thai: "พูด", roman: "phuut", english: "speak" },
      { id: "l1-again", thai: "อีกครั้ง", roman: "iik khrang", english: "again" },
      { id: "l1-slowly", thai: "ช้าๆ", roman: "chaa chaa", english: "slowly" },
      { id: "l1-sleep", thai: "นอน", roman: "noon", english: "sleep" },
      { id: "l1-eat", thai: "กิน", roman: "gin", english: "eat" },
      { id: "l1-drink", thai: "ดื่ม", roman: "duem", english: "drink" },
      { id: "l1-watch", thai: "ดู", roman: "duu", english: "watch" },
      { id: "l1-play", thai: "เล่น", roman: "len", english: "play" },
      { id: "l1-do", thai: "ทำ", roman: "tham", english: "do" },
      { id: "l1-read", thai: "อ่าน", roman: "aan", english: "read" },
      { id: "l1-go", thai: "ไป", roman: "bpai", english: "go" },
      { id: "l1-ask", thai: "ถาม", roman: "thaam", english: "ask" },
      { id: "l1-work", thai: "ทำงาน", roman: "tham ngaan", english: "work" },
      { id: "l1-sing", thai: "ร้อง", roman: "roong", english: "sing" },
      { id: "l1-listen", thai: "ฟัง", roman: "fang", english: "listen" },
      { id: "l1-have", thai: "มี", roman: "mii", english: "have" },
      { id: "l1-want", thai: "อยาก", roman: "yaak", english: "want" }
    ]
  },
  {
    id: "lesson2",
    title: "Lesson 2",
    source: "オンライン授業ノート OCR 2026-07-20",
    words: [
      { id: "l2-of", thai: "ของ", roman: "khǎawng", english: "of / belonging to" },
      { id: "l2-food", thai: "อาหาร", roman: "aa-hǎan", english: "food" },
      { id: "l2-can", thai: "ได้", roman: "dâai", english: "can" },
      { id: "l2-cannot", thai: "ไม่ได้", roman: "mâi dâai", english: "cannot" },
      { id: "l2-cook", thai: "ทำอาหาร", roman: "tam aa-hǎan", english: "cook" },
      { id: "l2-drive", thai: "ขับรถ", roman: "khàp rót", english: "drive a car" },
      { id: "l2-swim", thai: "ว่ายน้ำ", roman: "wâai náam", english: "swim" },
      { id: "l2-play-cards", thai: "เล่นไพ่", roman: "lên phâi", english: "play cards" },
      { id: "l2-boss", thai: "หัวหน้า", roman: "hǔua nâa", english: "boss" },
      { id: "l2-wife", thai: "ภรรยา", roman: "phan-rá-yaa", english: "wife" },
      { id: "l2-son", thai: "ลูกชาย", roman: "lûuk chaai", english: "son" },
      { id: "l2-student", thai: "นักเรียน", roman: "nák rian", english: "student" },
      { id: "l2-principal", thai: "ครูใหญ่", roman: "khruu yài", english: "principal" },
      { id: "l2-spicy", thai: "เผ็ด", roman: "phèt", english: "spicy" },
      { id: "l2-father", thai: "พ่อ", roman: "phâaw", english: "father" },
      { id: "l2-mother", thai: "แม่", roman: "mâae", english: "mother" },
      { id: "l2-older-brother", thai: "พี่ชาย", roman: "phîi chaai", english: "older brother" },
      { id: "l2-younger-brother", thai: "น้องชาย", roman: "náawng chaai", english: "younger brother" },
      { id: "l2-older-sister", thai: "พี่สาว", roman: "phîi sǎao", english: "older sister" },
      { id: "l2-younger-sister", thai: "น้องสาว", roman: "náawng sǎao", english: "younger sister" },
      { id: "l2-friend", thai: "เพื่อน", roman: "phʉ̂an", english: "friend" },
      { id: "l2-partner", thai: "แฟน", roman: "faaen", english: "boyfriend / girlfriend" },
      { id: "l2-colleague", thai: "เพื่อนร่วมงาน", roman: "phʉ̂an rûuam-ngaan", english: "colleague" }
    ]
  }
];

const storageKey = "nariThaiVocabTrainer.v1";
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
  locked: true,
  progress: loadProgress()
};

const wordById = new Map(lessons.flatMap((lesson) => lesson.words).map((word) => [word.id, word]));

init();

function init() {
  lessonSelect.innerHTML = lessons.map((lesson) => `<option value="${lesson.id}">${lesson.title}</option>`).join("");
  lessonSelect.value = state.lessonId;
  lessonSelect.addEventListener("change", () => {
    state.lessonId = lessonSelect.value;
    state.queue = [];
    state.current = null;
    state.locked = true;
    updateStatus();
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
  $("#parseButton").addEventListener("click", renderOcrPreview);
  updateStatus();
  showIdlePrompt();
}

function startPractice(activeMode) {
  state.activeMode = activeMode;
  state.correct = 0;
  state.answered = 0;
  state.queue = buildQueue(activeMode);
  state.sessionTotal = state.queue.length;
  if (!state.queue.length) {
    state.current = null;
    choiceGrid.innerHTML = "";
    const emptyText = activeMode === "review"
      ? "復習モードの単語はありません。2回以上間違えた単語がここに入ります。"
      : "この Lesson にはまだ単語がありません。";
    promptText.textContent = emptyText;
    promptSub.textContent = "授業ノートを追加すると、ここに Lesson が増えていきます。";
    feedback.textContent = "";
    updateStatus();
    return;
  }
  nextQuestion();
}

function buildQueue(activeMode) {
  const lessonWords = getLessonWords();
  if (activeMode === "review") {
    return shuffle(lessonWords.filter((word) => getWordProgress(word.id).inReview));
  }
  return shuffle(lessonWords);
}

function nextQuestion() {
  if (!state.queue.length) {
    state.queue = buildQueue(state.activeMode);
    if (!state.queue.length) {
      showIdlePrompt();
      return;
    }
  }
  state.current = state.queue.shift();
  state.locked = false;
  renderQuestion();
}

function renderQuestion() {
  const word = state.current;
  const choices = makeChoices(word);
  const prompt = state.mode === "thaiToEnglish" ? thaiText(word) : word.english;
  const sub = getPromptSub(word);

  promptText.textContent = prompt;
  promptSub.textContent = sub;
  modeLabel.textContent = state.activeMode === "review" ? "復習モード" : "通常練習";
  progressLabel.textContent = currentLesson().title;
  feedback.textContent = "";
  feedback.className = "feedback";
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
    feedback.textContent = state.activeMode === "review"
      ? "正解です。復習モードでは3回正解で卒業です。"
      : "正解です。";
    feedback.className = "feedback good";
    window.setTimeout(nextQuestion, 850);
  } else {
    handleWrong(state.current);
    state.sessionTotal += 1;
    state.queue.splice(Math.min(2, state.queue.length), 0, state.current);
    feedback.textContent = `違います。正解は ${answerLabel(state.current)}。もう一度あとで出ます。`;
    feedback.className = "feedback bad";
    window.setTimeout(nextQuestion, 1350);
  }
  saveProgress();
  updateStatus();
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

function getPromptSub(word) {
  if (state.mode === "thaiToEnglish") {
    return state.display === "thai" ? currentLesson().title : `${currentLesson().title} / ${word.thai}`;
  }
  return state.display === "thai" ? `${currentLesson().title} / choose Thai script` : `${currentLesson().title} / choose romanization`;
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
  promptText.textContent = "通常練習か復習モードを選んでください";
  promptSub.textContent = `${currentLesson().title} / ${currentLesson().source}`;
  choiceGrid.innerHTML = "";
  feedback.textContent = "";
  modeLabel.textContent = "待機中";
  progressLabel.textContent = currentLesson().title;
  state.sessionTotal = state.queue.length;
  updateStatus();
}

function updateProgressBars() {
  const normalTotal = state.activeMode === "normal" ? state.sessionTotal || getLessonWords().length : getLessonWords().length;
  const normalDone = state.activeMode === "normal" ? state.answered : 0;
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
    parsePreview.innerHTML = '<div class="preview-row">読み取れる行がありません。カンマ区切りで「タイ語, roman, English」と入力してください。</div>';
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

function shuffle(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
