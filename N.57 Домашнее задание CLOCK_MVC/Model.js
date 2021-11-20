function InitClock(d,utc){
    let self=this;
    self.diam=d+20;
    self.r=self.diam/2;
    self.x0=self.diam/2;
    self.y0=self.diam/2;
    self.al=Math.PI*2/12;
    var myView=null;
    self.timer=null;
    self.kolSec=6 *self.seconds ;
    self.kolMin= 6 * (self.minutes + (1 / 60) * self.seconds);
    self.kolHours=30 * (self.hours + (1 / 60) * self.minutes);


    self.start=function(view) {
        myView=view;
    };
    self.updateView=function() {
        if ( myView )
            myView.editTime();
    };

     self.updateTime= function(){
        self.currTime=new Date();
        self.hours=self.currTime.getUTCHours()+utc;
        self.minutes=self.currTime.getUTCMinutes();
        self.seconds=self.currTime.getUTCSeconds();
        self.kolSec=6 *self.seconds ;
        self.kolMin= 6 * (self.minutes + (1 / 60) * self.seconds);
        self.kolHours=30 * (self.hours + (1 / 60) * self.minutes);
        self.updateView();
     };
}
