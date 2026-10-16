const lessons = [
  {
    id: "lesson1",
    title: "Lesson 1",
    source: "オンライン授業ノート",
    words: [
      { id: "l1-dog", thai: "หมา", roman: "maː˩˩˦", english: "dog" },
      { id: "l1-cat", thai: "แมว", roman: "mɛːw˧", english: "cat" },
      { id: "l1-bread", thai: "ขนมปัง", roman: "kʰa˨˩.nom˩˩˦.paŋ˧", english: "bread" },
      { id: "l1-milk", thai: "นม", roman: "nom˧", english: "milk" },
      { id: "l1-movie", thai: "หนัง", roman: "naŋ˩˩˦", english: "movie" },
      { id: "l1-book", thai: "หนังสือ", roman: "naŋ˩˩˦.sɯː˩˩˦", english: "book" },
      { id: "l1-song", thai: "เพลง", roman: "pʰleːŋ˧", english: "song" },
      { id: "l1-question", thai: "คำถาม", roman: "kʰam˧.tʰaːm˩˩˦", english: "question" },
      { id: "l1-alcohol", thai: "เหล้า", roman: "law˥˩", english: "alcohol" },
      { id: "l1-travel", thai: "ไปเที่ยว", roman: "paj˧.tʰia̯w˥˩", english: "travel" },
      { id: "l1-shopping", thai: "ซื้อของ", roman: "sɯː˦˥.kʰɔːŋ˩˩˦", english: "shopping" },
      { id: "l1-like", thai: "ชอบ", roman: "t͡ɕʰɔːp̚˥˩", english: "like" },
      { id: "l1-you", thai: "คุณ", roman: "kʰun˧", english: "you" },
      { id: "l1-i", thai: "ผม/ฉัน", roman: "pʰom˩˩˦ / t͡ɕʰan˩˩˦", english: "I" },
      { id: "l1-he-she", thai: "เขา", roman: "kʰaw˩˩˦", english: "he / she" },
      { id: "l1-they", thai: "พวกเขา", roman: "pʰua̯k̚˥˩.kʰaw˩˩˦", english: "they" },
      { id: "l1-we", thai: "เรา", roman: "raw˧", english: "we" },
      { id: "l1-this", thai: "นี่", roman: "niː˥˩", english: "this" },
      { id: "l1-what", thai: "อะไร", roman: "ʔa˨˩.raj˧", english: "what" },
      { id: "l1-speak", thai: "พูด", roman: "pʰuːt̚˥˩", english: "speak" },
      { id: "l1-again", thai: "อีกครั้ง", roman: "ʔiːk̚˨˩.kʰraŋ˦˥", english: "again" },
      { id: "l1-slowly", thai: "ช้าๆ", roman: "t͡ɕʰaː˦˥ t͡ɕʰaː˦˥", english: "slowly" },
      { id: "l1-sleep", thai: "นอน", roman: "nɔːn˧", english: "sleep" },
      { id: "l1-eat", thai: "กิน", roman: "kin˧", english: "eat" },
      { id: "l1-drink", thai: "ดื่ม", roman: "dɯːm˨˩", english: "drink" },
      { id: "l1-watch", thai: "ดู", roman: "duː˧", english: "watch" },
      { id: "l1-play", thai: "เล่น", roman: "len˥˩", english: "play" },
      { id: "l1-do", thai: "ทำ", roman: "tʰam˧", english: "do" },
      { id: "l1-read", thai: "อ่าน", roman: "ʔaːn˨˩", english: "read" },
      { id: "l1-go", thai: "ไป", roman: "paj˧", english: "go" },
      { id: "l1-ask", thai: "ถาม", roman: "tʰaːm˩˩˦", english: "ask" },
      { id: "l1-work", thai: "ทำงาน", roman: "tʰam˧.ŋaːn˧", english: "work" },
      { id: "l1-sing", thai: "ร้อง", roman: "rɔːŋ˦˥", english: "sing" },
      { id: "l1-listen", thai: "ฟัง", roman: "faŋ˧", english: "listen" },
      { id: "l1-have", thai: "มี", roman: "miː˧", english: "have" },
      { id: "l1-want", thai: "อยาก", roman: "jaːk̚˨˩", english: "want" }
    ]
  },
  {
    id: "lesson2",
    title: "Lesson 2",
    source: "オンライン授業ノート OCR 2026-07-20",
    words: [
      { id: "l2-of", thai: "ของ", roman: "kʰɔːŋ˩˩˦", english: "of / belonging to" },
      { id: "l2-food", thai: "อาหาร", roman: "ʔaː˧.haːn˩˩˦", english: "food" },
      { id: "l2-can", thai: "ได้", roman: "daːj˥˩", english: "can" },
      { id: "l2-cannot", thai: "ไม่ได้", roman: "maj˥˩.daj˥˩", english: "cannot" },
      { id: "l2-cook", thai: "ทำอาหาร", roman: "tʰam˧.ʔaː˧.haːn˩˩˦", english: "cook" },
      { id: "l2-drive", thai: "ขับรถ", roman: "kʰap̚˨˩ rot̚˦˥", english: "drive a car" },
      { id: "l2-swim", thai: "ว่ายน้ำ", roman: "waːj˥˩.naːm˦˥", english: "swim" },
      { id: "l2-play-cards", thai: "เล่นไพ่", roman: "len˥˩ pʰaj˥˩", english: "play cards" },
      { id: "l2-boss", thai: "หัวหน้า", roman: "hua̯˩˩˦.naː˥˩", english: "boss" },
      { id: "l2-wife", thai: "ภรรยา", roman: "pʰan˧.jaː˧", english: "wife" },
      { id: "l2-son", thai: "ลูกชาย", roman: "luːk̚˥˩.t͡ɕʰaːj˧", english: "son" },
      { id: "l2-student", thai: "นักเรียน", roman: "nak̚˦˥.ria̯n˧", english: "student" },
      { id: "l2-principal", thai: "ครูใหญ่", roman: "kʰruː˧.jaj˨˩", english: "principal" },
      { id: "l2-spicy", thai: "เผ็ด", roman: "pʰet̚˨˩", english: "spicy" },
      { id: "l2-father", thai: "พ่อ", roman: "pʰɔː˥˩", english: "father" },
      { id: "l2-mother", thai: "แม่", roman: "mɛː˥˩", english: "mother" },
      { id: "l2-older-brother", thai: "พี่ชาย", roman: "pʰiː˥˩.t͡ɕʰaːj˧", english: "older brother" },
      { id: "l2-younger-brother", thai: "น้องชาย", roman: "nɔːŋ˦˥.t͡ɕʰaːj˧", english: "younger brother" },
      { id: "l2-older-sister", thai: "พี่สาว", roman: "pʰiː˥˩.saːw˩˩˦", english: "older sister" },
      { id: "l2-younger-sister", thai: "น้องสาว", roman: "nɔːŋ˦˥.saːw˩˩˦", english: "younger sister" },
      { id: "l2-friend", thai: "เพื่อน", roman: "pʰɯa̯n˥˩", english: "friend" },
      { id: "l2-partner", thai: "แฟน", roman: "fɛːn˧", english: "boyfriend / girlfriend" },
      { id: "l2-colleague", thai: "เพื่อนร่วมงาน", roman: "pʰɯa̯n˥˩.rua̯m˥˩.ŋaːn˧", english: "colleague" }
    ]
  },
  {
    id: "lesson3",
    title: "Lesson 3",
    source: "オンライン授業ノート OCR 2026-07-20",
    words: [
      { id: "l3-singer", thai: "นักร้อง", roman: "nak̚˦˥.rɔːŋ˦˥", english: "singer" },
      { id: "l3-student", thai: "นักเรียน", roman: "nak̚˦˥.ria̯n˧", english: "student" },
      { id: "l3-businessman", thai: "นักธุรกิจ", roman: "nak̚˦˥.tʰu˦˥.ra˦˥.kit̚˨˩", english: "businessman" },
      { id: "l3-swimmer", thai: "นักว่ายน้ำ", roman: "nak̚˦˥.waːj˥˩.naːm˦˥", english: "swimmer" },
      { id: "l3-musician", thai: "นักดนตรี", roman: "nak̚˦˥.don˧.triː˧", english: "musician" },
      { id: "l3-engineer", thai: "วิศวกร", roman: "wit̚˦˥.sa˨˩.wa˦˥.kɔːn˧", english: "engineer" },
      { id: "l3-nurse", thai: "พยาบาล", roman: "pʰa˦˥.jaː˧.baːn˧", english: "nurse" },
      { id: "l3-investor", thai: "นักลงทุน", roman: "nak̚˦˥.loŋ˧.tʰun˧", english: "investor" },
      { id: "l3-cute", thai: "น่ารัก", roman: "naː˥˩.rak̚˦˥", english: "cute", ron: true },
      { id: "l3-handsome", thai: "หล่อ", roman: "lɔː˨˩", english: "handsome", ron: true },
      { id: "l3-beautiful", thai: "สวย", roman: "sua̯j˩˩˦", english: "beautiful", ron: true },
      { id: "l3-ugly", thai: "ขี้เหร่", roman: "kʰiː˥˩.reː˨˩", english: "ugly", ron: true },
      { id: "l3-difficult", thai: "ยาก", roman: "jaːk̚˥˩", english: "difficult", ron: true },
      { id: "l3-easy", thai: "ง่าย", roman: "ŋaːj˥˩", english: "easy", ron: true },
      { id: "l3-interesting", thai: "น่าสนใจ", roman: "naː˥˩.son˩˩˦.t͡ɕaj˧", english: "interesting", ron: true },
      { id: "l3-boring", thai: "น่าเบื่อ", roman: "naː˥˩.bɯa̯˨˩", english: "boring", ron: true },
      { id: "l3-fun", thai: "สนุก", roman: "sa˨˩.nuk̚˨˩", english: "fun", ron: true },
      { id: "l3-cheap", thai: "ถูก", roman: "tʰuːk̚˨˩", english: "cheap", ron: true },
      { id: "l3-be", thai: "เป็น", roman: "pen˧", english: "be / am / is / are", ron: true },
      { id: "l3-not-be", thai: "ไม่ใช่", roman: "maj˥˩.t͡ɕʰaj˥˩", english: "not be / is not", ron: true },
      { id: "l3-teacher", thai: "ครู", roman: "kʰruː˧", english: "teacher", ron: true },
      { id: "l3-polite-male", thai: "ครับ", roman: "kʰrap̚˦˥", english: "polite particle for male speakers", ron: true }
    ]
  },
  {
    id: "lesson4",
    title: "Lesson 4 (Cho PDF)",
    source: "Cho(2).pdf, pages 1-15",
    words: [
      { id: "l4-today", thai: "วันนี้", roman: "wan˧.niː˦˥", english: "today" },
      { id: "l4-yesterday", thai: "เมื่อวาน", roman: "mɯa̯˥˩.waːn˧", english: "yesterday" },
      { id: "l4-tomorrow", thai: "พรุ่งนี้", roman: "pʰruŋ˥˩.niː˦˥", english: "tomorrow" },
      { id: "l4-talk", thai: "คุย", roman: "kʰuj˧", english: "talk", ron: true },
      { id: "l4-with", thai: "กับ", roman: "kap̚˨˩", english: "with", ron: true },
      { id: "l4-meet", thai: "เจอ", roman: "t͡ɕɤː˧", english: "meet", ron: true },
      { id: "l4-what-else", thai: "อะไรอีก", roman: "ʔa˨˩.raj˧ ʔiːk̚˨˩", english: "what else" },
      { id: "l4-who-else", thai: "ใครอีก", roman: "kʰraj˧ ʔiːk̚˨˩", english: "who else" },
      { id: "l4-only-this", thai: "แค่นี้", roman: "kʰɛː˥˩ niː˦˥", english: "only this / that is all" },
      { id: "l4-you", thai: "คุณ", roman: "kʰun˧", english: "you", ron: true },
      { id: "l4-discount", thai: "ลด", roman: "lot̚˦˥", english: "reduce / discount", ron: true },
      { id: "l4-price", thai: "ราคา", roman: "raː˧.kʰaː˧", english: "price", ron: true },
      { id: "l4-can-question", thai: "ได้ไหม", roman: "daːj˥˩ maj˩˩˦", english: "can ...?" },
      { id: "l4-it", thai: "มัน", roman: "man˧", english: "it", ron: true },
      { id: "l4-want-object", thai: "เอา", roman: "ʔaw˧", english: "want / take (an object)", ron: true },
      { id: "l4-want-to", thai: "อยาก", roman: "jaːk̚˨˩", english: "want to", ron: true },
      { id: "l4-too", thai: "เกินไป", roman: "kɤːn˧.paj˧", english: "too / excessively" },
      { id: "l4-difficult", thai: "ยาก", roman: "jaːk̚˥˩", english: "difficult", ron: true },
      { id: "l4-boring", thai: "น่าเบื่อ", roman: "naː˥˩.bɯa̯˨˩", english: "boring", ron: true },
      { id: "l4-cute", thai: "น่ารัก", roman: "naː˥˩.rak̚˦˥", english: "cute", ron: true },
      { id: "l4-how-are-you", thai: "เป็นยังไงบ้าง", roman: "pen˧ jaŋ˧.ŋaj˧ baŋ˥˩", english: "how are you?" },
      { id: "l4-recently", thai: "ช่วงนี้", roman: "t͡ɕʰua̯ŋ˥˩ niː˦˥", english: "these days / recently" },
      { id: "l4-job", thai: "งาน", roman: "ŋaːn˧", english: "job / work", ron: true },
      { id: "l4-good", thai: "ดี", roman: "diː˧", english: "good", ron: true },
      { id: "l4-busy", thai: "ยุ่งมาก", roman: "juŋ˥˩ maːk̚˥˩", english: "very busy" },
      { id: "l4-tired", thai: "เหนื่อยมาก", roman: "nɯa̯j˨˩ maːk̚˥˩", english: "very tired" },
      { id: "l4-free", thai: "ว่างมาก", roman: "waːŋ˥˩ maːk̚˥˩", english: "have lots of free time" },
      { id: "l4-same", thai: "เหมือนเดิม", roman: "mɯa̯n˩˩˦ dɤːm˧", english: "same as before" },
      { id: "l4-nothing-special", thai: "ไม่มีอะไรพิเศษ", roman: "maj˥˩ miː˧ ʔa˨˩.raj˧ pʰi˦˥.seːt̚˨˩", english: "nothing special" },
      { id: "l4-and", thai: "และ", roman: "lɛʔ˦˥", english: "and", ron: true },
      { id: "l4-but", thai: "แต่", roman: "tɛː˨˩", english: "but", ron: true },
      { id: "l4-or", thai: "หรือ", roman: "rɯː˩˩˦", english: "or", ron: true },
      { id: "l4-healthy", thai: "ดีต่อสุขภาพ", roman: "diː˧ tɔː˨˩ suk̚˨˩.kʰa˨˩.pʰaːp̚˥˩", english: "good for health" },
      { id: "l4-especially", thai: "โดยเฉพาะ", roman: "doːj˧.t͡ɕʰa˨˩.pʰɔʔ˦˥", english: "especially" },
      { id: "l4-seafood", thai: "อาหารทะเล", roman: "ʔaː˧.haːn˩˩˦.tʰa˦˥.leː˧", english: "seafood" },
      { id: "l4-allergic", thai: "แพ้", roman: "pʰɛː˦˥", english: "be allergic to", ron: true },
      { id: "l4-normally", thai: "ปกติ", roman: "pa˨˩.ka˨˩.tiʔ˨˩", english: "normally" },
      { id: "l4-everyday", thai: "ทุกวัน", roman: "tʰuk̚˦˥.wan˧", english: "every day" },
      { id: "l4-sea", thai: "ทะเล", roman: "tʰa˦˥.leː˧", english: "sea", ron: true },
      { id: "l4-food", thai: "อาหาร", roman: "ʔaː˧.haːn˩˩˦", english: "food" },
      { id: "l4-chicken", thai: "ไก่", roman: "kaj˨˩", english: "chicken", ron: true },
      { id: "l4-egg", thai: "ไข่", roman: "kʰaj˨˩", english: "egg", ron: true },
      { id: "l4-egg-classifier", thai: "ฟอง", roman: "fɔːŋ˧", english: "classifier for eggs", ron: true },
      { id: "l4-crab", thai: "ปู", roman: "puː˧", english: "crab", ron: true },
      { id: "l4-fish", thai: "ปลา", roman: "plaː˧", english: "fish", ron: true },
      { id: "l4-shrimp", thai: "กุ้ง", roman: "kuŋ˥˩", english: "shrimp", ron: true },
      { id: "l4-squid", thai: "ปลาหมึก", roman: "plaː˧.mɯk̚˨˩", english: "squid" },
      { id: "l4-shellfish", thai: "หอย", roman: "hɔj˩˩˦", english: "shellfish", ron: true },
      { id: "l4-beef", thai: "เนื้อ", roman: "nɯa̯˦˥", english: "beef / meat", ron: true },
      { id: "l4-pork", thai: "หมู", roman: "muː˩˩˦", english: "pork", ron: true },
      { id: "l4-alone", thai: "คนเดียว", roman: "kʰon˧.dia̯w˧", english: "alone" },
      { id: "l4-delicious", thai: "อร่อย", roman: "ʔa˨˩.rɔj˨˩", english: "delicious", ron: true },
      { id: "l4-so", thai: "ดังนั้น", roman: "daŋ˧.nan˦˥", english: "so / therefore" },
      { id: "l4-instead", thai: "แทน", roman: "tʰɛːn˧", english: "instead", ron: true },
      { id: "l4-only", thai: "แค่", roman: "kʰɛː˥˩", english: "only", ron: true },
      { id: "l4-school", thai: "โรงเรียน", roman: "roːŋ˧.ria̯n˧", english: "school" },
      { id: "l4-student", thai: "นักเรียน", roman: "nak̚˦˥.ria̯n˧", english: "student" },
      { id: "l4-study", thai: "เรียน", roman: "ria̯n˧", english: "study / learn", ron: true },
      { id: "l4-holiday", thai: "วันหยุด", roman: "wan˧.jut̚˨˩", english: "holiday" },
      { id: "l4-i", thai: "ผม", roman: "pʰom˩˩˦", english: "I (male speaker)", ron: true },
      { id: "l4-my", thai: "ของผม", roman: "kʰɔːŋ˩˩˦ pʰom˩˩˦", english: "my (male speaker)" },
      { id: "l4-your", thai: "ของคุณ", roman: "kʰɔːŋ˩˩˦ kʰun˧", english: "your" },
      { id: "l4-what", thai: "อะไร", roman: "ʔa˨˩.raj˧", english: "what" },
      { id: "l4-who", thai: "ใคร", roman: "kʰraj˧", english: "who", ron: true },
      { id: "l4-eat", thai: "กิน", roman: "kin˧", english: "eat", ron: true },
      { id: "l4-do", thai: "ทำ", roman: "tʰam˧", english: "do", ron: true },
      { id: "l4-buy", thai: "ซื้อ", roman: "sɯː˦˥", english: "buy", ron: true },
      { id: "l4-how-much", thai: "เท่าไหร่", roman: "tʰaw˥˩.raj˨˩", english: "how much" },
      { id: "l4-phone", thai: "โทรศัพท์", roman: "tʰoː˧.ra˦˥.sap̚˨˩", english: "phone" },
      { id: "l4-this-one", thai: "อันนี้", roman: "ʔan˧.niː˦˥", english: "this one" },
      { id: "l4-this", thai: "นี้", roman: "niː˦˥", english: "this (before a noun in English)", ron: true },
      { id: "l4-think", thai: "คิด", roman: "kʰit̚˦˥", english: "think", ron: true },
      { id: "l4-cheap", thai: "ถูก", roman: "tʰuːk̚˨˩", english: "cheap", ron: true },
      { id: "l4-very", thai: "มาก", roman: "maːk̚˥˩", english: "very", ron: true },
      { id: "l4-expensive", thai: "แพง", roman: "pʰɛːŋ˧", english: "expensive", ron: true },
      { id: "l4-know", thai: "รู้", roman: "ruː˦˥", english: "know", ron: true },
      { id: "l4-bag", thai: "กระเป๋า", roman: "kra˨˩.paw˩˩˦", english: "bag" },
      { id: "l4-hat", thai: "หมวก", roman: "mua̯k̚˨˩", english: "hat", ron: true },
      { id: "l4-big", thai: "ใหญ่", roman: "jaj˨˩", english: "big", ron: true },
      { id: "l4-pants", thai: "กางเกง", roman: "kaːŋ˧.keːŋ˧", english: "pants" },
      { id: "l4-small", thai: "เล็ก", roman: "lek̚˦˥", english: "small", ron: true },
      { id: "l4-not", thai: "ไม่", roman: "maj˥˩", english: "not", ron: true },
      { id: "l4-ok", thai: "โอเค", roman: "ʔoː˧.kʰeː˧", english: "OK", ron: true },
      { id: "l4-like", thai: "ชอบ", roman: "t͡ɕʰɔːp̚˥˩", english: "like", ron: true },
      { id: "l4-not-yet", thai: "ยังไม่ได้กิน", roman: "jaŋ˧ maj˥˩.daj˥˩ kin˧", english: "have not eaten yet" },
      { id: "l4-hungry", thai: "หิว", roman: "hiw˩˩˦", english: "hungry", ron: true },
      { id: "l4-noodles", thai: "ก๋วยเตี๋ยว", roman: "kua̯j˩˩˦.tia̯w˩˩˦", english: "noodles" },
      { id: "l4-also", thai: "ด้วย", roman: "dua̯j˥˩", english: "also / too", ron: true }
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
  return state.display === "thai" ? `${currentLesson().title} / choose Thai script` : `${currentLesson().title} / choose IPA`;
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
    parsePreview.innerHTML = '<div class="preview-row">読み取れる行がありません。カンマ区切りで「タイ語, IPA, English」と入力してください。</div>';
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
