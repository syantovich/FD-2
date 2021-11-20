function ShowTimeSVG(){
    let self =this;
        var myClock = null; // с какой моделью работаем
        var myParentClock = null; // внутри какого элемента DOM наша вёрстка

        self.start=function(clock,parent){
            myClock=clock;
            myParentClock=parent;
            self.create();
        };

        self.create=function (){
            myParentClock.parentNode.style.width=myClock.diam*3+"px";
            myParentClock.style.width=myClock.diam+"px";
            myParentClock.style.height=myClock.diam+"px";
            myParentClock.innerHTML="";
        
        let start=document.createElement("input");
        start.type="button";
        start.value="старт";
        start.id="start";
        myParentClock.appendChild(start);

        let stop=document.createElement("input");
        stop.type="button";
        stop.value="стоп";
        stop.id="stop";
        myParentClock.appendChild(stop);


    let clockSvg=document.createElementNS("http://www.w3.org/2000/svg","svg");
    clockSvg.setAttribute("width",myClock.diam);
    clockSvg.setAttribute("height",myClock.diam);
    clockSvg.setAttribute("id","clock");
    myParentClock.appendChild(clockSvg);

    let clock=clockSvg;
    
    
    let circleMain=document.createElementNS("http://www.w3.org/2000/svg","circle");
        circleMain.setAttribute("fill","#fccb66");
        circleMain.setAttribute("cx",myClock.x0);
        circleMain.setAttribute("cy",myClock.y0);
        circleMain.setAttribute("r",myClock.r);
    clock.appendChild(circleMain);

    for(let i=0;i<12;i++){

        let g=document.createElementNS("http://www.w3.org/2000/svg","g");
            clock.appendChild(g);

        let litleCircle=document.createElementNS("http://www.w3.org/2000/svg","circle");
        
        litleCircle.setAttribute("fill","#46b483");
        litleCircle.setAttribute("cx",myClock.x0+(myClock.r-myClock.diam/10)*Math.sin(myClock.al*i));
        litleCircle.setAttribute("cy",myClock.y0-(myClock.r-myClock.diam/10)*Math.cos(myClock.al*i));
        litleCircle.setAttribute("r",myClock.r/10);

        g.appendChild(litleCircle);
        
        let textHours=document.createElementNS("http://www.w3.org/2000/svg","text");
        textHours.setAttribute("x",myClock.x0+(myClock.r-myClock.diam/10)*Math.sin(myClock.al*i));
        textHours.setAttribute("y",myClock.y0-(myClock.r-myClock.diam/10)*Math.cos(myClock.al*i)+myClock.diam/40);
        textHours.setAttribute("text-anchor",'middle');
        textHours.setAttribute('font-size', myClock.r*0.155);
        textHours.setAttribute('id', "textHours");
        textHours.textContent=(i==0)?12:i;
        g.appendChild(textHours);
    }
        let hoursLine=document.createElementNS("http://www.w3.org/2000/svg","line");
        hoursLine.setAttribute("stroke","black");
        hoursLine.setAttribute("stroke-width",myClock.r/20);
        hoursLine.setAttribute("x1",myClock.x0);
        hoursLine.setAttribute("y1",myClock.y0);
        hoursLine.setAttribute("x2",myClock.x0);
        hoursLine.setAttribute("y2",myClock.y0*0.5);
        hoursLine.setAttribute("stroke-linecap","round");
        hoursLine.setAttribute("id","hoursLine");
        clock.appendChild(hoursLine);

        let minutesLine=document.createElementNS("http://www.w3.org/2000/svg","line");
        minutesLine.setAttribute("stroke","black");
        minutesLine.setAttribute("stroke-width",myClock.r/40);
        minutesLine.setAttribute("x1",myClock.x0);
        minutesLine.setAttribute("y1",myClock.y0);
        minutesLine.setAttribute("x2",myClock.x0);
        minutesLine.setAttribute("y2",myClock.y0*0.3);
        minutesLine.setAttribute("stroke-linecap","round");
        minutesLine.setAttribute("id","minutesLine");
        clock.appendChild(minutesLine);

        let secondsLine=document.createElementNS("http://www.w3.org/2000/svg","line");
        secondsLine.setAttribute("stroke","black");
        secondsLine.setAttribute("stroke-width",myClock.r/80);
        secondsLine.setAttribute("x1",myClock.x0);
        secondsLine.setAttribute("y1",myClock.y0);
        secondsLine.setAttribute("x2",myClock.x0);
        secondsLine.setAttribute("y2",myClock.y0*0.1);
        secondsLine.setAttribute("stroke-linecap","round");
        secondsLine.setAttribute("id","secondsLine");
        clock.appendChild(secondsLine);

        let date=document.createElementNS("http://www.w3.org/2000/svg","text");
        date.setAttribute("x",myClock.x0);
        date.setAttribute("y",myClock.y0-myClock.r/2.75);
        date.setAttribute('text-anchor', 'middle');
        date.setAttribute("font-size",myClock.r/5);
        date.setAttribute("id","date");
        clockSvg.appendChild(date);
        myClock.updateTime();
    };



    self.editTime=function (){
    let hoursLine=myParentClock.querySelector("#hoursLine"),
        minutesLine=myParentClock.querySelector("#minutesLine"),
        secondsLine=myParentClock.querySelector("#secondsLine"),
        textHours=myParentClock.querySelector("#date");
    
    hoursLine.setAttribute("transform",`rotate(${myClock.kolHours} ${myClock.x0} ${myClock.y0})`);
    minutesLine.setAttribute("transform",`rotate(${myClock.kolMin} ${myClock.x0} ${myClock.y0})`);
    secondsLine.setAttribute("transform",`rotate(${myClock.kolSec} ${myClock.x0} ${myClock.y0})`);
    let fullM=(myClock.minutes<10)?"0"+myClock.minutes:myClock.minutes;
    let fullS=(myClock.seconds<10)?"0"+myClock.seconds:myClock.seconds;
    let t=myClock.hours+":"+fullM+":"+fullS;
    textHours.textContent=t;

    };
}


function ShowTimeDOM(){
    let self =this;
        var myClock = null; // с какой моделью работаем
        var myParentClock = null; // внутри какого элемента DOM наша вёрстка

        self.start=function(clock,parent){
            myClock=clock;
            myParentClock=parent;
            self.create();
        };

        self.create=function (){

            
            let start=document.createElement("input");
            start.type="button";
            start.value="старт";
            start.id="start";
            myParentClock.appendChild(start);
    
            let stop=document.createElement("input");
            stop.type="button";
            stop.value="стоп";
            stop.id="stop";
            myParentClock.appendChild(stop);
            let clock=document.createElement("div");
            myParentClock.parentNode.style.width=myClock.diam*3+"px";
            clock.style.width=myClock.diam+"px";
            clock.style.height=myClock.diam+"px";
            clock.classList="clock";
            myParentClock.appendChild(clock);

    let x0=myClock.diam/2;
    let y0=myClock.diam/2;//координаты центра часов 
    let small=myClock.diam/(12/2);//диаметр маленьких кругов
    let fs=small/2;//размер шрифта цифр в круге
    let r=(myClock.diam-small*3/2)/2 ;//расстояние от центра круга до центра маленького;
    let al=Math.PI*2/12;// деление угла
    for(let i=0;i<12;i++){
        let numder=(i==0)?12:i;
        let hoursSmall=document.createElement("div");
        hoursSmall.innerHTML=numder;
        hoursSmall.style.position="absolute";
        hoursSmall.classList.add("s");
        hoursSmall.style.width=small+"px";
        hoursSmall.style.height=small+"px";
        hoursSmall.style.left=(x0+r*Math.sin(al*i)-small/2)+"px";
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

    let hW=`${y0*0.05}px solid black`,
        mW=`${y0*0.03}px solid black`,
        sW=`${y0*0.01}px solid black`;//Рамка каждой стрелки
    
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
    timeDiv.style.height=myClock.diam/12+"px";
    timeDiv.style.fontSize=myClock.diam/12+"px";
    timeDiv.style.position="absolute";
    timeDiv.style.right=x0-myClock.diam/6+"px";
    timeDiv.style.top=y0-myClock.diam/6+"px";
    timeDiv.style.color="red"; 
    timeDiv.id="timeDiv";
    clock.append(timeDiv);
    myClock.updateTime();
    };



    self.editTime=function (){
        let timeDiv=myParentClock.querySelector("#timeDiv");
        let arrow=myParentClock.querySelectorAll(".arrow");
        arrow[0].style.transform=`rotate(${myClock.kolHours}deg)`;
        arrow[1].style.transform=`rotate(${myClock.kolMin}deg)`;
     arrow[2].style.transform=`rotate(${myClock.kolSec}deg)`;
     let fullH=myClock.hours;
     let fullM=(myClock.minutes<10)?"0"+myClock.minutes:myClock.minutes;
     let fullS=(myClock.seconds<10)?"0"+myClock.seconds:myClock.seconds;
     let t=fullH+":"+fullM+":"+fullS;
 
     timeDiv.innerHTML=t;

    };
}


function ShowTimeCANVAS(){
    let self =this;
        var myClock = null; // с какой моделью работаем
        var myParentClock = null; // внутри какого элемента DOM наша вёрстка

        self.start=function(clock,parent){
            myClock=clock;
            myParentClock=parent;
            
            self.create();
        };

        self.create=function(){
            let start=document.createElement("input");
            start.type="button";
            start.value="старт";
            start.id="start";
            myParentClock.appendChild(start);
    
            let stop=document.createElement("input");
            stop.type="button";
            stop.value="стоп";
            stop.id="stop";
            myParentClock.appendChild(stop);
            let clockDiv=document.createElement("div");
            clockDiv.classList="canv";
            clockDiv.style.width=myClock.diam+"px",
            clockDiv.style.height=myClock.diam+"px";
            myParentClock.appendChild(clockDiv);
            myClock.updateTime();
            self.editTime();

        };

    self.editTime=function (){
        
        let clockDiv=myParentClock.querySelector(".canv")
            clockDiv.innerHTML="";


            
            
        myParentClock.appendChild(clockDiv);
        let clockCan=document.createElement("canvas");
        clockCan.setAttribute("width",myClock.diam);
        clockCan.setAttribute("height",myClock.diam);
        clockCan.setAttribute("id","CAN");
        clockDiv.appendChild(clockCan);
        let cvs =clockCan.getContext('2d');
    
        let clock=document.querySelector("#clock");
        
        
            cvs.beginPath();
            cvs.fillStyle="#fccb66";
            cvs.arc(myClock.x0,myClock.y0,myClock.r,0,Math.PI*2,false);
            cvs.fill();
            cvs.closePath();
    
        for(let i=0;i<12;i++){
                cvs.beginPath();
                cvs.fillStyle="#46b483";
                cvs.arc(myClock.x0+(myClock.r-myClock.diam/10)*Math.sin(myClock.al*i),myClock.y0-(myClock.r-myClock.diam/10)*Math.cos(myClock.al*i),myClock.r/10,0,Math.PI*2,false);
                cvs.fill();
                cvs.closePath();
    
                cvs.fillStyle='black';
                cvs.font=`italic bold ${myClock.r*0.13}px Arial`;
                cvs.textAlign='center';
                cvs.fillText(`${(i==0)?12:i}`,myClock.x0+(myClock.r-myClock.diam/10)*Math.sin(myClock.al*i),myClock.y0-(myClock.r-myClock.diam/10)*Math.cos(myClock.al*i)+myClock.diam/40);
                cvs.closePath();
    
        }
            
            cvs.lineCap='round';
            cvs.lineWidth=myClock.r/20;
            cvs.beginPath();
            cvs.moveTo(myClock.x0,myClock.y0);
            cvs.lineTo(myClock.x0+myClock.r*0.3*Math.sin(myClock.kolHours*(Math.PI/180)),(myClock.y0-myClock.r*0.3*Math.cos(myClock.kolHours*(Math.PI/180))));
            cvs.stroke();
            cvs.closePath();
    
    
            cvs.lineCap='round';
            cvs.lineWidth=myClock.r/40;
            cvs.beginPath();
            cvs.moveTo(myClock.x0,myClock.y0);
            cvs.lineTo(myClock.x0+myClock.r*0.5*Math.sin(myClock.kolMin*(Math.PI/180)),(myClock.y0-myClock.r*0.5*Math.cos(myClock.kolMin*(Math.PI/180))));
            cvs.stroke();
    
            cvs.lineCap='round';
            cvs.lineWidth=myClock.r/80;
            cvs.beginPath();
            cvs.moveTo(myClock.x0,myClock.y0);
            cvs.lineTo(myClock.x0+myClock.r*0.7*Math.sin(myClock.kolSec*(Math.PI/180)),(myClock.y0-myClock.r*0.7*Math.cos(myClock.kolSec*(Math.PI/180))));
            cvs.stroke();
            cvs.closePath();
    
            cvs.fillStyle='black';
            cvs.font=`italic bold ${myClock.r*0.13}px Arial`;
            cvs.textAlign='center';
            let fullH=myClock.hours;
            let fullM=(myClock.minutes<10)?"0"+myClock.minutes:myClock.minutes;
            let fullS=(myClock.seconds<10)?"0"+myClock.seconds:myClock.seconds;
            cvs.fillText(`${fullH}:${fullM}:${fullS}`,myClock.x0,myClock.y0-myClock.r/2.75);
            cvs.closePath();
            };
}
