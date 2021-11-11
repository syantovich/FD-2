"use strict";

let scoreG = 0,
    scoreB = 0,
    score = document.createElement("div");
score.setAttribute("class", "score");
score.innerText = `${scoreG}:${scoreB}`;
document.body.appendChild(score);

let main = document.createElement("div");
main.setAttribute("class", "main");
let areaH = {
    width: 800,
    height: 500
};
main.style.width = areaH.width + "px";
main.style.height = areaH.height + "px";
document.body.appendChild(main);

score.style.width = areaH.width + "px";
let player = {
    width: areaH.width / 60,
    height: areaH.height / 3
};


let ballD = areaH.height / 20;
let speed=0;

var green = {
    posX: 0,
    posY: areaH.height / 2 - player.height / 2,
    speedX: 0,
    speedY: 0,
    width: ballD,
    height: ballD,

    update: function () {
        var greenElement = document.querySelector('.greenPlayer');
        greenElement.style.left = this.posX + "px";
        greenElement.style.top = this.posY + "px";
    }
};


var blue = {
    posX: areaH.width - player.width,
    posY: areaH.height / 2 - player.height / 2,
    speedX: 0,
    speedY: 0,
    width: ballD,
    height: ballD,

    update: function () {
        var blueElement = document.querySelector('.bluePlayer');
        blueElement.style.left = this.posX + "px";
        blueElement.style.top = this.posY + "px";
    }
};


var ballH = {
    posX: areaH.width / 2 - ballD / 2,
    posY: areaH.height / 2 - ballD / 2,
    speedX: 0,
    speedY: 0,
    accel:1.1,
    width: ballD,
    height: ballD,

    update: function () {
        var ballElem = document.querySelector('.ball');
        ballElem.style.left = this.posX + "px";
        ballElem.style.top = this.posY + "px";
    }
};


function createEl() {
    main.innerHTML = "";
    let bluePlayer = document.createElement("div");
    bluePlayer.setAttribute("class", "bluePlayer");
    bluePlayer.style.width = player.width + "px";
    bluePlayer.style.height = player.height + "px";
    main.appendChild(bluePlayer);

    let greenPlayer = document.createElement("div");
    greenPlayer.setAttribute("class", "greenPlayer");
    greenPlayer.style.width = player.width + "px";
    greenPlayer.style.height = player.height + "px";
    main.appendChild(greenPlayer);

    let ball = document.createElement("div");
    ball.setAttribute("class", "ball");
    ballH.posX = areaH.width / 2 - ballD / 2;
    ballH.posY = areaH.height / 2 - ballD / 2;
    ball.style.left = ballH.posX + "px";
    ball.style.top = ballH.posY + "px";
    ball.style.width = ball.style.height = ballD + "px";
    main.appendChild(ball);
}
createEl();

green.update();
blue.update();
ballH.update();
let interval = 0;

function getRandomInt(min, max) {
    do{
       min = Math.ceil(min);
        max = Math.floor(max); 
    }while(min==0 && max==0);
    
    
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
requestAnimationFrame(tick);
let tim=0;
let sub=document.querySelector("input");
sub.addEventListener("click",start);


function start() {
ballH.posX=areaH.width / 2 - ballD / 2;
    ballH.posY=areaH.height / 2 - ballD / 2;
    ballH.speedX = getRandomInt(-5, 5);
    ballH.speedY = getRandomInt(-5, 5);    
    speed=Math.sqrt(ballH.speedY*ballH.speedY+ballH.speedX*ballH.speedX);
    
}

function tick() {
   
    let ball = document.querySelector(".ball");
    let greenPlayer = document.querySelector(".greenPlayer");
    let bluePlayer = document.querySelector(".bluePlayer");
    ballH.posX += ballH.speedX;

    if (blue.posY + player.height + blue.speedY > areaH.height) {
        blue.posY = areaH.height - player.height;}else{if(blue.posY+blue.speedY<0){blue.posY=0;}else
            {blue.posY+=blue.speedY;} 
        }
    blue.update();
    if (green.posY + player.height + green.speedY > areaH.height) {
        green.posY = areaH.height - player.height;}else{if(green.posY+green.speedY<0){green.posY=0;}else
            {green.posY+=green.speedY;} 
        }
    green.update();

    // вылетел ли мяч правее стены?
    if (ballH.posX + ballH.width > areaH.width - player.width && ball.offsetTop + ball.offsetHeight / 2 > blue.posY && ball.offsetTop + ball.offsetHeight / 2 < blue.posY + bluePlayer.offsetHeight) {
        ballH.speedX = -ballH.speedX;
        ballH.speedX*=ballH.accel;
        ballH.speedY*=ballH.accel;
        ballH.posX = areaH.width - ballH.width - player.width;
    } else {
        if (ballH.posX + ballH.width > areaH.width) {
            ballH.posX = areaH.width - ballH.width;
            ballH.speedX=ballH.speedY=0;
            ballH.update();
            scoreG++;
            score.innerText = `${scoreG}:${scoreB}`;
        }
    }
    // вылетел ли мяч левее стены?

    if (ballH.posX < player.width && ball.offsetTop + ball.offsetHeight / 2 > green.posY && ball.offsetTop + ball.offsetHeight / 2 < green.posY + greenPlayer.offsetHeight) {
        ballH.speedX = -ballH.speedX;
        ballH.speedX*=ballH.accel;
        ballH.speedY*=ballH.accel;
        ballH.posX = player.width;
    } else {
        if (ballH.posX < 0) {
            ballH.posX = 0;
            ballH.speedX=ballH.speedY=0;
            ballH.update();
            scoreB++;
            score.innerText = `${scoreG}:${scoreB}`;
        }
    }

    ballH.posY += ballH.speedY;
    // вылетел ли мяч ниже пола?
    if (ballH.posY + ballH.height > areaH.height) {
        ballH.speedY = -ballH.speedY;
        ballH.posY = areaH.height - ballH.height;
    }
    // вылетел ли мяч выше потолка?
    if (ballH.posY < 0) {
        ballH.speedY = -ballH.speedY;
        ballH.posY = 0;
    }

    requestAnimationFrame(tick);

    
    ballH.update();



}


document.addEventListener("keydown", shift);
document.addEventListener("keyup",unshift);

function shift(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    if (EO.keyCode === 17 ) {
        green.speedY=speed;
    }
    if (EO.keyCode === 16 ) {
        green.speedY=-speed;
    }
    if (EO.keyCode === 40 ) {
        blue.speedY=speed;
    }
    if (EO.keyCode === 38 ) {
        blue.speedY=-speed;
    }
}
function unshift(EO){
    EO = EO || window.event;
    EO.preventDefault();
    if (EO.keyCode === 17 ) {
        green.speedY=0;
    }
    if (EO.keyCode === 16 ) {
        green.speedY=-0;
    }
    if (EO.keyCode === 40 ) {
        blue.speedY=0;
    }
    if (EO.keyCode === 38 ) {
        blue.speedY=-0;
    }
}