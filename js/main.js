// Data
var text = [
  "Excel 2017",
  "#RedefiningLines",
  "Coming Soon.."
];


var scrollDelay = 2000; // delay for accepting the next scroll event
var autoScrollDelay = 3000;
// uncomment to override the defaults

 var colors = ["#913cca","#bb3d7b", "#d63f4a","#da3f43", "#cc3e5c"];
// var font = "Roboto"

// particle-text init

initScene(text[0]);
requestAnimationFrame(render);


// change on scroll


var lock = true;
var textOnDisplay = 0;

setTimeout(() => { // prevent the user from scrolling too soon
  lock = false;
},scrollDelay);



setInterval(() => {
  console.log("set interval!");
  // while(lock){
  //   console.log("while loop");
  // }
  if (lock === false){
    lock = true;
    textOnDisplay = (textOnDisplay + 1) % text.length;
    initScene(text[textOnDisplay]);
    setTimeout(() => { // prevent the user from scrolling too soon
      lock = false;
    },scrollDelay);
  }
},scrollDelay + autoScrollDelay);


Rx.Observable.fromEvent(window,'mousewheel')
  .map( e => e.wheelDelta > 0)
  .filter( () => lock === false )
  .subscribe( (delta) => {
    lock = true;
    var t = delta?(textOnDisplay > 1 ? textOnDisplay - 1: 0 ): (textOnDisplay < text.length -1? textOnDisplay + 1:textOnDisplay)
    console.log(delta,textOnDisplay);
    if (t != textOnDisplay){
      textOnDisplay = t;
      initScene(text[textOnDisplay]);
    }
    setTimeout(() => {
      lock = false;
    },scrollDelay);
  });


// scroll reveal

window.sr = ScrollReveal();

sr.reveal('#e2016',{ duration: 2000,origin: "bottom",distance: "100px"});
sr.reveal('#e2015',{ duration: 2000,delay: 200,origin: "bottom",distance: "100px"});
sr.reveal('#e2014',{ duration: 2000,delay: 400,origin: "bottom",distance: "100px"});

sr.reveal('.mec-logo',{ duration: 2000, origin:"left"});
sr.reveal('.excel-logo',{ duration: 2000, origin: "right"});
