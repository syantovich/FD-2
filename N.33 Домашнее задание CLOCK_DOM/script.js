"use strict";

let sub=document.querySelector("#submit");
var diam=0,
    hours=12;
let int=0;
sub.addEventListener("click",(e)=>{
    let     time=new Date(),
    secondsDeg = 6 * time.getSeconds() - 6,//определяем по времени где должна быть стрелка секунд
    minutesDeg = 6 * (time.getMinutes() + (1 / 60) * time.getSeconds()),//определяем по времени где должна быть стрелка минут
    hoursDeg = 30 * (time.getHours() + (1 / 60) * time.getMinutes()); //определяем по времени где должна быть стрелка часов

    let select=document.querySelector("#select"),
        d=document.querySelector("#d");
    diam=+d.value;
    if(diam<199){diam=200;}
    hours=+select.value;
    let clock=document.querySelector(".clock");
    clock.style.width=diam+"px";
    clock.style.height=diam+"px";
    let x0=diam/2;
    let y0=diam/2;//координаты центра часов 
    let small=diam/(hours/2);//диаметр маленьких кругов
    let fs=small/2;//размер шрифта цифр в круге
    let r=(diam-small*3/2)/2 ;//расстояние от центра круга до центра маленького;
    let al=Math.PI*2/hours;// деление угла
    clock.innerHTML="";
    for(let i=0;i<hours;i++){
        let numder=(i==0)?hours:i;
        let hoursSmall=document.createElement("div");
        hoursSmall.innerHTML=numder;
        hoursSmall.classList.add("s");
        hoursSmall.style.width=small+"px";
        hoursSmall.style.height=small+"px";
        hoursSmall.style.left=x0+r*Math.sin(al*i)-small/2+"px";
        hoursSmall.style.top=y0-r*Math.cos(al*i)-small/2+"px";
        hoursSmall.style.color="black";
        hoursSmall.style.fontSize=fs+"px";
        clock.appendChild(hoursSmall);
    }
    let arrowHours=document.createElement("div");
    let arrowMinutes=document.createElement("div");
    let arrowSeconds=document.createElement("div");
    let h=r/2,
        m=r-h/2,
        s=r;//высоты стрелок

    let hW="5px solid black",
        mW="3px solid black",
        sW="1px solid black";//Рамка каждой стрелки
    
    arrowHours.classList.add("arrow");
    arrowMinutes.classList.add("arrow");
    arrowSeconds.classList.add("arrow");
    arrowHours.style.height=h+"px";
    arrowMinutes.style.height=m+"px";
    arrowSeconds.style.height=s+"px";
    arrowHours.style.borderLeft=hW;
    arrowHours.style.bottom=x0+"px";
    arrowHours.style.right=y0+"px";
    arrowMinutes.style.bottom=x0+"px";
    arrowMinutes.style.right=y0+"px";
    arrowSeconds.style.bottom=x0+"px";
    arrowSeconds.style.right=y0+"px";
    arrowMinutes.style.borderLeft=mW;
    arrowSeconds.style.borderLeft=sW;
    clock.appendChild(arrowHours);
    clock.appendChild(arrowMinutes);
    clock.appendChild(arrowSeconds);

    
    let timeDiv =document.createElement("div");
    timeDiv.style.height=diam/12+"px";
    timeDiv.style.fontSize=diam/12+"px";
    timeDiv.style.position="absolute";
    timeDiv.style.right=x0-diam/6+"px";
    timeDiv.style.top=y0-diam/6+"px";
    timeDiv.style.color="red"; 
    clock.append(timeDiv);
    timenext();
    if(!int){
        clearInterval(int);
        int=0;}
       let setTime=setInterval(timenext,1000);
       int=setTime;

    
    function timenext(){
       let timeNow=new Date();
       secondsDeg += 6; //каждую секунду стрелка секунда будет двигать на 6 градусов
       minutesDeg += 6 * (1/60); //каждую секунду стрелка минута будет двигать на 6*(1/60) градусов
       hoursDeg+=360/hours/5 * (1/360); //каждую секунду стрелка часа будет двигать на 360/hours/5 градусов
       
       console.log(hoursDeg);
       arrowHours.style.transform=`rotate(${hoursDeg}deg)`;
       arrowMinutes.style.transform=`rotate(${minutesDeg}deg)`;
    arrowSeconds.style.transform=`rotate(${secondsDeg}deg)`;
    let fullH=timeNow.getHours();
    let fullM=(timeNow.getMinutes()<10)?"0"+timeNow.getMinutes():timeNow.getMinutes();
    let fullS=(timeNow.getSeconds()<10)?"0"+timeNow.getSeconds():timeNow.getSeconds();
    let t=fullH+":"+fullM+":"+fullS;
    console.log(t);

    timeDiv.innerHTML=t;
    
    }
    


    

});