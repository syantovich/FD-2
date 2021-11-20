let clock1=new InitClock(300,-5);
let view1= new ShowTimeSVG();
let controller1=new ControlTime();
clock1.start(view1);
view1.start(clock1,document.querySelector("#clock1"));
controller1.start(clock1,document.querySelector("#clock1"));


let clock2=new InitClock(300,-4);
let view2= new ShowTimeDOM();
let controller2=new ControlTime();
clock2.start(view2);
view2.start(clock2,document.querySelector("#clock2"));
controller2.start(clock2,document.querySelector("#clock2"));

let clock3=new InitClock(300,-3);
let view3= new ShowTimeCANVAS();
let controller3=new ControlTime();
clock3.start(view3);
view3.start(clock3,document.querySelector("#clock3"));
controller3.start(clock3,document.querySelector("#clock3"));

let clock4=new InitClock(300,-2);
let view4= new ShowTimeSVG();
let controller4=new ControlTime();
clock4.start(view4);
view4.start(clock4,document.querySelector("#clock4"));
controller4.start(clock4,document.querySelector("#clock4"));

let clock5=new InitClock(300,-1);
let view5= new ShowTimeDOM();
let controller5=new ControlTime();
clock5.start(view5);
view5.start(clock5,document.querySelector("#clock5"));
controller5.start(clock5,document.querySelector("#clock5"));

let clock6=new InitClock(300,0);
let view6= new ShowTimeCANVAS();
let controller6=new ControlTime();
clock6.start(view6);
view6.start(clock6,document.querySelector("#clock6"));
controller6.start(clock6,document.querySelector("#clock6"));

