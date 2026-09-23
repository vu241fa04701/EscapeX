const level=new URLSearchParams(location.search).get("level")||"easy";
const p=progress(); levelLabel.textContent=LEVEL_INFO[level].label; caseHeading.textContent=level.toUpperCase()+" CASE FILES";
caseGrid.innerHTML=CASES[level].map((c,i)=>{
 const unlocked=i===0||p[level].includes(CASES[level][i-1][0]);
 const done=p[level].includes(c[0]);
 return `<article class="case-card ${unlocked?"":"locked"}"><div class="icon">${c[1]}</div>${!unlocked?'<div class="lock">🔒</div>':""}
 <h2>${c[2]}</h2><p>${c[6]}</p><small>${done?"✓ COMPLETED":"3 Rooms · 9 Puzzles"}</small><br>
 ${unlocked?`<a class="btn primary" href="game.html?level=${level}&case=${c[0]}">${done?"PLAY AGAIN":"START CASE"} →</a>`:`<p>Complete the previous case to unlock.</p>`}</article>`}).join("");
