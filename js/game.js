const q=new URLSearchParams(location.search), level=q.get("level")||"easy", id=q.get("case");
const info=getCase(level,id); if(!info) location.href="levels.html";
const [caseId,icon,caseTitle,themeClass,roomNames,ending]=info;
const cfg=LEVEL_INFO[level];
const sets=[
[
 ["🔢","Number Panel","3 → 6 → 12 → 24 → ?","48","Each number doubles.","🔢 Number Code"],
 ["🔤","Word Cabinet","Rearrange the letters: P A C E S E","escape","The word is the goal of this game.","🔤 Word Clue"],
 ["🕰️","Clock Dial","Roman numeral IX equals what number?","9","I=1 and X=10.","🕰️ Time Code"]
],
[
 ["🧩","Logic Board","If A=1, B=2, C=3, what is C + A + T?","24","C=3, A=1 and T=20.","🧩 Logic Token"],
 ["🎨","Colour Console","red, blue, green, red, blue, ?","green","The three-colour pattern repeats.","🎨 Green Token"],
 ["🔐","Cipher Lock","Reverse this word: RORRIM","mirror","Read it from right to left.","🔐 Mirror Key"]
],
[
 ["⚡","Power Terminal","7 + 3 × 2 = ?","13","Multiply before adding.","⚡ Power Fuse"],
 ["🧠","Memory Orb","MEMORY:red,blue,green,yellow","red,blue,green,yellow","Remember the four colours in order.","🧠 Memory Chip"],
 ["🚪","Exit Console","Password: FREE + DOM","freedom","Combine the two parts with no space.","🚪 Exit Authorization"]
]
];
let state={room:0,solved:[],score:1000,hints:cfg.hints,time:cfg.time,items:[],sound:true};
const store="escapex_state_"+level+"_"+id;
const old=JSON.parse(localStorage.getItem(store)||"null"); if(old) state=old;
function save(){localStorage.setItem(store,JSON.stringify(state))}
function roomPuzzles(){let shift=CASES[level].findIndex(x=>x[0]===id)%3; return sets[(state.room+shift)%3]}
function key(i){return state.room+"-"+i}
function solved(i){return state.solved.includes(key(i))}
function tone(ok){if(!state.sound)return;try{const c=new AudioContext(),o=c.createOscillator(),g=c.createGain();o.frequency.value=ok?720:180;g.gain.value=.05;o.connect(g);g.connect(c.destination);o.start();g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.18);o.stop(c.currentTime+.18)}catch(e){}}
function render(){
 document.body.dataset.theme=themeClass; caseName.textContent=icon+" "+caseTitle; theme.textContent=LEVEL_INFO[level].label+" · "+caseTitle;
 roomNum.textContent=(state.room+1)+"/3"; roomTitle.textContent=roomNames[state.room]; story.textContent=ending;
 room.className="room "+themeClass; score.textContent=state.score; hints.textContent=state.hints;
 inventory.innerHTML=state.items.length?state.items.map(x=>`<span class="item">${x}</span>`).join(""):"<small>No evidence yet.</small>";
 objects.innerHTML="";
 roomPuzzles().forEach((p,i)=>{let b=document.createElement("button");b.className="object "+(solved(i)?"solved":"");b.style.cssText=[ "left:13%;top:27%","left:47%;top:20%","left:76%;top:55%" ][i];
 b.innerHTML=p[0]+`<span class="label">${p[1]}</span>`;b.onclick=()=>openPuzzle(p,i);objects.appendChild(b)});
 showTime();
}
function openPuzzle(p,i){
 if(solved(i)) return show("<h2>Already solved</h2><p>You already collected this clue.</p>");
 let memory=p[2].startsWith("MEMORY:");
 let text=memory?`<div id="memorySeq" class="memory">🔴 🔵 🟢 🟡</div><p>Memorize the sequence, then type the colour names separated by commas.</p>`:`<p>${p[2]}</p>`;
 show(`<h2>${p[1]}</h2>${text}<input id="answer" placeholder="Your answer"><button id="submitAnswer" class="btn primary">SUBMIT ANSWER</button><p id="feedback" class="feedback"></p>`);
 if(memory)setTimeout(()=>{let x=document.getElementById("memorySeq");if(x)x.textContent="❓ ❓ ❓ ❓"},1700);
 submitAnswer.onclick=()=>{
  let a=answer.value.trim().toLowerCase().replace(/\s+/g,""), correct=p[3].toLowerCase().replace(/\s+/g,"");
  if(a===correct){tone(true);state.solved.push(key(i));state.items.push(p[5]);state.score+=100;save();feedback.innerHTML='<span class="correct">✓ Correct! Evidence collected.</span>';setTimeout(()=>{closeModal();checkRoom()},650)}
  else{tone(false);state.score=Math.max(0,state.score-25);save();feedback.innerHTML='<span class="wrong">✗ Wrong answer. -25 points</span>';render()}
 };
}
function checkRoom(){
 if(roomPuzzles().every((_,i)=>solved(i))){
   state.score+=200;
   if(state.room===2) completeCase();
   else{state.room++;save();show(`<h2>🔓 ROOM CLEARED!</h2><p>The next area opens...</p>`);setTimeout(()=>{closeModal();render()},900)}
 }else render();
}
function completeCase(){
 let p=progress(); if(!p[level].includes(id))p[level].push(id);saveProgress(p);
 const result={level,id,icon,caseTitle,ending,score:state.score,time:state.time,used:cfg.hints-state.hints};
 localStorage.setItem("escapex_result",JSON.stringify(result));localStorage.removeItem(store);location.href="results.html";
}
function show(x){modalContent.innerHTML=x;modal.classList.remove("hidden")}function closeModal(){modal.classList.add("hidden")}
closeBtn.onclick=closeModal;
hintBtn.onclick=()=>{let next=roomPuzzles().find((_,i)=>!solved(i));if(!next)return;if(state.hints<1)return show("<h2>No hints left</h2><p>Trust your detective skills.</p>");state.hints--;state.score=Math.max(0,state.score-50);save();show(`<h2>💡 Hint</h2><p>${next[4]}</p>`);render()};
restartBtn.onclick=()=>{if(confirm("Restart this case?")){localStorage.removeItem(store);location.reload()}};
soundBtn.onclick=()=>{state.sound=!state.sound;soundBtn.textContent=state.sound?"🔊":"🔇";save()};
function showTime(){let m=Math.floor(state.time/60),s=state.time%60;timer.textContent=m+":"+String(s).padStart(2,"0")}
setInterval(()=>{state.time--;if(state.time<=0){alert("TIME'S UP!");localStorage.removeItem(store);location.href=`cases.html?level=${level}`}save();showTime()},1000);
render();
