let firstIMG = document.querySelector("img");
let newIMG = document.createElement("img");

newIMG.src = firstIMG.src;
newIMG.alt = firstIMG.alt;
newIMG.title = firstIMG.title;

firstIMG.parentNode.appendChild(newIMG);

newIMG.style.position = "absolute";
newIMG.style.left = firstIMG.getBoundingClientRect().left + "px";
newIMG.style.top = firstIMG.getBoundingClientRect().top + "px";
newIMG.style.width = firstIMG.getBoundingClientRect().width + "px";
newIMG.style.height = firstIMG.getBoundingClientRect().height + "px";


firstIMG.style.visibility = "hidden";
let over;
let img = {
    posX: newIMG.offsetLeft ,
    posY: newIMG.offsetTop ,
    X:newIMG.offsetLeft,
    Y:newIMG.offsetTop,
    width: newIMG.offsetWidth,
    height: newIMG.offsetHeight,
    w: newIMG.offsetWidth,
    h: newIMG.offsetHeight,

    update: function () {
        newIMG.style.left = this.posX + "px";
        newIMG.style.top = this.posY + "px";
        newIMG.style.width = this.width + "px";
        newIMG.style.height = this.height + "px";
    },

};
let sit = 0;
function move(EO) {
    EO = EO || window.event;
    let x = parseFloat(EO.target.style.left);
    let y = parseFloat(EO.target.style.top);
    let cY = EO.offsetY;
    let cX = EO.offsetX;
    
    if (cY < 5 && cX < 5) {
        newIMG.style.cursor = "nw-resize";
        sit = 1;
    } else {
        if (cY > EO.target.offsetHeight - 5 && cX > EO.target.offsetWidth - 5) {
            newIMG.style.cursor = "nw-resize";
            sit = 2;
        } else {
            if (cY < 5 && cX > EO.target.offsetWidth - 5) {
                newIMG.style.cursor = "ne-resize";
                sit = 3;
            } else {
                if (cY > EO.target.offsetHeight - 5 && cX < 5) {
                    newIMG.style.cursor = "ne-resize";
                    sit = 4;
                } else {
                    if (cX < 5) {
                        newIMG.style.cursor = "e-resize";
                        sit = 5;
                    } else {
                        if (cY < 5) {
                            newIMG.style.cursor = "s-resize";
                            sit = 6;
                        } else {
                            if (cY > EO.target.offsetHeight - 5) {
                                newIMG.style.cursor = "s-resize";
                                sit = 7;
                            } else {
                                if (cX > EO.target.offsetWidth - 5) {
                                    newIMG.style.cursor = "e-resize";
                                    sit = 8;
                                } else {
                                    newIMG.style.cursor = "default";
                                    sit = 0;
                                }
                            }

                        }
                    }
                }

            }
        }


    }
console.log(sit);
}

newIMG.addEventListener("mousedown", resize);

    function resize(e) {
        newIMG.removeEventListener("mouseover",over);
        newIMG.removeEventListener("mousemove", move);
        e = e || window.event;
        e.preventDefault();
        let x1 = e.x;
        let y1 = e.y;
        document.addEventListener("mousemove", r);
    
        function r(ev) {
            ev = ev || window.event;
            let x2 = ev.x;
            let y2 = ev.y;
            let z1=Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
            let z2=Math.sqrt(Math.pow(img.w,2)+Math.pow(img.h,2));
            
            let k=Math.sign(x1-x2)*z1/z2;
            if (sit == 5) {
                if((x2 - x1)>img.w){img.width=0;img.update();}else{img.width = img.w - (x2 - x1);
                img.posX=img.X-(x1 - x2);}
                img.update();
            }
            if(sit== 6){
                if((y2 - y1)>img.h){img.height=0;img.update();}else{img.height = img.h - (y2 - y1);
                img.posY=img.Y-(y1-y2);}
                img.update();
            }
            if (sit == 7) {
                if((y1 - y2)>img.h){img.height=0;img.update();}else{img.height = img.h - (y1 - y2);
                    img.posY=img.Y;}
                img.update();
            }
            if (sit == 8) {
                if((x1 - x2)>img.w){img.width=0;img.update();}else{img.width = img.w - (x1 - x2);
                img.posX=img.X;}
                img.update();
            }
            if( sit ==1){
                if(k<-1){
                    img.width=0;
                    img.height=0;
                    img.update();
                }else{
                    img.width = img.w + img.w*k;
                    img.height= img.h + img.h*k;
                    img.posX=img.X+img.w-img.width;
                    img.posY=img.Y+img.h-img.height;
                    img.update();
                }
            }
            if( sit ==3){
                if(k>1){
                    img.width=0;
                    img.height=0;
                    img.update();
                }else{
                    img.width = img.w - img.w*k;
                    img.height= img.h - img.h*k;
                    img.posY=img.Y+img.h-img.height;
                    img.update();
                }
            }
            if(sit==4){
                if(k<-1){
                    img.width=0;
                    img.height=0;
                    img.update();
                }else{
                    img.width = img.w + img.w*k;
                    img.height= img.h + img.h*k;
                    img.posX=img.X+img.w-img.width;
                    img.update();
                }
            }
            if(sit==2){
                if(k>1){
                    img.width=0;
                    img.height=0;
                    img.update();
                }else{
                    img.width = img.w - img.w*k;
                    img.height= img.h - img.h*k;
                    img.update();
                }
            }
            if (sit==0){img.posX=img.X+(x2-x1);
            img.posY=img.Y+(y2-y1);
        img.update();}
            console.log(img);
            
            
    
        }
        document.addEventListener("mouseup", function someF(e) {
            img.w=img.width;
            img.h=img.height;
            console.log(img);
            img.X=img.posX;
            img.Y=img.posY;
            newIMG.addEventListener("mousemove", move);
            document.removeEventListener("mousemove", r);
            document.removeEventListener("mouseup", someF);
        });
    
    }






    newIMG.addEventListener("mousemove", move);