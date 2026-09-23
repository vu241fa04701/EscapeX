const CASES={
easy:[
["professor","🕵️","The Missing Professor","mansion",["Professor's Study","Secret Laboratory","Final Chamber"],"Find the missing professor before his mansion seals forever."],
["library","📚","The Locked Library","library",["Grand Reading Hall","Ancient Archives","Hidden Exit"],"Discover why the oldest library door was locked from the inside."],
["artist","🎨","The Artist's Secret","gallery",["Painting Studio","Colour Gallery","Private Vault"],"Follow a vanished artist's trail through living colours."],
["house","🏠","The Forgotten House","house",["Dusty Living Room","Family Corridor","Locked Basement"],"Uncover the final message left by a forgotten family."],
["train","🚂","The Last Train","train",["Platform Zero","Passenger Cabin","Engine Room"],"Find the truth before the midnight train reaches its final stop."],
["toy","🧸","The Toy Room Escape","toy",["Toy Workshop","Block Maze","Giant Playroom"],"A playful room hides a surprisingly clever exit."]
],
medium:[
["hotel","👻","The Haunted Hotel","haunted",["Abandoned Reception","Room 404","Underground Basement"],"Release the secret trapped inside the hotel."],
["museum","🏛️","The Lost Museum","museum",["Egyptian Gallery","Artifact Room","Museum Vault"],"Recover the artifact before the museum locks down."],
["lab","🧪","The Secret Laboratory","hospital",["Chemical Room","Experiment Chamber","Security Control"],"Stop the experiment and escape the restricted facility."],
["pirate","🏴‍☠️","The Pirate's Curse","pirate",["Captain's Cabin","Treasure Map Room","Hidden Sea Cave"],"Break an ancient curse and find the real treasure."],
["theatre","🎭","The Phantom Theatre","haunted",["Backstage","Costume Room","Main Stage"],"Solve the mystery behind the final performance."],
["time","⏳","The Time Traveler","space",["Ancient Past","Present Lab","Future Portal"],"Repair time itself before the portal collapses."]
],
hard:[
["space","🚀","Space Station Zero","space",["Station Control","Oxygen Chamber","Escape Pod Bay"],"Restore critical systems and launch before the station fails."],
["hospital","🏥","The Abandoned Hospital","hospital",["Emergency Ward","Surgery Room","Research Lab"],"Discover the experiment hidden beneath the hospital."],
["castle","🏰","The Cursed Castle","castle",["Royal Hall","Dark Dungeon","Wizard Tower"],"Break the curse guarding the castle's exit."],
["ai","🤖","The AI Takeover","space",["Server Room","Security Network","AI Core"],"Outsmart the system that has locked every door."],
["ship","🌊","The Sunken Ship","pirate",["Captain's Deck","Flooded Engine","Escape Chamber"],"Solve the ship's last mystery before the water rises."],
["genesis","🧬","Project Genesis","hospital",["DNA Laboratory","Research Wing","Containment Room"],"Contain the final experiment and escape Project Genesis."]
]
};
const LEVEL_INFO={easy:{label:"🟢 EASY · BEGINNER CASES",time:1200,hints:5},medium:{label:"🟡 MEDIUM · INTERMEDIATE CASES",time:1050,hints:3},hard:{label:"🔴 HARD · ADVANCED CASES",time:900,hints:2}};
function getCase(level,id){return CASES[level].find(c=>c[0]===id)}
function progress(){return JSON.parse(localStorage.getItem("escapex_progress")||'{"easy":[],"medium":[],"hard":[]}')}
function saveProgress(p){localStorage.setItem("escapex_progress",JSON.stringify(p))}
