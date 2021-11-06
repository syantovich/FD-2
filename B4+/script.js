let comper= function(w1,w2){
    let k=0;//Количество отличающихся букв
    if (typeof w1 !="string"||typeof w2 !="string"){return null;}//Проверка или пришли два слова
    let max=w2.length;// Находим максимальное по длине 
    if(w1.length>w2.length){
        max=w1.length;
    }
    for(let i=0;i<max;i++){
        if (w1[i]!=w2[i]){k++;}
    }
    return k;
}
let nextStep=function (cw,wa,tw){
    const maxl=wa.length;
    let allw=[];
    let allwIndex=[];
    for(let i=0;i<wa.length;i++){
        if(comper(cw,wa[i])==1){
            allw.push(wa[i]);
            allwIndex.push(i);
        }
    }
    if (allw.length==0){return null;}
    let best=[];
    for(let i=0;i<allw.length;i++){
        let w=allw[i];
        if(w==tw){
            return [cw,w];
        }
        if (comper(w,tw)==1){best.push(w);}
    let nextWA=[];
    for(let j=0;j<wa.length;j++){
nextWA[j]=wa[j];
    }
    nextWA.splice(allwIndex[i],1)
    let mass=nextStep(w,nextWA,tw);
        if(mass==null){
            continue;
        }else{mass.unshift(cw);
        if (mass.length){
            best=mass;
        };};
 

    }

    if(comper(best[0],cw)==1){best.push(tw)}
    return best;
} 

let wa=["ЛУЖА","МУЗА","ЛИРА","МЕХА","ЛИГА","ТАРА","ЛИПА","ТУРА","ПАРК","ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"];
console.log(nextStep("МУХА",wa,"СЛОН"));