const p=progress();
progressBox.innerHTML=["easy","medium","hard"].map(l=>{let n=p[l].length,total=6,percent=n/total*100;
return `<div class="prog-row"><div class="prog-head"><b>${LEVEL_INFO[l].label}</b><span>${n}/6 Cases</span></div><div class="bar"><div class="fill" style="width:${percent}%"></div></div></div>`}).join("")+
`<hr><p><b>Total cases solved:</b> ${p.easy.length+p.medium.length+p.hard.length}/18</p>`;
resetBtn.onclick=()=>{if(confirm("Delete all EscapeX progress?")){localStorage.removeItem("escapex_progress");location.reload()}};
