// =========================
  // Screens
  // =========================
  const homeScreen   = document.getElementById('homeScreen');
  const modeMenu     = document.getElementById('modeMenu');
  const mainMenu     = document.getElementById('mainMenu');
  const settingScreen= document.getElementById('settingScreen');
  const gameArea     = document.getElementById('gameArea');

  const learningMenu = document.getElementById('learningMenu');
  const learningShow = document.getElementById('learningShow');
  const learningQuiz = document.getElementById('learningQuiz');
  const resultScreen = document.getElementById('resultScreen');
  const resultTitle = document.getElementById('resultTitle');
  const resultTalk = document.getElementById('resultTalk');
  const resultSummary = document.getElementById('resultSummary');
  const resultNari = document.getElementById('resultNari');

  const gameBoard    = document.getElementById('gameBoard');
  const timerDisplay = document.getElementById('timer');
  const attemptsDisplay = document.getElementById('attempts');
  const pairGrid     = document.getElementById('pairGrid');
  const modeLabel    = document.getElementById('modeLabel');

  function goTo(screen){
    [homeScreen, modeMenu, mainMenu, settingScreen, gameArea, learningMenu, learningShow, learningQuiz, resultScreen]
      .forEach(s => s.classList.add('hidden'));
    screen.classList.remove('hidden');
  }

  function showResult({ title, talk, summary, nari = 'cheer' }){
    resultTitle.textContent = title;
    resultTalk.textContent = talk;
    resultSummary.textContent = summary;
    resultNari.src = nari === 'wink' ? '../../assets/images/nari/chibi/chibi-wink.png' : '../../assets/images/nari/chibi/chibi-cheer.png';
    goTo(resultScreen);
  }

  // =========================
  // Fonts
  // =========================
  const THAI_FONTS = [
    { label: 'Noto Sans Thai', css: "'Noto Sans Thai', system-ui, sans-serif" },
    { label: 'Sarabun', css: "'Sarabun', system-ui, sans-serif" },
    { label: 'Tahoma', css: "Tahoma, system-ui, sans-serif" },
    { label: 'System UI', css: "system-ui, sans-serif" }
  ];

  const fontSelectHome    = document.getElementById('fontSelectHome');
  const fontSelectMatch   = document.getElementById('fontSelectMatch');
  const fontSelectSetting = document.getElementById('fontSelectSetting');
  const fontSelectLearn   = document.getElementById('fontSelectLearn');
  const fontSelectLearn2  = document.getElementById('fontSelectLearn2');

  function populateFontSelect(sel){
    sel.innerHTML = '';
    THAI_FONTS.forEach(f => {
      const opt = document.createElement('option');
      opt.value = f.css;
      opt.textContent = f.label;
      sel.appendChild(opt);
    });
  }

  [fontSelectHome, fontSelectMatch, fontSelectSetting, fontSelectLearn, fontSelectLearn2]
    .forEach(populateFontSelect);

  function setFont(css){
    document.documentElement.style.setProperty('--thai-font', css);
    localStorage.setItem('thai_font_css', css);
    [fontSelectHome, fontSelectMatch, fontSelectSetting, fontSelectLearn, fontSelectLearn2]
      .forEach(s => s.value = css);
  }

  [fontSelectHome, fontSelectMatch, fontSelectSetting, fontSelectLearn, fontSelectLearn2]
    .forEach(sel => sel.addEventListener('change', () => setFont(sel.value)));

  const savedFont = localStorage.getItem('thai_font_css');
  if (savedFont) setFont(savedFont);
  else setFont(THAI_FONTS[0].css);

  // =========================
  // Rare consonants
  // =========================
  const RARE_CONSONANTS = new Set(['ฃ','ฅ','ฆ','ฌ','ฎ','ฏ','ฐ','ฑ','ฒ','ณ','ศ','ษ','ฬ']);

  const includeRareGlobal = document.getElementById('includeRareGlobal');
  const includeRareMatch  = document.getElementById('includeRareMatch');
  const includeRareSetting= document.getElementById('includeRareSetting');
  const includeRareLearn  = document.getElementById('includeRareLearn');
  const includeRareLearn2 = document.getElementById('includeRareLearn2');

  let includeRare = true;
  function isRareChar(ch){ return RARE_CONSONANTS.has(ch); }

  function setIncludeRare(value){
    includeRare = value;
    includeRareGlobal.checked = value;
    includeRareMatch.checked  = value;
    includeRareSetting.checked= value;
    includeRareLearn.checked  = value;
    includeRareLearn2.checked = value;
    localStorage.setItem('thai_include_rare', value ? '1' : '0');

    if (!settingScreen.classList.contains('hidden')) renderSettingGrid();
    if (!learningMenu.classList.contains('hidden')) renderUnitGrid();
    if (!learningShow.classList.contains('hidden')) showLearnCard();
    if (!learningQuiz.classList.contains('hidden')) renderQuizChoices();
  }

  const savedInclude = localStorage.getItem('thai_include_rare');
  setIncludeRare(savedInclude === '0' ? false : true);

  [includeRareGlobal, includeRareMatch, includeRareSetting, includeRareLearn, includeRareLearn2]
    .forEach(cb => cb.addEventListener('change', () => setIncludeRare(cb.checked)));

  // =========================
  // Match Game: Consonant labels (Latin) + IPA
  // =========================
  const CONSONANT_LABEL_LATIN = {
    'ก': 'gɔɔ gài', 'ข': 'kɔ̌ɔ kài', 'ฃ': 'kɔ̌ɔ khùuat', 'ค': 'kɔɔ khwaai', 'ฅ': 'kɔɔ khon', 'ฆ': 'kɔɔ rá-khang',
    'ง': 'ngɔɔ nguu',
    'จ': 'jɔɔ jaan', 'ฉ': 'chɔ̌ɔ chìng', 'ช': 'chɔɔ cháang', 'ซ': 'sɔɔ sôo', 'ฌ': 'chɔɔ chəə',
    'ญ': 'yɔɔ yǐng',
    'ฎ': 'dɔɔ chá-daa', 'ฏ': 'dtɔɔ bpà-dtàk',
    'ฐ': 'tɔ̌ɔ tǎan', 'ฑ': 'tɔɔ mon-too', 'ฒ': 'tɔɔ phûu-tâo', 'ณ': 'nɔɔ neen',
    'ด': 'dɔɔ dèk', 'ต': 'dtɔɔ dtào', 'ถ': 'tɔ̌ɔ tǔng', 'ท': 'tɔɔ tá-hǎan', 'ธ': 'tɔɔ thong', 'น': 'nɔɔ nǔu',
    'บ': 'bɔɔ bai mái', 'ป': 'bpɔɔ bplaa', 'ผ': 'pɔ̌ɔ phʉ̂ng', 'ฝ': 'fɔ̌ɔ fǎa', 'พ': 'pɔɔ phaan', 'ฟ': 'fɔɔ fan', 'ภ': 'pɔɔ sǎm-phao', 'ม': 'mɔɔ máa',
    'ย': 'yɔɔ yák', 'ร': 'rɔɔ rʉʉa', 'ล': 'lɔɔ ling', 'ว': 'wɔɔ wɛ̌ɛn',
    'ศ': 'sɔ̌ɔ sǎa-laa', 'ษ': 'sɔ̌ɔ rʉʉ-sǐi', 'ส': 'sɔ̌ɔ sʉ̌ʉa',
    'ห': 'hɔ̌ɔ hìip', 'ฬ': 'lɔɔ jù-laa', 'อ': 'ɔɔ àang', 'ฮ': 'hɔɔ nók-hûuk'
  };

  const CONSONANT_IPA = {
    'ก': '/k/',
    'ข': '/kʰ/','ฃ': '/kʰ/','ค': '/kʰ/','ฅ': '/kʰ/','ฆ': '/kʰ/',
    'ง': '/ŋ/',
    'จ': '/tɕ/','ฉ': '/tɕʰ/','ช': '/tɕʰ/','ซ': '/s/','ฌ': '/tɕʰ/',
    'ญ': '/j/',
    'ฎ': '/d/','ฏ': '/t/',
    'ฐ': '/tʰ/','ฑ': '/tʰ/','ฒ': '/tʰ/','ณ': '/n/',
    'ด': '/d/','ต': '/t/','ถ': '/tʰ/','ท': '/tʰ/','ธ': '/tʰ/','น': '/n/',
    'บ': '/b/','ป': '/p/',
    'ผ': '/pʰ/','ฝ': '/f/','พ': '/pʰ/','ฟ': '/f/','ภ': '/pʰ/',
    'ม': '/m/',
    'ย': '/j/','ร': '/r~ɾ/','ล': '/l/','ว': '/w/',
    'ศ': '/s/','ษ': '/s/','ส': '/s/',
    'ห': '/h/','ฬ': '/l/','อ': '/ʔ/ (carrier)','ฮ': '/h/'
  };

  const CONSONANT_PAIRS_ALL = Object.keys(CONSONANT_LABEL_LATIN).map(ch => {
    const label = `${CONSONANT_LABEL_LATIN[ch]} ${CONSONANT_IPA[ch] || ''}`.trim();
    return [ch, label];
  });

  const VOWEL_PAIRS = [
    ['อะ','à'],   ['อา','aa'],
    ['อิ','ì'],   ['อี','ii'],
    ['อุ','ù'],   ['อู','uu'],
    ['เอ','ee'],   ['แอ','ɛɛ'],
    ['โอ','oo'],
    ['ไอ','ai'],  ['ใอ','ai'],
    ['เอา','ao'],
    ['อำ','am']
  ];

  const SYLLABLE_BASE_CONSONANTS_ALL = [
    'ก','ข','ค','ง','จ','ฉ','ช','ซ','ญ','ด','ต','ถ','ท','ธ','น',
    'บ','ป','ผ','ฝ','พ','ฟ','ภ','ม','ย','ร','ล','ว','ส','ห','อ','ฮ',
    'ฃ','ฅ','ฆ','ฌ','ฎ','ฏ','ฐ','ฑ','ฒ','ณ','ศ','ษ','ฬ'
  ];

  const SYLLABLE_VOWELS = [
    {thai:'ะ', latin:'a',  pattern:'post'},
    {thai:'า', latin:'aa', pattern:'post'},
    {thai:'ิ', latin:'i',  pattern:'above'},
    {thai:'ี', latin:'ii', pattern:'above'},
    {thai:'ุ', latin:'u',  pattern:'below'},
    {thai:'ู', latin:'uu', pattern:'below'},
    {thai:'เ', latin:'ee',  pattern:'pre'},
    {thai:'แ', latin:'ɛɛ', pattern:'pre'},
    {thai:'โ', latin:'oo',  pattern:'pre'},
    {thai:'ไ', latin:'ai', pattern:'pre'},
    {thai:'ใ', latin:'ai', pattern:'pre'}
  ];

  function composeSyllable(consonant, vowel){
    if (vowel.pattern === 'pre') return vowel.thai + consonant;
    return consonant + vowel.thai;
  }

  function consonantToLatin(c){
    const map = {
      'ก':'g','ข':'k','ฃ':'k','ค':'k','ฅ':'k','ฆ':'k',
      'ง':'ng',
      'จ':'j','ฉ':'ch','ช':'ch','ซ':'s','ฌ':'ch',
      'ญ':'y',
      'ฎ':'d','ฏ':'dt',
      'ฐ':'t','ฑ':'t','ฒ':'t','ณ':'n',
      'ด':'d','ต':'dt','ถ':'t','ท':'t','ธ':'t','น':'n',
      'บ':'b','ป':'bp','ผ':'p','ฝ':'f','พ':'p','ฟ':'f','ภ':'p','ม':'m',
      'ย':'y','ร':'r','ล':'l','ว':'w',
      'ศ':'s','ษ':'s','ส':'s',
      'ห':'h','ฬ':'l','อ':'', 'ฮ':'h'
    };
    return (map[c] ?? '?');
  }

  function consonantClass(c) {
    if ('ขฃฉฐถผฝศษสห'.includes(c)) return 'high';
    if ('กจฎฏดตบปอ'.includes(c)) return 'mid';
    return 'low';
  }

  function applyTone(base, tone) {
    if (tone === 'mid') return base;
    const marks = {
      low: { a: 'à', e: 'è', i: 'ì', o: 'ò', u: 'ù', ɔ: 'ɔ̀', ɛ: 'ɛ̀', ə: 'ə̀', ʉ: 'ʉ̀' },
      falling: { a: 'â', e: 'ê', i: 'î', o: 'ô', u: 'û', ɔ: 'ɔ̂', ɛ: 'ɛ̂', ə: 'ə̂', ʉ: 'ʉ̂' },
      high: { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', ɔ: 'ɔ́', ɛ: 'ɛ́', ə: 'ə́', ʉ: 'ʉ́' },
      rising: { a: 'ǎ', e: 'ě', i: 'ǐ', o: 'ǒ', u: 'ǔ', ɔ: 'ɔ̌', ɛ: 'ɛ̌', ə: 'ə̌', ʉ: 'ʉ̌' }
    };
    const index = [...base].findIndex((char) => marks[tone][char]);
    if (index < 0) return base;
    const chars = [...base];
    chars[index] = marks[tone][chars[index]];
    return chars.join('');
  }

  function romanizeSyntheticSyllable(consonant, vowel) {
    const base = consonantToLatin(consonant) + vowel.latin;
    const liveVowels = new Set(['aa', 'ii', 'uu', 'ee', 'ɛɛ', 'oo', 'ai']);
    const live = liveVowels.has(vowel.latin);
    const klass = consonantClass(consonant);
    if (live) return applyTone(base, klass === 'high' ? 'rising' : 'mid');
    if (klass === 'low') return applyTone(base, 'high');
    return applyTone(base, 'low');
  }

  // =========================
  // Match game state
  // =========================
  let currentMode = null;
  let pairList = [];
  let selectedPairs = new Set();

  let timer = 0;
  let timerInterval = null;
  let attempts = 0;
  let flippedCards = [];
  let matchedCount = 0;
  let boardLocked = false;

  function shuffle(array){
    for (let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function isPairRare(pair){
    if (currentMode === 'consonant') return isRareChar(pair[0]);
    if (currentMode === 'syllable') return isRareChar(pair[0].charAt(0));
    return false;
  }

  function selectMode(mode){
    currentMode = mode;
    selectedPairs.clear();

    if (mode === 'consonant'){
      modeLabel.textContent = 'Consonants (Thai ↔ Latin+IPA)';
      pairList = CONSONANT_PAIRS_ALL.slice();
    } else if (mode === 'vowel'){
      modeLabel.textContent = 'Vowels (carrier)';
      pairList = VOWEL_PAIRS.slice();
    } else {
      modeLabel.textContent = 'Syllables';
      pairList = buildSyllablePairs();
    }

    goTo(mainMenu);
  }

  function buildSyllablePairs(){
    const result = [];
    for (const c of SYLLABLE_BASE_CONSONANTS_ALL){
      for (const v of SYLLABLE_VOWELS){
        const thai = composeSyllable(c, v);
        const latin = romanizeSyntheticSyllable(c, v);
        result.push([thai, latin]);
      }
    }
    return result;
  }

  function backToMode(){
    currentMode = null;
    selectedPairs.clear();
    clearInterval(timerInterval);
    timerInterval = null;
    goTo(modeMenu);
  }

  function showSetting(){
    selectedPairs.clear();
    renderSettingGrid();
    goTo(settingScreen);
  }

  function renderSettingGrid(){
    pairGrid.innerHTML = '';

    pairList.forEach((pair, idx) => {
      const rare = isPairRare(pair);
      const disabled = (!includeRare && rare);

      const div = document.createElement('div');
      div.className = 'pair' + (rare ? ' rare' : '') + (disabled ? ' disabled' : '');

      div.innerHTML = `${pair[0]}<span class="small">${pair[1]}</span>`;
      if (selectedPairs.has(idx)) div.classList.add('selected');

      div.onclick = () => {
        if (disabled) return;

        if (div.classList.contains('selected')){
          div.classList.remove('selected');
          selectedPairs.delete(idx);
        } else {
          if (selectedPairs.size >= 15) return;
          div.classList.add('selected');
          selectedPairs.add(idx);
        }
      };

      pairGrid.appendChild(div);
    });
  }

  function startRandomGame(){
    selectedPairs = new Set();
    const candidates = [];
    for (let i = 0; i < pairList.length; i++){
      const rare = isPairRare(pairList[i]);
      if (!includeRare && rare) continue;
      candidates.push(i);
    }
    shuffle(candidates);
    const maxPairs = Math.min(15, candidates.length);
    for (let i = 0; i < maxPairs; i++) selectedPairs.add(candidates[i]);
    launchGame();
  }

  function startGame(){
    if (selectedPairs.size === 0) return alert('Please select at least 1 pair.');
    if (!includeRare){
      const remove = [];
      selectedPairs.forEach(i => { if (isPairRare(pairList[i])) remove.push(i); });
      remove.forEach(i => selectedPairs.delete(i));
      if (selectedPairs.size === 0) return alert('All selected pairs were rare and got excluded.');
    }
    launchGame();
  }

  function launchGame(){
    clearInterval(timerInterval);
    timerInterval = null;

    goTo(gameArea);

    gameBoard.innerHTML = '';
    attempts = 0;
    matchedCount = 0;
    timer = 0;
    flippedCards = [];
    boardLocked = false;

    attemptsDisplay.textContent = 'Attempts: 0';
    timerDisplay.textContent = 'Time: 0s';

    const selected = Array.from(selectedPairs).map(i => pairList[i]);

    const cards = [];
    selected.forEach(([a, b]) => {
      const rare = isPairRare([a, b]);
      cards.push({ text: a, match: b, rare, isThai: /^[\u0E00-\u0E7F]+$/.test(a) ? 1 : 0 });
      cards.push({ text: b, match: a, rare, isThai: /^[\u0E00-\u0E7F]+$/.test(b) ? 1 : 0 });
    });

    shuffle(cards);

    cards.forEach(cd => {
      const card = document.createElement('div');
      card.className = 'card' + (cd.rare ? ' rare' : '');
      card.dataset.text = cd.text;
      card.dataset.match = cd.match;
      card.dataset.isThai = cd.isThai;
      card.textContent = '';
      card.onclick = () => flipCard(card);
      gameBoard.appendChild(card);
    });

    timerInterval = setInterval(() => {
      timer++;
      timerDisplay.textContent = `Time: ${timer}s`;
    }, 1000);
  }

  function flipCard(card){
    if (boardLocked) return;
    if (card.classList.contains('flipped')) return;
    if (flippedCards.length >= 2) return;

    card.classList.add('flipped');
    card.textContent = card.dataset.text;
    card.setAttribute('data-is-thai', card.dataset.isThai);

    flippedCards.push(card);

    if (flippedCards.length === 2){
      attempts++;
      attemptsDisplay.textContent = `Attempts: ${attempts}`;
      const [c1, c2] = flippedCards;

      if (c1.dataset.match === c2.dataset.text){
        matchedCount++;
        flippedCards = [];
        if (matchedCount === selectedPairs.size){
          clearInterval(timerInterval);
          timerInterval = null;
          setTimeout(() => showResult({
            title: 'Clear!',
            talk: 'Great! You matched the letters and sounds clearly.',
            summary: `Time: ${timer}s / Attempts: ${attempts}`,
            nari: 'wink'
          }), 250);
        }
      } else {
        boardLocked = true;
        setTimeout(() => {
          c1.classList.remove('flipped'); c1.textContent = '';
          c2.classList.remove('flipped'); c2.textContent = '';
          flippedCards = [];
          boardLocked = false;
        }, 800);
      }
    }
  }

  // =========================
  // Speech (Thai)
  // =========================
  function getThaiVoice(){
    const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    const th = voices.filter(v => (v.lang || '').toLowerCase().startsWith('th'));
    return th[0] || null;
  }

  function speakThai(text){
    if (!('speechSynthesis' in window)){
      console.warn('speechSynthesis not available');
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'th-TH';
    const v = getThaiVoice();
    if (v) u.voice = v;
    else console.warn('No Thai voice found (th-TH). Sound may be unavailable.');
    u.rate = 0.95;
    u.pitch = 1.0;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  if ('speechSynthesis' in window){
    window.speechSynthesis.onvoiceschanged = () => {};
  }

  // =========================
  // Learning Mode: content switch
  // =========================
  const learnContentSelect = document.getElementById('learnContentSelect');
  const learnMenuNote = document.getElementById('learnMenuNote');
  const learnContentLabel = document.getElementById('learnContentLabel');
  const quizContentLabel = document.getElementById('quizContentLabel');
  const quizPrompt = document.getElementById('quizPrompt');

  const rareToggleWrap = document.getElementById('rareToggleWrap');
  const rareToggleWrap2 = document.getElementById('rareToggleWrap2');

  let learnContent = localStorage.getItem('learn_content') || 'consonant';
  learnContentSelect.value = learnContent;

  learnContentSelect.addEventListener('change', () => {
    learnContent = learnContentSelect.value;
    localStorage.setItem('learn_content', learnContent);
    renderUnitGrid();
  });

  // =========================
  // Learning data: Consonant Units (5 chars)
  // =========================
  const CONSONANT_UNITS = [
    { unit: 1, chars: ['ก','น','ม','ร','อ'] },
    { unit: 2, chars: ['ส','ต','ป','บ','ล'] },
    { unit: 3, chars: ['ด','ช','ค','ท','ย'] },
    { unit: 4, chars: ['ห','ว','พ','ฟ','ง'] },
    { unit: 5, chars: ['จ','ข','ภ','ธ','ญ'] },
    { unit: 6, chars: ['ศ','ษ','ฬ','ณ','ฆ'] } // rare-heavy
  ];

  const LEARN_CONS = {
    'ก': { name:'กอ', ipa:'/k/',    word:'กิน',  wordIpa:'/kin/', meaning:'eat' },
    'น': { name:'นอ', ipa:'/n/',    word:'นม',   wordIpa:'/nom/', meaning:'milk' },
    'ม': { name:'มอ', ipa:'/m/',    word:'มือ',  wordIpa:'/mɯː/', meaning:'hand' },
    'ร': { name:'รอ', ipa:'/r~ɾ/',  word:'รถ',   wordIpa:'/rót/', meaning:'car' },
    'อ': { name:'ออ', ipa:'/ʔ/ (carrier)', word:'ออก',  wordIpa:'/ʔɔ̀ːk/', meaning:'go out' },

    'ส': { name:'สอ', ipa:'/s/',    word:'สวย',  wordIpa:'/sǔai/', meaning:'beautiful' },
    'ต': { name:'ตอ', ipa:'/t/',    word:'ตา',   wordIpa:'/taː/', meaning:'eye / grandpa (context)' },
    'ป': { name:'ปอ', ipa:'/p/',    word:'ปลา',  wordIpa:'/plaː/', meaning:'fish' },
    'บ': { name:'บอ', ipa:'/b/',    word:'บ้าน', wordIpa:'/bâːn/', meaning:'house' },
    'ล': { name:'ลอ', ipa:'/l/',    word:'ลม',   wordIpa:'/lom/', meaning:'wind' },

    'ด': { name:'ดอ', ipa:'/d/',    word:'ดี',   wordIpa:'/diː/', meaning:'good' },
    'ช': { name:'ชอ', ipa:'/tɕʰ/',  word:'ชา',   wordIpa:'/tɕʰaː/', meaning:'tea' },
    'ค': { name:'คอ', ipa:'/kʰ/',   word:'คน',   wordIpa:'/kʰon/', meaning:'person' },
    'ท': { name:'ทอ', ipa:'/tʰ/',   word:'ทาง',  wordIpa:'/tʰaːŋ/', meaning:'way / road' },
    'ย': { name:'ยอ', ipa:'/j/',    word:'ยา',   wordIpa:'/jaː/', meaning:'medicine' },

    'ห': { name:'หอ', ipa:'/h/',    word:'หิว',  wordIpa:'/hǐu/', meaning:'hungry' },
    'ว': { name:'วอ', ipa:'/w/',    word:'วัน',  wordIpa:'/wan/', meaning:'day' },
    'พ': { name:'พอ', ipa:'/pʰ/',   word:'พ่อ',  wordIpa:'/pʰɔ̂ː/', meaning:'father' },
    'ฟ': { name:'ฟอ', ipa:'/f/',    word:'ไฟ',   wordIpa:'/fai/', meaning:'fire / electricity' },
    'ง': { name:'งอ', ipa:'/ŋ/',    word:'งาน',  wordIpa:'/ŋaːn/', meaning:'work / event' },

    'จ': { name:'จอ', ipa:'/tɕ/',   word:'จีน',  wordIpa:'/tɕiːn/', meaning:'China / Chinese' },
    'ข': { name:'ขอ', ipa:'/kʰ/',   word:'ข้าว', wordIpa:'/kʰâːw/', meaning:'rice (cooked)' },
    'ภ': { name:'ภอ', ipa:'/pʰ/',   word:'ภาพ',  wordIpa:'/pʰâːp/', meaning:'picture' },
    'ธ': { name:'ธอ', ipa:'/tʰ/',   word:'ธรรม', wordIpa:'/tʰam/', meaning:'dharma / moral (context)' },
    'ญ': { name:'ญอ', ipa:'/j/',    word:'ญาติ', wordIpa:'/jâːt/', meaning:'relative' },

    'ศ': { name:'ศอ', ipa:'/s/',    word:'ศูนย์', wordIpa:'/sǔːn/', meaning:'zero / center' },
    'ษ': { name:'ษอ', ipa:'/s/',    word:'(edit later)', wordIpa:'', meaning:'rare (edit later)' },
    'ฬ': { name:'ฬอ', ipa:'/l/',    word:'กีฬา',  wordIpa:'/kiːlaː/', meaning:'sport' },
    'ณ': { name:'ณอ', ipa:'/n/',    word:'(edit later)', wordIpa:'', meaning:'rare (edit later)' },
    'ฆ': { name:'ฆอ', ipa:'/kʰ/',   word:'ฆ่า',   wordIpa:'/kʰâː/', meaning:'kill (common word; careful)' }
  };

  // =========================
  // Learning data: Vowel Units (5 pairs per unit, short/long)
  // =========================
  // Each unit has 5 vowel-pairs.
  // NOTE: vowel forms use carrier (อ) or standard short-mark (ะ) forms.
  const VOWEL_UNITS = [
    {
      unit: 1,
      pairs: [
        { short:'อะ', long:'อา', ipaS:'/a/',  ipaL:'/aː/',  exS:'นะ', exL:'มา', meaning:'short/long a (particle / come)' },
        { short:'อิ', long:'อี', ipaS:'/i/',  ipaL:'/iː/',  exS:'กิน', exL:'ดี', meaning:'eat / good' },
        { short:'อุ', long:'อู', ipaS:'/u/',  ipaL:'/uː/',  exS:'ทุก', exL:'ดู', meaning:'every / look' },
        { short:'เอะ', long:'เอ', ipaS:'/e/',  ipaL:'/eː/', exS:'เตะ', exL:'เท', meaning:'kick / pour' },
        { short:'แอะ', long:'แอ', ipaS:'/ɛ/',  ipaL:'/ɛː/', exS:'แค่', exL:'แม่', meaning:'only / mother' }
      ]
    },
    {
      unit: 2,
      pairs: [
        { short:'โอะ', long:'โอ', ipaS:'/o/',  ipaL:'/oː/', exS:'โต๊ะ', exL:'โต', meaning:'table / big(grow)' },
        { short:'เอาะ', long:'ออ', ipaS:'/ɔ/',  ipaL:'/ɔː/', exS:'เพราะ', exL:'พอ', meaning:'because / enough' },
        { short:'อึ', long:'อือ', ipaS:'/ɯ/',  ipaL:'/ɯː/', exS:'ตึก', exL:'มือ', meaning:'building / hand' },
        { short:'เอียะ', long:'เอีย', ipaS:'/ia/', ipaL:'/iaː/', exS:'(edit)', exL:'เสีย', meaning:'diphthong (edit later)' },
        { short:'เอือะ', long:'เอือ', ipaS:'/ɯa/', ipaL:'/ɯaː/', exS:'(edit)', exL:'เรือ', meaning:'diphthong (edit later)' }
      ]
    }
  ];

  // =========================
  // Learning UI refs
  // =========================
  const unitGrid = document.getElementById('unitGrid');

  const learnUnitLabel = document.getElementById('learnUnitLabel');
  const learnProgress  = document.getElementById('learnProgress');
  const learnChar      = document.getElementById('learnChar');
  const learnMetaLine  = document.getElementById('learnMetaLine');
  const learnName      = document.getElementById('learnName');
  const learnIPA       = document.getElementById('learnIPA');
  const learnWord      = document.getElementById('learnWord');
  const learnMeaning   = document.getElementById('learnMeaning');

  const vowelView      = document.getElementById('vowelView');
  const vowelShortText = document.getElementById('vowelShortText');
  const vowelLongText  = document.getElementById('vowelLongText');
  const vowelShortIPA  = document.getElementById('vowelShortIPA');
  const vowelLongIPA   = document.getElementById('vowelLongIPA');
  const vowelWordLine  = document.getElementById('vowelWordLine');
  const vowelMeaningLine = document.getElementById('vowelMeaningLine');

  const soundBtn1 = document.getElementById('soundBtn1');

  const quizUnitLabel = document.getElementById('quizUnitLabel');
  const quizProgress  = document.getElementById('quizProgress');
  const quizChoices   = document.getElementById('quizChoices');
  const quizHint      = document.getElementById('quizHint');

  // Learning state
  let learnUnitIndex = 0;
  let learnIndexInUnit = 0; // consonant: char index, vowel: pair index
  let currentTarget = null; // consonant: char, vowel: {pair, which:'short'|'long'}

  // =========================
  // Learning: Unit grid render
  // =========================
  function renderUnitGrid(){
    unitGrid.innerHTML = '';

    if (learnContent === 'consonant'){
      // show rare toggle
      rareToggleWrap.classList.remove('hidden');
      rareToggleWrap2.classList.remove('hidden');

      learnMenuNote.textContent =
        'Consonants: 5 letters per unit (rough frequency order). Flow: show → sound → quiz (choose the correct letter). Rare letters can be excluded.';

      CONSONANT_UNITS.forEach((u, idx) => {
        const effective = u.chars.filter(ch => includeRare || !isRareChar(ch));
        const disabled = (effective.length === 0);

        const card = document.createElement('div');
        card.className = 'unitCard';
        card.style.opacity = disabled ? '0.4' : '1';
        card.style.cursor = disabled ? 'not-allowed' : 'pointer';

        const charsHtml = u.chars.map(ch => {
          const cls = isRareChar(ch) ? 'rareChar' : '';
          return `<span class="${cls}">${ch}</span>`;
        }).join(' ');

        card.innerHTML = `
          <h4>Unit ${u.unit}</h4>
          <div class="unitChars">${charsHtml}</div>
          <div class="mini">${disabled ? 'All chars are rare and excluded.' : 'Tap to start learning this unit.'}</div>
        `;

        card.onclick = () => {
          if (disabled) return;
          startLearning(idx);
        };

        unitGrid.appendChild(card);
      });

    } else {
      // vowels: hide rare toggle
      rareToggleWrap.classList.add('hidden');
      rareToggleWrap2.classList.add('hidden');

      learnMenuNote.textContent =
        'Vowels: short/long pairs, 5 pairs per unit. Flow: show both → play sound → quiz (choose the correct vowel form).';

      VOWEL_UNITS.forEach((u, idx) => {
        const card = document.createElement('div');
        card.className = 'unitCard';
        card.style.cursor = 'pointer';

        const pairsHtml = u.pairs.map(p => `${p.short} / ${p.long}`).join('<br/>');

        card.innerHTML = `
          <h4>Unit ${u.unit}</h4>
          <div class="unitChars" style="font-size:20px;font-weight:800;">
            ${pairsHtml}
          </div>
          <div class="mini">Tap to start this vowel unit.</div>
        `;

        card.onclick = () => startLearning(idx);
        unitGrid.appendChild(card);
      });
    }
  }

  function startLearning(unitIdx){
    learnUnitIndex = unitIdx;
    learnIndexInUnit = 0;
    goTo(learningShow);
    showLearnCard();
  }

  function getEffectiveConsonants(){
    const raw = CONSONANT_UNITS[learnUnitIndex].chars.slice();
    return raw.filter(ch => includeRare || !isRareChar(ch));
  }

  // =========================
  // Learning: Show card
  // =========================
  function showLearnCard(){
    if (learnContent === 'consonant'){
      learnContentLabel.textContent = 'Consonants';
      quizContentLabel.textContent = 'Consonants';

      // enable rare toggles
      rareToggleWrap2.classList.remove('hidden');

      const chars = getEffectiveConsonants();
      if (chars.length === 0){
        alert('This unit has no available chars (rare excluded).');
        goTo(learningMenu);
        return;
      }
      if (learnIndexInUnit >= chars.length) learnIndexInUnit = 0;

      const ch = chars[learnIndexInUnit];
      currentTarget = { type:'consonant', ch };

      const data = LEARN_CONS[ch] || { name:'', ipa:'', word:'', wordIpa:'', meaning:'' };

      learnUnitLabel.textContent = CONSONANT_UNITS[learnUnitIndex].unit;
      learnProgress.textContent = `${learnIndexInUnit + 1} / ${chars.length}`;

      vowelView.classList.add('hidden');
      learnChar.classList.remove('hidden');
      learnMetaLine.classList.remove('hidden');
      learnWord.classList.remove('hidden');
      learnMeaning.classList.remove('hidden');

      learnChar.textContent = ch;
      learnChar.classList.toggle('rare', isRareChar(ch));

      learnName.textContent = data.name || '';
      learnIPA.textContent  = data.ipa || '';

      const wordText = data.word ? `${data.word}` : '';
      const ipaText  = data.wordIpa ? `(${data.wordIpa})` : '';
      learnWord.innerHTML = wordText ? `${wordText} <span>${ipaText}</span>` : '';
      learnMeaning.textContent = data.meaning ? `Meaning: ${data.meaning}` : '';

      soundBtn1.textContent = '🔊 Sound';

    } else {
      learnContentLabel.textContent = 'Vowels';
      quizContentLabel.textContent = 'Vowels';

      // hide rare toggles
      rareToggleWrap2.classList.add('hidden');

      const pairs = VOWEL_UNITS[learnUnitIndex].pairs;
      if (learnIndexInUnit >= pairs.length) learnIndexInUnit = 0;

      const pair = pairs[learnIndexInUnit];

      // in vowel mode, the "primary sound" defaults to SHORT for preview (quiz randomizes)
      currentTarget = { type:'vowel', pair, which:'short' };

      learnUnitLabel.textContent = VOWEL_UNITS[learnUnitIndex].unit;
      learnProgress.textContent = `${learnIndexInUnit + 1} / ${pairs.length}`;

      // show vowel view
      learnChar.classList.add('hidden');
      learnMetaLine.classList.add('hidden');
      learnWord.classList.add('hidden');
      learnMeaning.classList.add('hidden');

      vowelView.classList.remove('hidden');

      vowelShortText.textContent = pair.short;
      vowelLongText.textContent  = pair.long;
      vowelShortIPA.textContent  = pair.ipaS || '';
      vowelLongIPA.textContent   = pair.ipaL || '';

      vowelWordLine.innerHTML = `<b>Examples:</b> ${pair.exS} / ${pair.exL}`;
      vowelMeaningLine.textContent = pair.meaning ? `Note: ${pair.meaning}` : '';

      soundBtn1.textContent = '🔊 Sound (short)';

    }
  }

  function backToShow(){ goTo(learningShow); }

  // =========================
  // Learning: Sound
  // =========================
  function playPrimarySound(){
    if (!currentTarget) return;

    if (currentTarget.type === 'consonant'){
      const ch = currentTarget.ch;
      const data = LEARN_CONS[ch];
      // speak consonant name for clarity
      speakThai(data?.name || ch);
      return;
    }

    // vowel: speak the vowel symbol itself (browser voices vary, but usable for self practice)
    const pair = currentTarget.pair;
    const which = currentTarget.which || 'short';
    speakThai(which === 'short' ? pair.short : pair.long);
  }

  // =========================
  // Learning: Quiz
  // =========================
  function toQuiz(){
    goTo(learningQuiz);
    renderQuizChoices();
  }

  function renderQuizChoices(){
    quizChoices.innerHTML = '';

    if (!currentTarget) return;

    if (learnContent === 'consonant'){
      quizPrompt.textContent = 'Which consonant matches the sound?';
      const chars = getEffectiveConsonants();
      if (chars.length === 0){
        alert('No available chars in this unit.');
        goTo(learningMenu);
        return;
      }

      quizUnitLabel.textContent = CONSONANT_UNITS[learnUnitIndex].unit;
      quizProgress.textContent = `${learnIndexInUnit + 1} / ${chars.length}`;

      const target = currentTarget.ch;
      const pool = chars.slice();
      shuffle(pool);

      let choices = pool.filter(c => c !== target).slice(0, Math.min(3, Math.max(1, pool.length - 1)));
      choices.push(target);
      shuffle(choices);

      choices.forEach(ch => {
        const btn = document.createElement('button');
        btn.className = 'choiceBtn' + (isRareChar(ch) ? ' rare' : '');
        btn.textContent = ch;
        btn.onclick = () => {
          if (ch === target){
            learnIndexInUnit++;
            if (learnIndexInUnit >= chars.length){
              showResult({
                title: `Unit ${CONSONANT_UNITS[learnUnitIndex].unit} complete`,
                talk: 'Great work! Keep this rhythm and move to the next letter island.',
                summary: 'Consonant learning unit complete.',
                nari: 'cheer'
              });
            } else {
              goTo(learningShow);
              showLearnCard();
            }
          } else {
            quizHint.textContent = 'Nope. Try again. (Replaying sound...)';
            playPrimarySound();
          }
        };
        quizChoices.appendChild(btn);
      });

      quizHint.textContent = 'Tap the correct consonant.';
      playPrimarySound();
      return;
    }

    // Vowel quiz: 2-choice short vs long (randomly target one)
    quizPrompt.textContent = 'Which vowel form matches the sound? (short vs long)';
    const pairs = VOWEL_UNITS[learnUnitIndex].pairs;

    quizUnitLabel.textContent = VOWEL_UNITS[learnUnitIndex].unit;
    quizProgress.textContent = `${learnIndexInUnit + 1} / ${pairs.length}`;

    const pair = pairs[learnIndexInUnit];

    // choose target randomly each quiz entry
    const which = (Math.random() < 0.5) ? 'short' : 'long';
    currentTarget = { type:'vowel', pair, which };

    const choices = [
      { label: pair.short, which:'short' },
      { label: pair.long,  which:'long' }
    ];
    shuffle(choices);

    choices.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'choiceBtn';
      btn.textContent = c.label;
      btn.onclick = () => {
        if (c.which === which){
          learnIndexInUnit++;
          if (learnIndexInUnit >= pairs.length){
            showResult({
              title: `Unit ${VOWEL_UNITS[learnUnitIndex].unit} complete`,
              talk: 'Nice vowel listening! Your ear is getting stronger.',
              summary: 'Vowel learning unit complete.',
              nari: 'cheer'
            });
          } else {
            goTo(learningShow);
            showLearnCard();
          }
        } else {
          quizHint.textContent = 'Nope. Try again. (Replaying sound...)';
          playPrimarySound();
        }
      };
      quizChoices.appendChild(btn);
    });

    quizHint.textContent = `Tip: target is ${which.toUpperCase()} (you can delete this hint later if you want true hell).`;
    playPrimarySound();
  }

  // =========================
  // Init learning menu behavior
  // =========================
  function refreshLearnLabels(){
    if (learnContent === 'consonant'){
      learnContentLabel.textContent = 'Consonants';
      quizContentLabel.textContent = 'Consonants';
    } else {
      learnContentLabel.textContent = 'Vowels';
      quizContentLabel.textContent = 'Vowels';
    }
  }

  // =========================
  // Boot
  // =========================
  renderUnitGrid();
  refreshLearnLabels();
  goTo(homeScreen);
