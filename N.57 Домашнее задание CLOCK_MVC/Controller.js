function ControlTime(){
    var myModel = null;
    var myField = null;

    this.start=function(model,field) {
        myModel=model;
        myField=field;
        this.clickStart();
        let start=myField.querySelector('#start');
        start.addEventListener('click',this.clickStart);
        
        
        let stop=myField.querySelector("#stop");
        stop.addEventListener("click",this.clickStop);
    };
    this.clickStart=function(){
        if(!myModel.timer){
            let x =new Date();
            let mSec=x.getMilliseconds()-7;
        myModel.timer=setInterval(myModel.updateTime,1000-mSec);
    }
    };
    this.clickStop=function(){
        if(myModel.timer){
            clearInterval(myModel.timer);
            myModel.timer=null;
        }
    };

}