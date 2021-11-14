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
};


var blue = {
    posX: areaH.width - player.width,
    posY: areaH.height / 2 - player.height / 2,
    speedX: 0,
    speedY: 0,
    width: ballD,
    height: ballD,
};


var ballH = {
    posX: areaH.width / 2 - ballD / 2,
    posY: areaH.height / 2 - ballD / 2,
    speedX: 0,
    speedY: 0,
    accel:1.1,
    width: ballD/2,
    height: ballD/2,
};

function drawTennis (){
    let clockCan=document.createElement("canvas");
    clockCan.setAttribute("width",areaH.width);
    clockCan.setAttribute("height",areaH.height+sizeText);
    clockCan.setAttribute("id","CAN");
    let game=document.querySelector(".game");
        game.innerHTML="";
        game.appendChild(clockCan);
    let cvs =clockCan.getContext('2d');

    cvs.beginPath();
    cvs.fillStyle='#f0ee7f';
    cvs.strokeRect(0,0,areaH.width,areaH.height);
    cvs.fillRect(0,0,areaH.width,areaH.height);
    cvs.closePath();

    cvs.beginPath();
    cvs.fillStyle='green';
    cvs.strokeRect(green.posX,green.posY,player.width,player.height);
    cvs.fillRect(green.posX,green.posY,player.width,player.height);
    cvs.closePath();

    cvs.beginPath();
    cvs.fillStyle='#1a148f';
    cvs.strokeRect(blue.posX,blue.posY,player.width,player.height);
    cvs.fillRect(blue.posX,blue.posY,player.width,player.height);
    cvs.closePath();

    cvs.beginPath();
    cvs.fillStyle='#f12036';
    cvs.arc(ballH.posX,ballH.posY, ballD/2, 0,Math.PI*2, false);
    cvs.fill();
    cvs.closePath();

    cvs.beginPath();
    cvs.fillStyle='black';
    cvs.textAlign='center';
    cvs.font='bold 28px Arial';
    cvs.fillText(`${scoreG}:${scoreB}`,areaH.width/2,areaH.height+sizeText);
}
drawTennis();


function getRandomInt(min, max) {
    do{
       min = Math.ceil(min);
        max = Math.floor(max); 
    }while(min==0 && max==0);
    
    
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

requestAnimationFrame(tick);
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
   
    ballH.posX += ballH.speedX;

    if (blue.posY + player.height + blue.speedY > areaH.height) {
        blue.posY = areaH.height - player.height;}else{if(blue.posY+blue.speedY<0){blue.posY=0;}else
            {blue.posY+=blue.speedY;} 
        }
    if (green.posY + player.height + green.speedY > areaH.height) {
        green.posY = areaH.height - player.height;}else{if(green.posY+green.speedY<0){green.posY=0;}else
            {green.posY+=green.speedY;} 
        }

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
            scoreG++;

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
            scoreB++;
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

    drawTennis();



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