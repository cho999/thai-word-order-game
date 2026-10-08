"use strict";
// Each round includes every requested classifier once. Use unambiguous nouns.
const CLASSIFIERS = [
  {roman:"Khruang",thai:"เครื่อง",usage:"Machines and appliances",emoji:"💻",noun:"Khomphiutoe",nounThai:"คอมพิวเตอร์",name:"computer",plural:"computers"},
  {roman:"Khan",thai:"คัน",usage:"Cars and bicycles",emoji:"🚗",noun:"Rot",nounThai:"รถ",name:"car",plural:"cars"},
  {roman:"Ruan",thai:"เรือน",usage:"Watches and clocks",emoji:"⌚",noun:"Naalikaa",nounThai:"นาฬิกา",name:"watch",plural:"watches"},
  {roman:"Ruang",thai:"เรื่อง",usage:"Movies and stories",emoji:"🎬",noun:"Nang",nounThai:"หนัง",name:"movie",plural:"movies"},
  {roman:"Daam",thai:"ด้าม",usage:"Pens and tools with handles",emoji:"🖊️",noun:"Paakkaa",nounThai:"ปากกา",name:"pen",plural:"pens"},
  {roman:"Lem",thai:"เล่ม",usage:"Books and notebooks",emoji:"📕",noun:"Nansuu",nounThai:"หนังสือ",name:"book",plural:"books"},
  {roman:"Khon",thai:"คน",usage:"People",emoji:"🧑",noun:"Khon",nounThai:"คน",name:"person",plural:"people"},
  {roman:"An",thai:"อัน",usage:"Small objects",emoji:"🔑",noun:"Kunchae",nounThai:"กุญแจ",name:"key",plural:"keys"},
  {roman:"Bai",thai:"ใบ",usage:"Bags, hats, and containers",emoji:"👜",noun:"Krapao",nounThai:"กระเป๋า",name:"bag",plural:"bags"},
  {roman:"Tua",thai:"ตัว",usage:"Animals",emoji:"🐱",noun:"Meeo",nounThai:"แมว",name:"cat",plural:"cats"}
];
const NUMBERS = [null,{roman:"Nung",thai:"หนึ่ง"},{roman:"Song",thai:"สอง"},{roman:"Saam",thai:"สาม"},{roman:"Shii",thai:"สี่"},{roman:"Haa",thai:"ห้า"}];
const $ = id => document.getElementById(id);
function shuffle(values){const result=[...values];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
function makeQuestion(item){
  const count=1+Math.floor(Math.random()*5);
  const correct={noun:item.noun,number:NUMBERS[count].roman,classifier:item.roman};
  const other=shuffle(CLASSIFIERS.filter(x=>x!==item));
  const choices={
    noun:shuffle([item.noun,...other.slice(0,3).map(x=>x.noun)]),
    number:shuffle([NUMBERS[count].roman,...shuffle(NUMBERS.slice(1).filter(x=>x!==NUMBERS[count])).slice(0,3).map(x=>x.roman)]),
    classifier:shuffle([item.roman,...other.slice(0,3).map(x=>x.roman)])
  };
  return {item,count,choices,correct};
}
let questions=[],index=0,score=0,answered=false,mistakes=[],selected={};
function start(){questions=shuffle(CLASSIFIERS).map(makeQuestion);index=0;score=0;mistakes=[];$("quiz").hidden=false;$("result").hidden=true;render();}
function render(){
  answered=false;selected={};const {item,count,choices}=questions[index];
  $("progress").textContent=`Question ${index+1} / ${questions.length}`;$("score").textContent=`Correct ${score}`;$("bar").value=index;
  $("emoji").replaceChildren(...Array.from({length:count},()=>{const span=document.createElement("span");span.textContent=item.emoji;span.setAttribute("aria-hidden","true");return span;}));
  $("emoji").setAttribute("aria-label",`${count} ${count===1?item.name:item.plural}`);
  $("nounHint").textContent=`Emoji: ${item.name}`;$("feedback").replaceChildren();$("next").hidden=true;$("choices").replaceChildren();
  $("check").hidden=false;$("check").disabled=true;
  Object.entries(choices).forEach(([key,words])=>{
    const column=document.createElement("div");column.className="word-column";column.setAttribute("role","group");column.setAttribute("aria-label",{noun:"Noun",number:"Number",classifier:"Classifier"}[key]);
    words.forEach(word=>{const button=document.createElement("button");button.type="button";button.className="choice";button.textContent=word;button.dataset.key=key;button.dataset.word=word;button.setAttribute("aria-pressed","false");button.addEventListener("click",()=>{
      if(answered)return;selected[key]=word;
      [...column.children].forEach(el=>{const active=el===button;el.classList.toggle("selected",active);el.setAttribute("aria-pressed",String(active));});
      $("check").disabled=Object.keys(selected).length!==3;
    });column.append(button);});$("choices").append(column);
  });
}
function answer(){
  if(answered||Object.keys(selected).length!==3)return;answered=true;const {item,count,correct}=questions[index];
  const isCorrect=Object.keys(correct).every(key=>selected[key]===correct[key]);
  if(isCorrect)score++;else mistakes.push(questions[index]);
  [...$("choices").children].forEach(column=>[...column.children].forEach(el=>{el.disabled=true;if(el.dataset.word===correct[el.dataset.key])el.classList.add("correct");else if(el.dataset.word===selected[el.dataset.key])el.classList.add("wrong");}));
  $("check").hidden=true;
  const title=document.createElement("strong");title.textContent=isCorrect?"✓ Correct!":"Keep going! Here is the correct answer.";
  const reading=document.createElement("p");reading.textContent=`${item.noun} ${NUMBERS[count].roman} ${item.roman}`;
  const thai=document.createElement("p");thai.lang="th";thai.textContent=`${item.nounThai} ${NUMBERS[count].thai} ${item.thai}`;
  const explanation=document.createElement("p");explanation.textContent=`${count} ${count===1?item.name:item.plural}. Use ${item.roman} (${item.thai}) to count ${item.plural}.`;
  $("feedback").replaceChildren(title,reading,thai,explanation);$("score").textContent=`Correct ${score}`;$("bar").value=index+1;
  $("next").textContent=index===questions.length-1?"See results →":"Next question →";$("next").hidden=false;$("next").focus();
}
function finish(){
  $("quiz").hidden=true;$("result").hidden=false;$("resultScore").textContent=`${score} / ${questions.length}`;
  $("resultMessage").textContent=score===questions.length?"Perfect! You used all ten classifiers correctly.":"Review the combinations you missed, then try again.";
  $("review").replaceChildren();mistakes.forEach(({item,count})=>{const row=document.createElement("div");row.className="review-item";row.textContent=`${item.emoji.repeat(count)}　${item.noun} ${NUMBERS[count].roman} ${item.roman}`;const note=document.createElement("span");note.textContent=`${item.name} → ${item.thai} (${item.roman})`;row.append(note);$("review").append(row);});$("resultTitle").focus();
}
$("next").addEventListener("click",()=>{if(!answered)return;index++;if(index===questions.length)finish();else{render();$("prompt").focus();}});
$("retry").addEventListener("click",()=>{start();$("prompt").focus();});
$("check").addEventListener("click",answer);
CLASSIFIERS.forEach(item=>{const p=document.createElement("p");const title=document.createElement("strong");title.textContent=`${item.emoji} ${item.roman} / ${item.thai}`;p.append(title,document.createTextNode(item.usage));$("referenceList").append(p);});
start();
