"use strict";
let allImg = document.querySelectorAll("img");
var z = 1;
allImg.forEach((e) => {
    let arrlefttop = [];
    allImg.forEach((newE, newi) => {
                    arrlefttop[newi] = {};
                    arrlefttop[newi].top = newE.offsetTop + "px";
                    arrlefttop[newi].left = newE.offsetLeft + "px";
                });
                allImg.forEach((newE, newI) => {
                newE.style.position = "absolute";
                newE.style.left = arrlefttop[newI].left;
                newE.style.top = arrlefttop[newI].top;
            });
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