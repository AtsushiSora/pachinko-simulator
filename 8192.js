function start8192(){

let game = 0;

while(true){

game++;

let r = Math.random();

if(r < 1/8192){

break;

}

}

document.getElementById("game").textContent = game;

document.getElementById("result").textContent =
"8192当選!";

}