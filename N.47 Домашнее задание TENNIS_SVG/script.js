let sizeText=50;

let scoreG = 0,
    scoreB = 0;

let speed=0;

let areaH = {
    width: 800,
    height: 500
};

let player = {
    width: areaH.width / 60,
    height: areaH.height / 3
};

let ballD = areaH.height / 20;

var green = {
    posX: 0,
    posY: areaH.height / 2 - player.height / 2,
    speedX: 0,
    speedY: 0,
    width: ballD,
    height: ballD,

    update: function () {
        var greenElement = document.querySelector('#greenPlayer');
        greenElement.setAttribute("y", this.posY );
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
        var blueElement = document.querySelector('#bluePlayer');
        blueElement.setAttribute("y", this.posY );
    }
};


var ballH = {
    posX: areaH.width / 2 - ballD / 2,
    posY: areaH.height / 2 - ballD / 2,
    speedX: 0,
    speedY: 0,
    accel:1.1,
    width: ballD/2,
    height: ballD/2,

    update: function () {
        var ballElem = document.querySelector('#ball');
        ballElem.setAttribute("cx",this.posX) ;
        ballElem.setAttribute("cy",this.posY) ;
    }
};

let butSVG=document.createElementNS("http://www.w3.org/2000/svg","svg");
butSVG.setAttribute("width","80");
butSVG.setAttribute("height","20");
butSVG.setAttribute("id","button");
document.body.appendChild(butSVG);

let rectBut=document.createElementNS("http://www.w3.org/2000/svg","rect");
rectBut.setAttribute("x","0");
rectBut.setAttribute("y","0");
rectBut.setAttribute("width","80");
rectBut.setAttribute("height","20");
rectBut.setAttribute("fill","#d9dad4");

butSVG.appendChild(rectBut);


let textStart=document.createElementNS("http://www.w3.org/2000/svg","text");
textStart.setAttribute("x","40");
textStart.setAttribute("y","15");
textStart.setAttribute("fill","black");
textStart.setAttribute("text-anchor","middle");
textStart.innerHTML="Старт";
butSVG.appendChild(textStart);
console.log(textStart);

let fullarea=document.createElementNS("http://www.w3.org/2000/svg","svg");
fullarea.setAttribute("width",areaH.width);
fullarea.setAttribute("height",areaH.height+sizeText);
fullarea.setAttribute("id","area");
document.body.appendChild(fullarea);


let area=document.createElementNS("http://www.w3.org/2000/svg","rect");
area.setAttribute("x","0");
area.setAttribute("y","0");
area.setAttribute("width",areaH.width);
area.setAttribute("height",areaH.height);
area.setAttribute("fill","#f0ee7f");

fullarea.appendChild(area);

let score=document.createElementNS("http://www.w3.org/2000/svg","text");
score.setAttribute("x",areaH.width/2);
score.setAttribute("y",areaH.height+sizeText/2);
score.setAttribute("font-size","30");
score.setAttribute("font-family","sans-serif");
score.setAttribute("fill","black");
score.setAttribute("text-anchor","middle");
score.innerHTML="0:0";
fullarea.appendChild(score);


let greenPlayer=document.createElementNS("http://www.w3.org/2000/svg","rect");
greenPlayer.setAttribute("x","0");
greenPlayer.setAttribute("y",areaH.height/2-player.height/2);
greenPlayer.setAttribute("width",player.width);
greenPlayer.setAttribute("height",player.height);
greenPlayer.setAttribute("fill","green");
greenPlayer.setAttribute("id","greenPlayer");

fullarea.appendChild(greenPlayer);

let bluePlayer=document.createElementNS("http://www.w3.org/2000/svg","rect");
bluePlayer.setAttribute("x",areaH.width-player.width);
bluePlayer.setAttribute("y",areaH.height/2-player.height/2);
bluePlayer.setAttribute("width",player.width);
bluePlayer.setAttribute("height",player.height);
bluePlayer.setAttribute("fill","#1a148f");
bluePlayer.setAttribute("id","bluePlayer");
fullarea.appendChild(bluePlayer);


let ball=document.createElementNS("http://www.w3.org/2000/svg","circle");
ball.setAttribute("cx",areaH.width/2);
ball.setAttribute("cy",areaH.height/2);
ball.setAttribute("r",ballD/2);
ball.setAttribute("fill","#f12036");
ball.setAttribute("id","ball");
fullarea.appendChild(ball);

function getRandomInt(min, max) {
    do{
       min = Math.ceil(min);
        max = Math.floor(max); 
    }while(min==0 && max==0);
    
    
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

requestAnimationFrame(tick);
let sub=document.querySelector("#button");
sub.addEventListener("click",start);


function start() {
    ballH.posX=areaH.width / 2 - ballD / 2;
        ballH.posY=areaH.height / 2 - ballD / 2;
        ballH.speedX = getRandomInt(-5, 5);
        ballH.speedY = getRandomInt(-5, 5);    
        speed=Math.sqrt(ballH.speedY*ballH.speedY+ballH.speedX*ballH.speedX);
        
    }


function tick() {
   
    let ball = document.querySelector("#ball");
    let greenPlayer = document.querySelector("#greenPlayer");
    let bluePlayer = document.querySelector("#bluePlayer");
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
    if (ballH.posX + ballH.width > areaH.width - player.width && ballH.posY> blue.posY && ballH.posY< blue.posY + player.height) {
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

            score.innerHTML = `${scoreG}:${scoreB}`;
        }
    }
    // вылетел ли мяч левее стены?

    if (ballH.posX-ballH.width < player.width && ballH.posY> green.posY && ballH.posY< green.posY + player.height) {
        ballH.speedX = -ballH.speedX;
        ballH.speedX*=ballH.accel;
        ballH.speedY*=ballH.accel;
        ballH.posX = player.width+ballH.width;
    } else {
        if (ballH.posX-ballH.width < 0) {
            ballH.posX = ballH.width;
            ballH.speedX=ballH.speedY=0;
            ballH.update();
            scoreB++;
            score.innerHTML = `${scoreG}:${scoreB}`;
        }
    }

    ballH.posY += ballH.speedY;
    // вылетел ли мяч ниже пола?
    if (ballH.posY + ballH.height > areaH.height) {
        
        ballH.posY = areaH.height - ballH.height;
        ballH.speedY = -ballH.speedY;
    }
    // вылетел ли мяч выше потолка?
    if (ballH.posY -ballH.height< 0) {
        ballH.speedY = -ballH.speedY;
        ballH.posY = ballH.height;
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