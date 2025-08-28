
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
  // AAA
  cut:"자르다", hit:"치다", let:"~하게 하다", put:"놓다/두다", set:"놓다/설정하다", shut:"닫다",
  cost:"비용이 들다", hurt:"다치게 하다/아프다", burst:"터지다", spread:"퍼지다/펴다", split:"쪼개다",
  read:"읽다", quit:"그만두다", bet:"내기하다", cast:"던지다/배역 정하다",
  // ABB
  keep:"유지하다", sleep:"자다", feel:"느끼다", leave:"떠나다/남기다", meet:"만나다", send:"보내다",
  lend:"빌려주다", spend:"쓰다/보내다", build:"짓다", bring:"가져오다", buy:"사다",
  catch:"잡다", teach:"가르치다", think:"생각하다", sell:"팔다", tell:"말하다", say:"말하다",
  make:"만들다", have:"가지다", hear:"듣다", hold:"잡다/개최하다", sit:"앉다", stand:"서다",
  win:"이기다", lose:"지다/잃다", lead:"이끌다", find:"찾다", feed:"먹이를 주다", fight:"싸우다",
  hang:"걸다/매달다", seek:"찾다/추구하다", shoot:"쏘다",
  // ABA
  become:"~이 되다", come:"오다", run:"달리다", overcome:"극복하다",
  // ABC
  go:"가다", begin:"시작하다", drink:"마시다", ring:"울리다", sing:"노래하다", swim:"수영하다",
  shrink:"줄어들다", speak:"말하다", steal:"훔치다", break:"부수다/깨지다", choose:"선택하다",
  write:"쓰다", drive:"운전하다", ride:"타다", rise:"오르다/일어나다", fall:"떨어지다/넘어지다",
  fly:"날다", draw:"그리다/끌어당기다", see:"보다", take:"가져가다/데려가다", give:"주다",
  eat:"먹다", hide:"숨다/숨기다", forget:"잊다", forgive:"용서하다", forbid:"금지하다",
  wake:"깨다/깨우다", wear:"입다/착용하다", tear:"찢다", shake:"흔들다", freeze:"얼다/얼리다",
  bite:"물다", blow:"불다", grow:"자라다/기르다", know:"알다", throw:"던지다",
  show:"보여주다", prove:"증명하다", sew:"바느질하다", be:"~이다/있다", do:"하다",
  // REG (대표)
  walk:"걷다", work:"일하다", play:"놀다/연주하다", use:"사용하다", call:"전화하다/부르다", look:"보다",
  ask:"묻다/요청하다", need:"필요하다", move:"움직이다/이사하다", live:"살다", help:"돕다", talk:"말하다",
  turn:"돌다/돌리다", start:"시작하다", stop:"멈추다", plan:"계획하다", open:"열다", close:"닫다",
  change:"바꾸다", follow:"따르다", allow:"허락하다", add:"더하다", stay:"머무르다", reach:"도달하다",
  include:"포함하다", continue:"계속하다", learn:"배우다", watch:"보다/지켜보다", carry:"나르다/가지고 다니다",
  study:"공부하다", finish:"끝내다", wash:"씻다/세탁하다", paint:"그리다/페인트칠하다", cook:"요리하다",
  clean:"청소하다", rain:"비가 오다", snow:"눈이 오다", travel:"여행하다", visit:"방문하다", enjoy:"즐기다",
  hope:"희망하다", love:"사랑하다", like:"좋아하다", hate:"미워하다/싫어하다", miss:"그리워하다/놓치다",
  smile:"미소짓다", laugh:"웃다", cry:"울다", agree:"동의하다", decide:"결정하다", invite:"초대하다",
  answer:"대답하다", order:"주문하다/명령하다", save:"저축/구하다", cover:"덮다/취재하다",
  plant:"심다", climb:"오르다", jump:"뛰다", kick:"차다", guess:"추측하다", fix:"고치다/수리하다",
  point:"가리키다", push:"밀다", pull:"당기다", pack:"짐을 싸다", pick:"고르다/따다",
  print:"인쇄하다", promise:"약속하다", return:"돌아오다/반환하다", share:"공유하다", shout:"소리치다",
  smell:"냄새 맡다/냄새가 나다", touch:"만지다", wait:"기다리다", warn:"경고하다", wave:"손을 흔들다",
  yell:"고함치다", check:"확인하다", chase:"쫓다", count:"세다", cross:"건너다/십자표하다",
  cycle:"자전거 타다", deliver:"배달하다", design:"디자인하다/설계하다", dress:"옷을 입다/입히다",
  drop:"떨어뜨리다/떨어지다", earn:"벌다", end:"끝나다/끝내다", enter:"입장하다/입력하다",
  exercise:"운동하다", fill:"채우다", film:"촬영하다", fish:"낚시하다", greet:"인사하다", guide:"안내하다",
  handle:"다루다", hurry:"서두르다", improve:"개선하다", join:"가입하다/참가하다", knock:"노크하다",
  land:"착륙하다/내리다", mail:"우편으로 보내다", mark:"표시하다", match:"어울리다/경기하다",
  measure:"측정하다", notice:"알아차리다", phone:"전화하다", post:"우편/게시하다", prefer:"더 좋아하다",
  prepare:"준비하다", press:"누르다/언론", repair:"수리하다", report:"보고하다", sail:"항해하다",
  scare:"겁주다", score:"득점하다", search:"찾다/검색하다", skip:"건너뛰다", solve:"해결하다",
  sound:"~처럼 들리다", thank:"감사하다", type:"타이핑하다/유형", whisper:"속삭이다", worry:"걱정하다",
  arrive:"도착하다", attack:"공격하다", bake:"굽다", believe:"믿다", brush:"솔질/양치하다", camp:"야영하다",
  cancel:"취소하다", cheer:"응원하다", collect:"수집하다", compare:"비교하다", complete:"완성하다",
  control:"통제하다", copy:"복사하다", correct:"수정하다/옳게 하다", dance:"춤추다", date:"데이트/날짜 표기",
  decorate:"장식하다", describe:"묘사하다", discover:"발견하다", explain:"설명하다", fail:"실패하다",
  fold:"접다", gather:"모으다/모이다", grade:"성적 매기다", hand:"건네주다", identify:"식별하다",
  imagine:"상상하다", introduce:"소개하다", jog:"조깅하다", list:"목록 작성하다", listen:"듣다",
  march:"행진하다", name:"이름짓다", note:"메모하다", pass:"통과하다/건네주다", practice:"연습하다",
  protect:"보호하다", race:"경주하다", receive:"받다", record:"기록하다/녹음하다", reduce:"줄이다",
  remove:"제거하다", repeat:"반복하다", replace:"교체하다", rescue:"구조하다", roll:"구르다/말다",
  serve:"봉사/제공하다", shop:"쇼핑하다", ski:"스키 타다", smoke:"연기 나다/담배 피우다",
  start:"시작하다", test:"시험하다", tidy:"정돈하다", train:"훈련하다/기차로 가다",
  visit:"방문하다", wait:"기다리다", watch:"보다", work:"일하다", walk:"걷다", wash:"씻다", study:"공부하다",
  travel:"여행하다", organize:"조직하다", park:"주차하다", pour:"붓다"
};

/* =========================================================
   2) 동사 데이터(불규칙 + 규칙생성)
   ========================================================= */
const IRREG = [
  // AAA
  ["cut","cut","cut","AAA"],["hit","hit","hit","AAA"],["let","let","let","AAA"],["put","put","put","AAA"],
  ["set","set","set","AAA"],["shut","shut","shut","AAA"],["cost","cost","cost","AAA"],["hurt","hurt","hurt","AAA"],
  ["burst","burst","burst","AAA"],["spread","spread","spread","AAA"],["split","split","split","AAA"],
  ["read","read","read","AAA"],["quit","quit","quit","AAA"],["bet","bet","bet","AAA"],["cast","cast","cast","AAA"],
  // ABB
  ["keep","kept","kept","ABB"],["sleep","slept","slept","ABB"],["feel","felt","felt","ABB"],["leave","left","left","ABB"],
  ["meet","met","met","ABB"],["send","sent","sent","ABB"],["lend","lent","lent","ABB"],["spend","spent","spent","ABB"],
  ["build","built","built","ABB"],["bring","brought","brought","ABB"],["buy","bought","bought","ABB"],
  ["catch","caught","caught","ABB"],["teach","taught","taught","ABB"],["think","thought","thought","ABB"],
  ["sell","sold","sold","ABB"],["tell","told","told","ABB"],["say","said","said","ABB"],["make","made","made","ABB"],
  ["have","had","had","ABB"],["hear","heard","heard","ABB"],["hold","held","held","ABB"],["sit","sat","sat","ABB"],
  ["stand","stood","stood","ABB"],["win","won","won","ABB"],["lose","lost","lost","ABB"],["lead","led","led","ABB"],
  ["find","found","found","ABB"],["feed","fed","fed","ABB"],["fight","fought","fought","ABB"],
  ["hang","hung","hung","ABB"],["seek","sought","sought","ABB"],["shoot","shot","shot","ABB"],
  // ABA
  ["become","became","become","ABA"],["come","came","come","ABA"],["run","ran","run","ABA"],["overcome","overcame","overcome","ABA"],
  // ABC
  ["go","went","gone","ABC"],["begin","began","begun","ABC"],["drink","drank","drunk","ABC"],["ring","rang","rung","ABC"],
  ["sing","sang","sung","ABC"],["swim","swam","swum","ABC"],["shrink","shrank","shrunk","ABC"],["speak","spoke","spoken","ABC"],
  ["steal","stole","stolen","ABC"],["break","broke","broken","ABC"],["choose","chose","chosen","ABC"],
  ["write","wrote","written","ABC"],["drive","drove","driven","ABC"],["ride","rode","ridden","ABC"],["rise","rose","risen","ABC"],
  ["fall","fell","fallen","ABC"],["fly","flew","flown","ABC"],["draw","drew","drawn","ABC"],["see","saw","seen","ABC"],
  ["take","took","taken","ABC"],["give","gave","given","ABC"],["eat","ate","eaten","ABC"],["hide","hid","hidden","ABC"],
  ["forget","forgot","forgotten","ABC"],["forgive","forgave","forgiven","ABC"],["forbid","forbade","forbidden","ABC"],
  ["wake","woke","woken","ABC"],["wear","wore","worn","ABC"],["tear","tore","torn","ABC"],["shake","shook","shaken","ABC"],
  ["freeze","froze","frozen","ABC"],["bite","bit","bitten","ABC"],["blow","blew","blown","ABC"],["grow","grew","grown","ABC"],
  ["know","knew","known","ABC"],["throw","threw","thrown","ABC"],["show","showed","shown","ABC"],["prove","proved","proven","ABC"],
  ["sew","sewed","sewn","ABC"],["be","was/were","been","ABC"],["do","did","done","ABC"]
];

const REG_BASES = [
  "walk","work","play","use","call","look","ask","need","move","live","help","talk","turn","start","stop","plan","open","close",
  "change","follow","allow","add","stay","reach","include","continue","learn","watch","carry","study","finish","wash","paint",
  "cook","clean","rain","snow","travel","visit","enjoy","hope","love","like","hate","miss","smile","laugh","cry","agree",
  "decide","invite","answer","order","save","cover","plant","climb","jump","kick","guess","fix","point","push","pull","pack",
  "pick","print","promise","return","share","shout","smell","touch","wait","warn","wave","yell","check","chase","count","cross",
  "cycle","deliver","design","dress","drop","earn","end","enter","exercise","fill","film","fish","greet","guide","handle",
  "hurry","improve","join","knock","land","mail","mark","match","measure","notice","phone","post","prefer","prepare","press",
  "repair","report","sail","scare","score","search","skip","solve","sound","thank","type","whisper","worry","arrive","attack",
  "bake","believe","brush","camp","cancel","cheer","collect","compare","complete","control","copy","correct","dance","date",
  "decorate","describe","discover","explain","fail","fold","gather","grade","hand","identify","imagine","introduce","jog",
  "list","listen","march","name","note","pass","practice","protect","race","receive","record","reduce","remove","repeat",
  "replace","rescue","roll","serve","shop","ski","smoke","start","test","tidy","train","visit","wait","watch","work","walk",
  "wash","study","travel","organize","park","pour"
];

// 규칙 변환(미국식)
function makeRegular(base){
  const vowels="aeiou";
  const last = base.slice(-1);
  if(last==="e") return {base, past: base+"d", pp: base+"d", pattern:"REG"};
  if(last==="y" && !vowels.includes(base.slice(-2,-1))) return {base, past: base.slice(0,-1)+"ied", pp: base.slice(0,-1)+"ied", pattern:"REG"};
  const cvc = (w)=>{
    if(w.length<3 || w.length>5) return false;
    const c = x => !"aeiou".includes(x);
    const v = x => "aeiou".includes(x);
    const a=w[w.length-3], b=w[w.length-2], c3=w[w.length-1];
    const doubleable = "bdgklmnprt".includes(c3);
    return c(a)&&v(b)&&c(c3)&&doubleable;
  };
  if(cvc(base)) return {base, past: base+base.slice(-1)+"ed", pp: base+base.slice(-1)+"ed", pattern:"REG"};
  return {base, past: base+"ed", pp: base+"ed", pattern:"REG"};
}

// 합치고 의미(kr) 부여 + 중복 제거
const RAW=[]; const seenKey=new Set();
for(const [b,p,pp,pat] of IRREG){
  const key=`${b}|${p}|${pp}`; if(!seenKey.has(key)){ seenKey.add(key); RAW.push({base:b,past:p,pp:pp,pattern:pat,kr:KR[b]||"-"}); }
}
for(const b of REG_BASES){
  const r = makeRegular(b); const key=`${r.base}|${r.past}|${r.pp}`;
  if(!seenKey.has(key)){ seenKey.add(key); RAW.push({...r, kr:KR[r.base]||"-"}); }
}
const VERBS = RAW.slice(0, 210);

/* =========================================================
   3) 상태 & 오디오/TTS 준비
   ========================================================= */
let setSize = 20;
let setIndex = 0;
let currentSet = [];
let mode = 'study';

let iStudy = 0;
let lastUtters = [];

let qOrder = [];
let qi = 0;
let ok=0, no=0;
let wrongList = [];
let history = [];
let qLocked = false;

let patternTotals = {AAA:0, ABB:0, ABA:0, ABC:0, REG:0};
let patternCorrect = {AAA:0, ABB:0, ABA:0, ABC:0, REG:0};

// 효과음: 첫 터치 언락
function unlockAudioOnce() {
  ["sndCorrect","sndWrong"].forEach(id => {
    const a = document.getElementById(id); if(!a) return;
    a.muted = true; a.play().then(()=>{ a.pause(); a.currentTime=0; a.muted=false; }).catch(()=>{});
  });
  // TTS 웜업도 함께
  warmupTTS().catch(()=>{});
  window.removeEventListener("pointerdown", unlockAudioOnce);
}
window.addEventListener("pointerdown", unlockAudioOnce, { once:true });

function playSnd(isCorrect){
  const muted = $("#mute")?.checked; if(muted) return;
  const el = $(isCorrect ? "#sndCorrect" : "#sndWrong");
  if(!el) return; try{ el.currentTime = 0; el.play(); }catch(e){}
}

/* =========================================================
   3-1) TTS 모바일 안정화: 보이스 준비 & 웜업 (+진단 훅)
   ========================================================= */
const speakApi = window.speechSynthesis;
let voicesReady = false;
let ttsWarmed = false;
let voicesChangedCount = 0;

function logDiag(msg){ 
  const el = $('#dLog'); if(!el) return;
  const line = `[${new Date().toLocaleTimeString()}] ${msg}`;
  el.textContent += (el.textContent ? '\n' : '') + line;
  el.scrollTop = el.scrollHeight;
}

function waitVoices(timeoutMs=1500){
  return new Promise(resolve=>{
    const have = speakApi && speakApi.getVoices && speakApi.getVoices().length>0;
    if(have){ voicesReady = true; updateDiag(); resolve(true); return; }
    let done = false;
    const onChange = ()=>{
      if(done) return;
      if(speakApi.getVoices().length>0){ 
        done=true; voicesReady=true; voicesChangedCount++; 
        speakApi.removeEventListener('voiceschanged', onChange); 
        logDiag('voiceschanged fired; voices=' + speakApi.getVoices().length);
        updateDiag(); 
        resolve(true); 
      }
    };
    speakApi.addEventListener('voiceschanged', onChange, { once:true });
    setTimeout(()=>{ 
      if(!done){ 
        done=true; voicesReady = speakApi.getVoices().length>0; 
        logDiag('voices load timeout; voices=' + speakApi.getVoices().length); 
        updateDiag(); 
        resolve(voicesReady); 
      } 
    }, timeoutMs);
  });
}
function pickEnglishVoice(){
  const vs = (speakApi && speakApi.getVoices) ? speakApi.getVoices() : [];
  // 진단에서 보이스 강제 지정시 그 보이스 우선
  if($('#dOverride')?.checked){
    const sel = $('#dVoice');
    const idx = sel ? Number(sel.value) : -1;
    if(!isNaN(idx) && vs[idx]) return vs[idx];
  }
  let v = vs.find(v=>/en-US/i.test(v.lang) && /female|samantha|zoe|allison|aria|female/i.test(v.name));
  if(!v) v = vs.find(v=>/en-US/i.test(v.lang));
  if(!v) v = vs.find(v=>/en/i.test(v.lang));
  return v || null;
}
async function warmupTTS(){
  if(ttsWarmed) return;
  if(!window.speechSynthesis) return;
  await waitVoices(1500); // 가능하면 보이스 로드
  try{
    const u = new SpeechSynthesisUtterance("a"); // 아주 짧은 발화
    u.volume = 0.0; // 무음 웜업
    u.rate = 1.0; u.pitch = 1.0; u.lang = "en-US";
    const v = pickEnglishVoice(); if(v) u.voice = v;
    return new Promise(res=>{
      u.onend = ()=>{ ttsWarmed = true; updateDiag(); logDiag('warmup onend'); res(); };
      // iOS에서 onend 안 오는 경우 대비 타임아웃
      setTimeout(()=>{ if(!ttsWarmed){ ttsWarmed = true; updateDiag(); logDiag('warmup timeout'); res(); } }, 400);
      speakApi.cancel();
      logDiag('warmup speak()');
      speakApi.speak(u);
    });
  }catch(e){ ttsWarmed = true; updateDiag(); logDiag('warmup error: '+e); }
}

/* =========================================================
   4) 진행바/통계
   ========================================================= */
function updateStats(){
  const total = currentSet.length;
  const done = (mode==='quiz') ? (ok+no) : iStudy;
  $('#ok').textContent = ok;
  $('#no').textContent = no;
  $('#left').textContent = clamp(total - (mode==='quiz' ? (ok+no) : iStudy),0,999);
  $('#progTxt').textContent = `${done} / ${total}`;
  $('#bar').style.width = (total ? (done/total*100) : 0) + '%';
  $('#wcount').textContent = wrongList.length;
  renderHistory(); renderWrongs();
}

/* =========================================================
   5) 세트 구성/필터
   ========================================================= */
function buildSets(){
  setSize = parseInt($('#setSize').value,10)||20;
  const pf = $('#patternFilter').value;
  let list = VERBS.filter(v => pf==='all' ? true : v.pattern===pf);
  list = shuffle(list.slice());

  const total = Math.max(1, Math.ceil(list.length / setSize));
  if(setIndex >= total) setIndex = 0;
  $('#setIdx').textContent = setIndex+1;
  $('#setTotal').textContent = total;

  currentSet = list.slice(setIndex*setSize, setIndex*setSize + setSize);

  patternTotals = {AAA:0, ABB:0, ABA:0, ABC:0, REG:0};
  patternCorrect = {AAA:0, ABB:0, ABA:0, ABC:0, REG:0};
  currentSet.forEach(v => patternTotals[v.pattern]++);

  iStudy = 0; stopSpeak(); showStudyCard();

  ok = 0; no = 0; wrongList=[]; history=[];
  qi = 0; qOrder = shuffle([...currentSet.keys()]);
  showQuizCard(); updateStats();
}

/* =========================================================
   6) 학습(읽어주기) + 뜻 표시 (TTS 패치 + 로그)
   ========================================================= */
function highlight(which){
  ['Base','Past','PP'].forEach(k => $('#p'+k).classList.remove('hl'));
  if(which==='base') $('#pBase').classList.add('hl');
  if(which==='past') $('#pPast').classList.add('hl');
  if(which==='pp')   $('#pPP').classList.add('hl');
}
function stopSpeak(){
  try{
    if(lastUtters.length){ lastUtters.forEach(u=>u.onend=null); lastUtters=[]; }
    if(window.speechSynthesis) speechSynthesis.cancel();
    logDiag('speechSynthesis.cancel()');
  }catch(e){ logDiag('stopSpeak error: '+e); }
}
function showStudyCard(){
  if(currentSet.length===0){ $('#bWord').textContent='(빈 세트)'; return; }
  const v = currentSet[ clamp(iStudy,0,currentSet.length-1) ];
  $('#bWord').textContent = v.base;
  $('#pBase').textContent = v.base;
  $('#pPast').textContent = v.past;
  $('#pPP').textContent = v.pp;
  $('#krMeaning').textContent = `뜻: ${v.kr||KR[v.base]||'-'}`;
  highlight('none');
  $('#promptTag').textContent = '학습 카드';
}

// 모바일 안정화를 위한 async speak
async function speakTriple(v, rate=1.0, thenAuto=false){
  if(!window.speechSynthesis){ logDiag('no speechSynthesis'); return; }

  // 보이스 준비 + 웜업 (사용자 클릭 안에서 호출됨)
  await warmupTTS();
  await waitVoices(1200);

  // 발화 설정
  const voice = pickEnglishVoice();
  $('#dChosen').textContent = voice ? `${voice.name} (${voice.lang})` : '-';

  // 큐 초기화 및 아주 짧은 지연
  stopSpeak();
  await sleep(60);

  const u1 = new SpeechSynthesisUtterance(v.base);
  const u2 = new SpeechSynthesisUtterance(v.past.replace('/', ' or '));
  const u3 = new SpeechSynthesisUtterance(v.pp);

  [u1,u2,u3].forEach(u=>{
    u.rate = rate; u.pitch = 1; u.lang = "en-US";
    if(voice) u.voice = voice;
    u.onstart = ()=> logDiag('onstart: '+u.text);
    u.onerror = (e)=> logDiag('onerror: '+(e?.error||'unknown'));
    u.onend = ()=> logDiag('onend: '+u.text);
  });

  u1.onstart = ()=>{ highlight('base'); logDiag('start base'); };
  u2.onstart = ()=>{ highlight('past'); logDiag('start past'); };
  u3.onstart = ()=>{ highlight('pp'); logDiag('start pp'); };
  u3.onend = async ()=>{
    highlight('none');
    if($('#autoNext').checked && thenAuto){
      iStudy++;
      if(iStudy >= currentSet.length){
        onStudyComplete();
      }else{
        showStudyCard();
        await sleep(150);
        speakTriple(currentSet[iStudy], parseFloat($('#rate').value), true);
      }
      updateStats();
    }
  };

  lastUtters=[u1,u2,u3];
  logDiag('speak: '+u1.text); speechSynthesis.speak(u1);
  await sleep(20);
  logDiag('speak: '+u2.text); speechSynthesis.speak(u2);
  await sleep(20);
  logDiag('speak: '+u3.text); speechSynthesis.speak(u3);
}

function onStudyComplete(){
  showModal("수고하셨습니다!","이제 퀴즈를 풀어보세요. 아래 버튼을 누르면 객관식 퀴즈가 시작됩니다.","퀴즈 시작",()=>{
    setMode('quiz'); startQuizFresh();
  });
}

/* =========================================================
   7) 퀴즈 — 근사오답 생성기
   ========================================================= */
const VOWELS = "aeiou";
const isVowel = ch => VOWELS.includes(ch);
function doubleLastIfCVC(base){
  const n=base.length; if(n<3) return base+"ed";
  const a=base[n-3], b=base[n-2], c=base[n-1];
  const doubleable="bdgklmnprt".includes(c);
  if(!isVowel(a) && isVowel(b) && !isVowel(c) && doubleable) return base + c + "ed";
  return base + "ed";
}
function regularize(base){
  if(base.endsWith('e')) return base+"d";
  if(base.endsWith('y') && !isVowel(base.at(-2))) return base.slice(0,-1)+"ied";
  return doubleLastIfCVC(base);
}
function smallVowelMutate(w){
  const map={a:"e", e:"a", i:"e", o:"u", u:"o"};
  for(let i=0;i<w.length;i++){
    const ch=w[i];
    if(isVowel(ch)){ return w.slice(0,i)+(map[ch]||ch)+w.slice(i+1); }
  }
  return w + w.slice(-1);
}
function nearMissAAA(base,past,pp){
  const d1 = regularize(base);
  const d2 = base + base.slice(-1) + "ed";
  const d3 = base + "ed";
  return [
    {base, past:d1, pp:d1, ok:false},
    {base, past:d2, pp:d2, ok:false},
    {base, past:base, pp:d3, ok:false}
  ];
}
function nearMissABB(base,past,pp){
  const d1 = regularize(base);
  const d2 = past + "ed";
  return [
    {base, past:d1, pp:d1, ok:false},
    {base, past:past, pp:base, ok:false},
    {base, past: d2===past? smallVowelMutate(d2):d2, pp: d2===pp? smallVowelMutate(d2):d2, ok:false}
  ];
}
function nearMissABA(base,past,pp){
  const d1 = regularize(base);
  const d2 = {past:base, pp:past};
  const d3p = smallVowelMutate(past);
  return [
    {base, past:d1, pp:d1, ok:false},
    {base, past:d2.past, pp:d2.pp, ok:false},
    {base, past:d3p, pp:base, ok:false}
  ];
}
function nearMissABC(base,past,pp){
  const d1 = {past:past, pp:past};
  const d2 = {past:pp,   pp:pp};
  const d3 = {past:regularize(base), pp:pp};
  return [
    {base, past:d1.past, pp:d1.pp, ok:false},
    {base, past:d2.past, pp:d2.pp, ok:false},
    {base, past:d3.past, pp:d3.pp, ok:false}
  ];
}
function nearMissREG(base,past,pp){
  let d1 = past.replace(/ed$/,"ked"); if(d1===past) d1 = past + past.slice(-1);
  return [
    {base, past:d1, pp:d1, ok:false},
    {base, past: base+"ed", pp: base+"t", ok:false},
    {base, past: smallVowelMutate(past), pp: smallVowelMutate(pp), ok:false}
  ];
}
function makeNearMissOptions(v){
  const correct = {base:v.base, past:v.past, pp:v.pp, ok:true};
  let candidates=[];
  if(v.pattern==="AAA") candidates = nearMissAAA(v.base,v.past,v.pp);
  else if(v.pattern==="ABB") candidates = nearMissABB(v.base,v.past,v.pp);
  else if(v.pattern==="ABA") candidates = nearMissABA(v.base,v.past,v.pp);
  else if(v.pattern==="ABC") candidates = nearMissABC(v.base,v.past,v.pp);
  else candidates = nearMissREG(v.base,v.past,v.pp);

  const seen=new Set([`${correct.base}|${correct.past}|${correct.pp}`]);
  const outs=[correct];
  for(const c of candidates){
    const key = `${c.base}|${c.past}|${c.pp}`;
    if(!seen.has(key) && c.past && c.pp){ seen.add(key); outs.push(c); }
    if(outs.length>=4) break;
  }
  while(outs.length<4){
    const p2 = smallVowelMutate(v.past);
    const pp2 = smallVowelMutate(v.pp);
    const c = {base:v.base, past:p2, pp:pp2, ok:false};
    const key = `${c.base}|${c.past}|${c.pp}`;
    if(!seen.has(key)){ seen.add(key); outs.push(c); }
  }
  return shuffle(outs);
}

/* =========================================================
   8) 퀴즈 카드
   ========================================================= */
function showQuizCard(){
  $('#promptTag').textContent = '퀴즈';
  const box = $('#opts'); box.innerHTML = '';
  if(currentSet.length===0){ $('#qBase').textContent='(빈 세트)'; return; }
  if(qi >= qOrder.length){
    const total = currentSet.length; const acc = total? Math.round(ok/total*100) : 0;
    const body = `
      <div class="grid-2">
        <div><b>총 문항</b><br>${total}</div>
        <div><b>정답/오답</b><br>${ok} / ${no}</div>
      </div>
      <div style="margin-top:10px"><b>정확도</b> — ${acc}%</div>
      <div style="margin-top:10px"><b>패턴별 정답</b></div>
      <div class="grid-2" style="margin-top:6px">
        <div>AAA: ${patternCorrect.AAA}/${patternTotals.AAA}</div>
        <div>ABB: ${patternCorrect.ABB}/${patternTotals.ABB}</div>
        <div>ABA: ${patternCorrect.ABA}/${patternTotals.ABA}</div>
        <div>ABC: ${patternCorrect.ABC}/${patternTotals.ABC}</div>
        <div>REG: ${patternCorrect.REG}/${patternTotals.REG}</div>
      </div>
      <div class="small" style="margin-top:10px; opacity:.9">오른쪽 패널에서 오답만 다시 풀 수 있어요.</div>
    `;
    showModal("세트 완료!", body, "다음 세트로", ()=>{
      if($('#onlyWrong').checked && wrongList.length>0){
        currentSet = shuffle(wrongList.slice());
        setIndex = 0; ok=0; no=0; qi=0; history=[]; wrongList=[];
        patternTotals = {AAA:0, ABB:0, ABA:0, ABC:0, REG:0};
        patternCorrect = {AAA:0, ABB:0, ABA:0, ABC:0, REG:0};
        currentSet.forEach(v => patternTotals[v.pattern]++);
        qOrder = shuffle([...currentSet.keys()]);
        showQuizCard(); updateStats(); hideModal();
      }else{
        setIndex++; buildSets(); setMode('quiz'); hideModal();
      }
    });
    return;
  }

  const idxSet = qOrder[qi];
  const v = currentSet[idxSet];
  $('#qBase').textContent = v.base;

  const opts = makeNearMissOptions(v);
  qLocked = false;

  opts.forEach((o)=>{
    const div = document.createElement('div');
    div.className = 'opt';
    div.innerHTML = `<div class="t">${o.base} – ${o.past} – ${o.pp}</div>`;
    div.addEventListener('click', ()=>{
      if(qLocked) return;
      qLocked = true;

      const wasCorrect = o.ok===true;
      if(wasCorrect){
        ok++; history.unshift({base:v.base, past:v.past, pp:v.pp});
        patternCorrect[v.pattern] = (patternCorrect[v.pattern]||0)+1;
      }else{
        no++;
        if(!wrongList.some(w=>w.base===v.base && w.past===v.past && w.pp===v.pp)) wrongList.push(v);
      }
      updateStats();
      playSnd(wasCorrect);

      qi++;
      showQuizCard();
    });
    box.appendChild(div);
  });

  updateStats();
}

/* =========================================================
   9) 렌더링 보조
   ========================================================= */
function renderHistory(){
  const box = $('#history'); box.innerHTML='';
  history.slice(0,10).forEach(h=>{
    const s = document.createElement('span');
    s.className='chip'; s.textContent = `${h.base} → ${h.past} → ${h.pp}`;
    box.appendChild(s);
  });
}
function renderWrongs(){
  const box = $('#wrongs'); box.innerHTML='';
  wrongList.forEach(w=>{
    const s = document.createElement('span');
    s.className='chip'; s.textContent = `${w.base}/${w.past}/${w.pp}`;
    box.appendChild(s);
  });
}

/* =========================================================
   10) 화면 전환 / 이벤트
   ========================================================= */
function setMode(m){
  mode = m;
  if(mode==='study'){
    $('#screenStudy').classList.remove('hidden');
    $('#screenQuiz').classList.add('hidden');
    $('#promptTag').textContent = '학습 카드';
  }else{
    $('#screenQuiz').classList.remove('hidden');
    $('#screenStudy').classList.add('hidden');
    $('#promptTag').textContent = '퀴즈';
  }
  updateStats();
}
function startQuizFresh(){
  qi=0; ok=0; no=0; wrongList=[]; history=[];
  patternCorrect = {AAA:0, ABB:0, ABA:0, ABC:0, REG:0};
  qOrder = shuffle([...currentSet.keys()]);
  setMode('quiz'); showQuizCard(); updateStats();
}

// 옵션
$('#mode').addEventListener('change', e=> setMode(e.target.value));
$('#setSize').addEventListener('change', ()=>{ setIndex=0; buildSets(); });
$('#patternFilter').addEventListener('change', ()=>{ setIndex=0; buildSets(); });
$('#rate').addEventListener('input', e=> $('#spdTxt').textContent = e.target.value);

// 학습 버튼 (클릭 제스처 안에서 speakTriple 호출)
$('#btnPlay').addEventListener('click', async ()=>{
  if(currentSet.length===0) return;
  const v = currentSet[iStudy];
  await speakTriple(v, parseFloat($('#rate').value), false);
});
$('#btnRepeat').addEventListener('click', async ()=>{
  if(currentSet.length===0) return;
  const v = currentSet[iStudy];
  await speakTriple(v, parseFloat($('#rate').value), true);
});
$('#btnStop').addEventListener('click', stopSpeak);
$('#btnNext').addEventListener('click', ()=>{
  stopSpeak();
  iStudy++;
  if(iStudy>=currentSet.length){ onStudyComplete(); iStudy=currentSet.length; }
  else{ showStudyCard(); }
  updateStats();
});
$('#btnPrev').addEventListener('click', ()=>{
  stopSpeak();
  iStudy = Math.max(iStudy-1, 0);
  showStudyCard(); updateStats();
});

// 우측 패널
$('#btnStartStudy').addEventListener('click', ()=>{ setMode('study'); iStudy=0; showStudyCard(); updateStats(); });
$('#btnStartQuiz').addEventListener('click', ()=> startQuizFresh());
$('#btnNextSet').addEventListener('click', ()=>{ setIndex++; buildSets(); setMode($('#mode').value); });

// 하단
$('#btnReset').addEventListener('click', ()=>{ setIndex=0; buildSets(); setMode('study'); });
$('#btnWrongOnly').addEventListener('click', ()=>{
  if(wrongList.length===0){ alert('오답이 없습니다.'); return; }
  currentSet = shuffle(wrongList.slice());
  patternTotals = {AAA:0, ABB:0, ABA:0, ABC:0, REG:0};
  patternCorrect = {AAA:0, ABB:0, ABA:0, ABC:0, REG:0};
  currentSet.forEach(v => patternTotals[v.pattern]++);
  setIndex = 0; ok=0; no=0; qi=0; history=[];
  wrongList=[];
  qOrder = shuffle([...currentSet.keys()]);
  setMode('quiz'); showQuizCard(); updateStats();
});

/* =========================================================
   11) 모달
   ========================================================= */
function showModal(title, bodyHTML, actionText, actionFn){
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = bodyHTML;
  $('#btnModalAction').textContent = actionText || '확인';
  $('#btnModalAction').onclick = actionFn || hideModal;
  $('#btnModalClose').onclick = hideModal;
  $('#modal').classList.add('show');
}
function hideModal(){ $('#modal').classList.remove('show'); }

/* =========================================================
   12) 진단 패널 로직
   ========================================================= */
function formatVoices(){
  const vs = (speechSynthesis && speechSynthesis.getVoices) ? speechSynthesis.getVoices() : [];
  const lines = vs.map((v,i)=> `${i}. ${v.name}  [${v.lang}]  ${v.default ? '(default)' : ''}`).join('\n');
  $('#dVoices').textContent = lines || '(보이스 없음)';
  $('#dCount').textContent = String(vs.length);
  const sel = $('#dVoice'); if(!sel) return;
  sel.innerHTML = vs.map((v,i)=> `<option value="${i}">${i}. ${v.name} [${v.lang}] ${v.default?'(default)':''}</option>`).join('');
}
function updateDiag(){
  $('#dReady').textContent = String(voicesReady);
  $('#dWarmed').textContent = String(ttsWarmed);
  formatVoices();
}
function openDiag(){ $('#diag').classList.add('show'); updateDiag(); }
function closeDiag(){ $('#diag').classList.remove('show'); }

$('#btnDiag').addEventListener('click', openDiag);
$('#btnDiagClose').addEventListener('click', closeDiag);
$('#dRefresh').addEventListener('click', async ()=>{ 
  logDiag('manual refresh voices'); 
  await waitVoices(1000); 
  updateDiag(); 
});
$('#dWarm').addEventListener('click', async ()=>{ 
  logDiag('manual warmup'); 
  await warmupTTS(); 
  updateDiag(); 
});
$('#dStop').addEventListener('click', stopSpeak);
$('#dSayHello').addEventListener('click', async ()=>{
  await warmupTTS(); await waitVoices(1000);
  const v = pickEnglishVoice();
  const u = new SpeechSynthesisUtterance('hello');
  u.lang = 'en-US'; u.pitch = 1; u.rate = 1;
  if(v) u.voice = v;
  u.onstart = ()=>logDiag('hello onstart');
  u.onend = ()=>logDiag('hello onend');
  u.onerror = (e)=>logDiag('hello onerror: ' + (e?.error||'unknown'));
  speechSynthesis.speak(u);
});
$('#dSayTriple').addEventListener('click', async ()=>{
  if(!currentSet.length){ logDiag('no currentSet'); return; }
  const v = currentSet[iStudy];
  await speakTriple(v, parseFloat($('#rate').value)||1.0, false);
});
$('#dPlayCorrect').addEventListener('click', ()=>{ try{$('#sndCorrect').currentTime=0; $('#sndCorrect').play();}catch(_){} });
$('#dPlayWrong').addEventListener('click', ()=>{ try{$('#sndWrong').currentTime=0; $('#sndWrong').play();}catch(_){} });
$('#dCopy').addEventListener('click', async ()=>{
  try{
    await navigator.clipboard.writeText($('#dLog').textContent || '');
    alert('복사됐습니다.');
  }catch(e){ alert('클립보드 접근 실패'); }
});
$('#dClear').addEventListener('click', ()=> $('#dLog').textContent='');

/* voiceschanged 이벤트: 진단 표시 업데이트 */
if(window.speechSynthesis){
  speechSynthesis.addEventListener('voiceschanged', ()=>{
    voicesChangedCount++;
    logDiag('voiceschanged (global); count=' + speechSynthesis.getVoices().length);
    updateDiag();
  });
}

/* =========================================================
   13) 시작 + SW 등록
   ========================================================= */
window.addEventListener('DOMContentLoaded', ()=>{
  $('#spdTxt').textContent = $('#rate').value;
  buildSets();
  setMode('study');
  showStudyCard();
  updateStats();
  updateDiag();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
  }
});



