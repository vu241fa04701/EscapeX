const r=JSON.parse(localStorage.getItem("escapex_result")||"null"); if(!r) location.href="levels.html";
icon.textContent=r.icon; title.textContent=r.caseTitle.toUpperCase()+" COMPLETE!"; ending.textContent=r.ending;
finalScore.textContent=r.score; usedHints.textContent=r.used;
let m=Math.floor(r.time/60),s=r.time%60;timeLeft.textContent=m+":"+String(s).padStart(2,"0");
const idx=CASES[r.level].findIndex(c=>c[0]===r.id);
if(idx<5){unlock.textContent="🔓 Next case unlocked!";nextBtn.href=`cases.html?level=${r.level}`;nextBtn.textContent="NEXT CASE →"}
else{unlock.textContent="🏆 You completed all "+r.level.toUpperCase()+" cases!";nextBtn.href="levels.html";nextBtn.textContent="CHOOSE ANOTHER LEVEL →"}
