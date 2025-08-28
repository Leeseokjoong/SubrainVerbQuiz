/* =========================================================
   0) 공통 도우미
   ========================================================= */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const shuffle = arr => { for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; };
const clamp = (n,min,max)=> Math.max(min, Math.min(max, n));
const sleep = (ms)=> new Promise(res=>setTimeout(res, ms));

/* =========================================================
   1) 의미(국문) 사전
   ========================================================= */
const KR = {
  cut:"자르다", hit:"치다", let:"~하게 하다", put:"놓다/두다", set:"놓다/설정하다", shut:"닫다",
  cost:"비용이 들다", hurt:"다치게 하다/아프다", burst:"터지다", spread:"퍼지다/펴다", split:"쪼개다",
  read:"읽다", quit:"그만두다", bet:"내기하다", cast:"던지다/배역 정하다",
  keep:"유지하다", sleep:"자다", feel:"느끼다", leave:"떠나다/남기다", meet:"만나다", send:"보내다",
  lend:"빌려주다", spend:"쓰다/보내다", build:"짓다", bring:"가져오다", buy:"사다",
  catch:"잡다", teach:"가르치다", think:"생각하다", sell:"팔다", tell:"말하다", say:"말하다",
  make:"만들다", have:"가지다", hear:"듣다", hold:"잡다/개최하다", sit:"앉다", stand:"서다",
  win:"이기다", lose:"지다/잃다", lead:"이끌다", find:"찾다", feed:"먹이를 주다", fight:"싸우다",
  hang:"걸다/매달다", seek:"찾다/추구하다", shoot:"쏘다",
  become:"~이 되다", come:"오다", run:"달리다", overcome:"극복하다",
  go:"가다", begin:"시작하다", drink:"마시다", ring:"울리다", sing:"노래하다", swim:"수영하다",
  shrink:"줄어들다", speak:"말하다", steal:"훔치다", break:"부수다/깨지다", choose:"선택하다",
  write:"쓰다", drive:"운전하다", ride:"타다", rise:"오르다/일어나다", fall:"떨어지다/넘어지다",
  fly:"날다", draw:"그리다/끌어당기다", see:"보다", take:"가져가다/데려가다", give:"주다",
  eat:"먹다", hide:"숨다/숨기다", forget:"잊다", forgive:"용서하다", forbid:"금지하다",
  wake:"깨다/깨우다", wear:"입다/착용하다", tear:"찢다", shake:"흔들다", freeze:"얼다/얼리다",
  bite:"물다", blow:"불다", grow:"자라다/기르다", know:"알다", throw:"던지다",
  show:"보여주다", prove:"증명하다", sew:"바느질하다", be:"~이다/있다", do:"하다",
  walk:"걷다", work:"일하다", play:"놀다/연주하다", use:"사용하다", call:"전화하다/부르다"
};

/* =========================================================
   2) 동사 데이터 (불규칙 + 규칙)
   ========================================================= */
const IRREG = [
  ["cut","cut","cut","AAA"],["hit","hit","hit","AAA"],["let","let","let","AAA"],
  ["put","put","put","AAA"],["set","set","set","AAA"],["shut","shut","shut","AAA"],
  ["meet","met","met","ABB"],["send","sent","sent","ABB"],["buy","bought","bought","ABB"],
  ["teach","taught","taught","ABB"],["think","thought","thought","ABB"],["build","built","built","ABB"],
  ["begin","began","begun","ABC"],["drink","drank","drunk","ABC"],["sing","sang","sung","ABC"],
  ["swim","swam","swum","ABC"],["break","broke","broken","ABC"],["choose","chose","chosen","ABC"],
  ["write","wrote","written","ABC"],["see","saw","seen","ABC"],["take","took","taken","ABC"],
  ["give","gave","given","ABC"],["eat","ate","eaten","ABC"],["hide","hid","hidden","ABC"],
  ["forgive","forgave","forgiven","ABC"],["wake","woke","woken","ABC"]
];

// 규칙형 동사 샘플
const REG_BASES = ["walk","work","play","use","call"];

function makeRegular(base){
  if(base.endsWith("e")) return {base,past:base+"d",pp:base+"d",pattern:"REG"};
  if(base.endsWith("y")) return {base,past:base.slice(0,-1)+"ied",pp:base.slice(0,-1)+"ied",pattern:"REG"};
  return {base,past:base+"ed",pp:base+"ed",pattern:"REG"};
}

const RAW=[]; const seen=new Set();
for(const [b,p,pp,pat] of IRREG){
  const key=`${b}|${p}|${pp}`;
  if(!seen.has(key)){ seen.add(key); RAW.push({base:b,past:p,pp,pattern:pat,kr:KR[b]||"-"}); }
}
for(const b of REG_BASES){
  const r=makeRegular(b); const key=`${r.base}|${r.past}|${r.pp}`;
  if(!seen.has(key)){ seen.add(key); RAW.push({...r,kr:KR[b]||"-"}); }
}
const VERBS=RAW;

/* =========================================================
   3) 상태 & 오디오
   ========================================================= */
let setSize=20,setIndex=0,currentSet=[],mode="study";
let iStudy=0, qOrder=[], qi=0, ok=0,no=0,wrongList=[],history=[];

/* =========================================================
   4) 진행바/통계
   ========================================================= */
function updateStats(){
  const total=currentSet.length;
  const done=(mode==="quiz")?(ok+no):iStudy;
  $("#ok").textContent=ok;
  $("#no").textContent=no;
  $("#left").textContent=Math.max(total-done,0);
  $("#progTxt").textContent=`${done} / ${total}`;
  $("#bar").style.width=(total?(done/total*100):0)+"%";
  $("#wcount").textContent=wrongList.length;
  renderHistory(); renderWrongs();
}

/* =========================================================
   5) 세트 구성
   ========================================================= */
function buildSets(){
  setSize=parseInt($("#setSize").value,10)||20;
  const pf=$("#patternFilter").value;
  let list=VERBS.filter(v=>pf==="all"?true:v.pattern===pf);
  list=shuffle(list.slice());
  const total=Math.max(1,Math.ceil(list.length/setSize));
  if(setIndex>=total) setIndex=0;
  $("#setIdx").textContent=setIndex+1;
  $("#setTotal").textContent=total;
  currentSet=list.slice(setIndex*setSize,setIndex*setSize+setSize);
  iStudy=0; ok=0; no=0; qi=0; wrongList=[]; history=[];
  showStudyCard(); updateStats();
}

/* =========================================================
   6) 학습 (읽어주기)
   ========================================================= */
function stopSpeak(){ try{speechSynthesis.cancel();}catch(e){} }
function showStudyCard(){
  if(currentSet.length===0){ $("#bWord").textContent="(빈 세트)"; return; }
  const v=currentSet[iStudy];
  $("#bWord").textContent=v.base;
  $("#pBase").textContent=v.base;
  $("#pPast").textContent=v.past;
  $("#pPP").textContent=v.pp;
  $("#krMeaning").textContent=`뜻: ${v.kr}`;
}

function speakTriple(v,rate=1.0){
  stopSpeak();
  const vs=[v.base,v.past,v.pp];
  vs.forEach((txt,i)=>{
    const u=new SpeechSynthesisUtterance(txt);
    u.lang="en-US"; u.rate=rate;
    if(i===0) u.onstart=()=>$("#pBase").classList.add("hl");
    if(i===1) u.onstart=()=>$("#pPast").classList.add("hl");
    if(i===2) u.onstart=()=>$("#pPP").classList.add("hl");
    u.onend=()=>[$("#pBase"),$("#pPast"),$("#pPP")].forEach(el=>el.classList.remove("hl"));
    speechSynthesis.speak(u);
  });
}

function onStudyComplete(){
  showModal("수고하셨습니다!","이제 퀴즈를 풀어보세요.","퀴즈 시작",()=>{
    setMode("quiz"); startQuizFresh();
  });
}

/* =========================================================
   7) 퀴즈
   ========================================================= */
function makeOptions(v){
  const correct={base:v.base,past:v.past,pp:v.pp,ok:true};
  return shuffle([correct,
    {base:v.base,past:v.past+"d",pp:v.pp+"d",ok:false},
    {base:v.base,past:v.past+"t",pp:v.pp+"t",ok:false},
    {base:v.base,past:v.base+"ed",pp:v.base+"ed",ok:false}
  ]);
}
function showQuizCard(){
  $("#promptTag").textContent="퀴즈";
  const box=$("#opts"); box.innerHTML="";
  if(currentSet.length===0){ $("#qBase").textContent="(빈 세트)"; return; }
  if(qi>=qOrder.length){
    showModal("세트 완료!",`${ok}문제 정답 / ${no}문제 오답`,"다음 세트",()=>{
      setIndex++; buildSets(); setMode("quiz"); hideModal();
    }); return;
  }
  const v=currentSet[qOrder[qi]]; $("#qBase").textContent=v.base;
  makeOptions(v).forEach(o=>{
    const div=document.createElement("div");
    div.className="opt"; div.innerHTML=`<div class="t">${o.base} – ${o.past} – ${o.pp}</div>`;
    div.addEventListener("click",()=>{
      if(o.ok) ok++; else{ no++; wrongList.push(v); }
      qi++; showQuizCard(); updateStats();
    });
    box.appendChild(div);
  });
  updateStats();
}

/* =========================================================
   8) 렌더링
   ========================================================= */
function renderHistory(){
  const box=$("#history"); box.innerHTML="";
  history.slice(0,10).forEach(h=>{
    const s=document.createElement("span");
    s.className="chip"; s.textContent=`${h.base} → ${h.past} → ${h.pp}`;
    box.appendChild(s);
  });
}
function renderWrongs(){
  const box=$("#wrongs"); box.innerHTML="";
  wrongList.forEach(w=>{
    const s=document.createElement("span");
    s.className="chip"; s.textContent=`${w.base}/${w.past}/${w.pp}`;
    box.appendChild(s);
  });
}

/* =========================================================
   9) 모드 전환 / 이벤트
   ========================================================= */
function setMode(m){
  mode=m;
  if(mode==="study"){ $("#screenStudy").classList.remove("hidden"); $("#screenQuiz").classList.add("hidden"); }
  else{ $("#screenQuiz").classList.remove("hidden"); $("#screenStudy").classList.add("hidden"); }
  updateStats();
}
function startQuizFresh(){ qi=0; ok=0; no=0; wrongList=[]; qOrder=shuffle([...currentSet.keys()]); showQuizCard(); }

/* =========================================================
   10) 모달
   ========================================================= */
function showModal(title,bodyHTML,actionText,actionFn){
  $("#modalTitle").textContent=title;
  $("#modalBody").innerHTML=bodyHTML;
  $("#btnModalAction").textContent=actionText||"확인";
  $("#btnModalAction").onclick=()=>{ if(actionFn) actionFn(); hideModal(); };
  $("#btnModalClose").onclick=hideModal;
  $("#modal").classList.add("show");
}
function hideModal(){ $("#modal").classList.remove("show"); }

/* =========================================================
   11) 이벤트 바인딩
   ========================================================= */
$("#mode").addEventListener("change",e=> setMode(e.target.value));
$("#setSize").addEventListener("change",()=>{ setIndex=0; buildSets(); });
$("#patternFilter").addEventListener("change",()=>{ setIndex=0; buildSets(); });
$("#rate").addEventListener("input",e=> $("#spdTxt").textContent=e.target.value);

$("#btnPlay").addEventListener("click",()=>{ if(currentSet.length) speakTriple(currentSet[iStudy],parseFloat($("#rate").value)); });
$("#btnRepeat").addEventListener("click",()=>{ if(currentSet.length) speakTriple(currentSet[iStudy],parseFloat($("#rate").value)); });
$("#btnStop").addEventListener("click",stopSpeak);
$("#btnNext").addEventListener("click",()=>{ stopSpeak(); iStudy++; if(iStudy>=currentSet.length) onStudyComplete(); else showStudyCard(); updateStats(); });
$("#btnPrev").addEventListener("click",()=>{ stopSpeak(); iStudy=Math.max(iStudy-1,0); showStudyCard(); updateStats(); });

$("#btnStartStudy").addEventListener("click",()=>{ setMode("study"); iStudy=0; showStudyCard(); updateStats(); });
$("#btnStartQuiz").addEventListener("click",()=> startQuizFresh());
$("#btnNextSet").addEventListener("click",()=>{ setIndex++; buildSets(); setMode($("#mode").value); });

$("#btnReset").addEventListener("click",()=>{ setIndex=0; buildSets(); setMode("study"); });
$("#btnWrongOnly").addEventListener("click",()=>{
  if(wrongList.length===0){ alert("오답이 없습니다."); return; }
  currentSet=shuffle(wrongList.slice()); wrongList=[]; ok=0; no=0; qi=0; history=[];
  qOrder=shuffle([...currentSet.keys()]); setMode("quiz"); showQuizCard(); updateStats();
});

/* =========================================================
   12) 초기 실행
   ========================================================= */
window.addEventListener("DOMContentLoaded",()=>{
  $("#spdTxt").textContent=$("#rate").value;
  buildSets();
  setMode("study");
  showStudyCard();
  updateStats();
});
