"use strict";
let sub=document.querySelector("#submit");
sub.addEventListener("click",()=>{
    drawClock();
    function drawClock(){
    var d=+document.querySelector("#d").value;
    d=(d<300)?300:d;
    let hours=+document.querySelector("#select").value;
    let clockDiv=document.querySelector(".clock"),
        clockDivWidth=clockDiv.style.width=d+"px",
        clockDivHeight=clockDiv.style.height=d+"px";
        clockDiv.innerHTML="";

    let clockCan=document.createElement("canvas");
    clockCan.setAttribute("width",d);
    clockCan.setAttribute("height",d);
    clockCan.setAttribute("id","CAN");
    clockDiv.appendChild(clockCan);
    let cvs =clockCan.getContext('2d');

    let clock=document.querySelector("#clock");
    
    let r=d/2,
        x0=d/2,
        y0=d/2;
    
        cvs.beginPath();
        cvs.fillStyle="#fccb66";
        cvs.arc(x0,y0,r,0,Math.PI*2,false);
        cvs.fill();
        cvs.closePath();

    for(let i=0;i<hours;i++){
            let al=Math.PI*2/hours;
            cvs.beginPath();
            cvs.fillStyle="#46b483";
            cvs.arc(x0+(r-d/10)*Math.sin(al*i),y0-(r-d/10)*Math.cos(al*i),r/10,0,Math.PI*2,false);
            cvs.fill();
            cvs.closePath();

            cvs.fillStyle='black';
            cvs.font=`italic bold ${r*0.13}px Arial`;
            cvs.textAlign='center';
            cvs.fillText(`${(i==0)?hours:i}`,x0+(r-d/10)*Math.sin(al*i),y0-(r-d/10)*Math.cos(al*i)+d/40);
            cvs.closePath();

    }
        let time=new Date();
        var secondsDeg = 6 * (time.getSeconds()) ,//определяем по времени где должна быть стрелка секунд
        minutesDeg = 6 * (time.getMinutes() + (1 / 60) * time.getSeconds()),//определяем по времени где должна быть стрелка минут
        hoursDeg = 30 * (time.getHours() + (1 / 60) * time.getMinutes()); //определяем по времени где должна быть стрелка часов
        
        cvs.lineCap='round';
        cvs.lineWidth=r/20;
        cvs.beginPath();
        cvs.moveTo(x0,y0);
        cvs.lineTo(x0+r*0.3*Math.sin(hoursDeg*(Math.PI/180)),(y0-r*0.3*Math.cos(hoursDeg*(Math.PI/180))));
        cvs.stroke();
        cvs.closePath();


        cvs.lineCap='round';
        cvs.lineWidth=r/40;
        cvs.beginPath();
        cvs.moveTo(x0,y0);
        cvs.lineTo(x0+r*0.5*Math.sin(minutesDeg*(Math.PI/180)),(y0-r*0.5*Math.cos(minutesDeg*(Math.PI/180))));
        cvs.stroke();

        cvs.lineCap='round';
        cvs.lineWidth=r/80;
        cvs.beginPath();
        cvs.moveTo(x0,y0);
        cvs.lineTo(x0+r*0.7*Math.sin(secondsDeg*(Math.PI/180)),(y0-r*0.7*Math.cos(secondsDeg*(Math.PI/180))));
        cvs.stroke();
        cvs.closePath();

        cvs.fillStyle='black';
        cvs.font=`italic bold ${r*0.13}px Arial`;
        cvs.textAlign='center';
        let fullH=time.getHours();
        let fullM=(time.getMinutes()<10)?"0"+time.getMinutes():time.getMinutes();
        let fullS=(time.getSeconds()<10)?"0"+time.getSeconds():time.getSeconds();
        cvs.fillText(`${fullH}:${fullM}:${fullS}`,x0,y0-r/2.75);
        console.log(`${fullH}:${fullM}:${fullS}`);
        cvs.closePath();

    }


    


       let setTime=setTimeout(function run(){
        var time = new Date();
        var mSec = time.getMilliseconds();
        drawClock();
        setTimeout(run,1000-mSec+10);
      },1000);
});