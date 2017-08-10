import { text, scrollDelay, autoScrollDelay, scrollRevealConfig } from './config';
import {initScene,
  render,
  particles,
  ctx,
  canvas, 
  amount,
  mouse,
  lastPosX,
  lastPosY,
  lasttext,
  ww, 
  wh,
  densityFactor,
  radiusFactor,
  fontSizeFactor,
  Particle,
  onMouseClick,
  onMouseMove,
  onTouchMove,
  onMouseUp,
  onTouchEnd} from './particle-text';
import ScrollReveal from 'scrollreveal';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/fromEvent';


import '../css/style.css';
import '../scss/main.scss';





// change on scroll


window.sr = ScrollReveal();


var lock = true;
var textOnDisplay = 0;

setTimeout(() => { // prevent the user from scrolling too soon
  lock = false;
  console.log("init scene");
  initScene(text[0]);
  console.log("render scene");
  requestAnimationFrame(render);
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

},scrollDelay);








// scroll reveal

// window.sr = ScrollReveal();

window.onload = () => {

  // copy.addEventListener("keyup", initScene);
  window.addEventListener("resize", () => initScene(lasttext));
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("touchmove", onTouchMove);
  window.addEventListener("mouseup", onMouseUp);
  // window.addEventListener("click", onMouseClick);
  window.addEventListener("touchend", onTouchEnd);

  Observable.fromEvent(window,'mousewheel')
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


    scrollRevealConfig();
}
