"use strict";
let sub=document.querySelector("#submit");
let int=0;
sub.addEventListener("click",()=>{
    var d=+document.querySelector("#d").value;
    d=(d<300)?300:d;
    let hours=+document.querySelector("#select").value;
    let clockDiv=document.querySelector(".clock"),
        clockDivWidth=clockDiv.style.width=d+"px",
        clockDivHeight=clockDiv.style.height=d+"px";
        clockDiv.innerHTML="";

    let clockSvg=document.createElementNS("http://www.w3.org/2000/svg","svg");
    clockSvg.setAttribute("width",d);
    clockSvg.setAttribute("height",d);
    clockSvg.setAttribute("id","clock");
    clockDiv.appendChild(clockSvg);

    let clock=document.querySelector("#clock");
    
    let r=d/2,
        x0=d/2,
        y0=d/2;
    
    let circleMain=document.createElementNS("http://www.w3.org/2000/svg","circle");
        circleMain.setAttribute("fill","#fccb66");
        circleMain.setAttribute("cx",x0);
        circleMain.setAttribute("cy",y0);
        circleMain.setAttribute("r",r);
    clock.appendChild(circleMain);

    for(let i=0;i<hours;i++){

        let g=document.createElementNS("http://www.w3.org/2000/svg","g");
            clock.appendChild(g);

        let litleCircle=document.createElementNS("http://www.w3.org/2000/svg","circle"),
            al=Math.PI*2/hours;
        
        litleCircle.setAttribute("fill","#46b483");
        litleCircle.setAttribute("cx",x0+(r-d/10)*Math.sin(al*i));
        litleCircle.setAttribute("cy",y0-(r-d/10)*Math.cos(al*i));
        litleCircle.setAttribute("r",r/10);

        g.appendChild(litleCircle);
        
        let textHours=document.createElementNS("http://www.w3.org/2000/svg","text");
        textHours.setAttribute("x",x0+(r-d/10)*Math.sin(al*i));
        textHours.setAttribute("y",y0-(r-d/10)*Math.cos(al*i)+d/40);
        textHours.setAttribute("text-anchor",'middle');
        textHours.setAttribute('font-size', r*0.155);
        textHours.setAttribute('id', "textHours");
        textHours.textContent=(i==0)?hours:i;
        g.appendChild(textHours);
    }
        let hoursLine=document.createElementNS("http://www.w3.org/2000/svg","line");
        hoursLine.setAttribute("stroke","black");
        hoursLine.setAttribute("stroke-width",r/20);
        hoursLine.setAttribute("x1",x0);
        hoursLine.setAttribute("y1",y0);
        hoursLine.setAttribute("x2",x0);
        hoursLine.setAttribute("y2",y0*0.5);
        hoursLine.setAttribute("id","hoursLine");
        clock.appendChild(hoursLine);

        let minutesLine=document.createElementNS("http://www.w3.org/2000/svg","line");
        minutesLine.setAttribute("stroke","black");
        minutesLine.setAttribute("stroke-width",r/40);
        minutesLine.setAttribute("x1",x0);
        minutesLine.setAttribute("y1",y0);
        minutesLine.setAttribute("x2",x0);
        minutesLine.setAttribute("y2",y0*0.3);
        minutesLine.setAttribute("id","minutesLine");
        clock.appendChild(minutesLine);

        let secondsLine=document.createElementNS("http://www.w3.org/2000/svg","line");
        secondsLine.setAttribute("stroke","black");
        secondsLine.setAttribute("stroke-width",r/80);
        secondsLine.setAttribute("x1",x0);
        secondsLine.setAttribute("y1",y0);
        secondsLine.setAttribute("x2",x0);
        secondsLine.setAttribute("y2",y0*0.1);
        secondsLine.setAttribute("id","secondsLine");
        clock.appendChild(secondsLine);

        let date=document.createElementNS("http://www.w3.org/2000/svg","text");
        date.setAttribute("x",x0);
        date.setAttribute("y",y0-r/2.75);
        date.setAttribute('text-anchor', 'middle');
        date.setAttribute("font-size",r/5);
        date.setAttribute("id","date");
        clockSvg.appendChild(date);
        let time=new Date();
        var secondsDeg = 6 * time.getSeconds() - 6,//определяем по времени где должна быть стрелка секунд
        minutesDeg = 6 * (time.getMinutes() + (1 / 60) * time.getSeconds()),//определяем по времени где должна быть стрелка минут
        hoursDeg = 30 * (time.getHours() + (1 / 60) * time.getMinutes()); //определяем по времени где должна быть стрелка часов
        editTime();
    

    function editTime(){
        let time=new Date();
        secondsDeg += 6; //каждую секунду стрелка секунда будет двигать на 6 градусов
        minutesDeg += 6 * (1/60); //каждую секунду стрелка минута будет двигать на 6*(1/60) градусов
        hoursDeg+=360/hours/5 * (1/360); //каждую секунду стрелка часа будет двигать на 360/hours/5 градусов
    let hoursLine=document.querySelector("#hoursLine"),
        minutesLine=document.querySelector("#minutesLine"),
        secondsLine=document.querySelector("#secondsLine"),
        textHours=document.querySelector("#date");
    
    hoursLine.setAttribute("transform",`rotate(${hoursDeg} ${x0} ${y0})`);
    minutesLine.setAttribute("transform",`rotate(${minutesDeg} ${x0} ${y0})`);
    secondsLine.setAttribute("transform",`rotate(${secondsDeg} ${x0} ${y0})`);
    let fullH=time.getHours();
    let fullM=(time.getMinutes()<10)?"0"+time.getMinutes():time.getMinutes();
    let fullS=(time.getSeconds()<10)?"0"+time.getSeconds():time.getSeconds();
    let t=fullH+":"+fullM+":"+fullS;
    textHours.textContent=t;

    }
    if(!int){
        clearInterval(int);
        int=0;}
       let setTime=setInterval(editTime,1000);
       int=setTime;
});