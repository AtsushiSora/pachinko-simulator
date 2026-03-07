let game = 0;
let big = 0;
let reg = 0;

/* 1ゲーム回す */

function spin(){

const gogo = document.getElementById("gogo");
gogo.classList.remove("hit");

game++;

let r = Math.random();

/* 設定6確率 */

if(r < 1/255){

big++;
document.getElementById("result").textContent = "BIG!!";
gogo.classList.add("hit");

}else if(r < 2/255){

reg++;
document.getElementById("result").textContent = "REG";
gogo.classList.add("hit");

}else{

document.getElementById("result").textContent = "ハズレ";

}

document.getElementById("game").textContent = game;
document.getElementById("big").textContent = big;
document.getElementById("reg").textContent = reg;

let bonus = big + reg;

if(bonus > 0){

let rate = Math.floor(game / bonus);
document.getElementById("rate").textContent = "1/" + rate;

}

}

/* 1000ゲーム自動 */

function auto1000(){

for(let i = 0; i < 1000; i++){

spin();

}

}

/* 9000ゲーム自動 */

function auto9000(){

for(let i = 0; i < 9000; i++){

spin();

}

}

/* リセット */

function resetGame(){

game = 0;
big = 0;
reg = 0;

document.getElementById("game").textContent = 0;
document.getElementById("big").textContent = 0;
document.getElementById("reg").textContent = 0;
document.getElementById("rate").textContent = "-";

document.getElementById("result").textContent = "結果";

document.getElementById("gogo").classList.remove("hit");

}