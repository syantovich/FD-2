"use strict";
let allImg = document.querySelectorAll("img");
var z = 1;
let pos=[];
setTimeout(()=>{    for(let i=allImg.length-1;i>-1;i--){
    pos[i]={};
    console.log(allImg[i].offsetTop);
    pos[i].left=allImg[i].offsetLeft+"px";
    pos[i].top=allImg[i].offsetTop+"px";
}
allImg.forEach((e,i)=>{
    e.style.position="absolute";
    e.style.left=pos[i].left;
    e.style.top=pos[i].top;
});},0);
allImg.forEach((e) => {
    function mousD(){
        let event=window.event;
        var x=0;
        var y=0;

            event.preventDefault();
            e.style.zIndex=z;
            z++;
            x =event.pageX - e.offsetLeft;
            y = event.pageY - e.offsetTop;
            function moveAt() {
                let pageX=window.event.pageX;
                let pageY=window.event.pageY;
                window.event.preventDefault();
                e.style.left = (pageX-x)+"px";
                e.style.top = (pageY-y)+"px";
                e.addEventListener("mouseout",(ev)=>{ev.preventDefault();});
            }
            document.addEventListener('mousemove', moveAt);
            e.addEventListener("mouseup",function someF(){ document.removeEventListener('mousemove', moveAt);e.removeEventListener("mouseup",someF);});
    }
    e.addEventListener("mousedown", mousD);

});

