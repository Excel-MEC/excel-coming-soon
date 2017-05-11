var colors = ["#468966","#FFF0A5", "#FFB03B","#B64926", "#8E2800"];
var font = "tahoma";
var canvas = document.querySelector("#scene"),
ctx = canvas.getContext("2d"),
particles = [],
amount = 0,
mouse = {x:0,y:0},
radius = 0.7;

var lastPosX = [];
var lastPosY = [];


var lasttext = ""; // for resize()
// var copy = document.querySelector("#copy");

var ww = canvas.width = window.innerWidth;
var wh = canvas.height = window.innerHeight;


var densityFactor =  ww > 768?150:130;
// var densityFactor = 130;
var fontSizeFactor = ww > 768?null:1.3;

var radiusFactor = ww > 768?2500:3000;

ww = ww > wh? ww: wh;
wh = ww > wh? wh: ww;

function Particle(x, y, lastX, lastY){
	this.x =  lastX;
	this.y =  lastY;
	this.dest = {
		x : x,
		y: y
	};
	this.r =  Math.random()*5*(ww/radiusFactor) + 2;
	this.vx = (Math.random()-0.5)*20;
	this.vy = (Math.random()-0.5)*20;
	this.accX = 0;
	this.accY = 0;
	this.friction = Math.random()*0.05 + 0.9;

	this.color = colors[Math.floor(Math.random()*(colors.length + 1))];
}

Particle.prototype.render = function() {
	this.accX = (this.dest.x - this.x)/300;
	this.accY = (this.dest.y - this.y)/300;
	this.vx += this.accX;
	this.vy += this.accY;
	this.vx *= this.friction;
	this.vy *= this.friction;

	this.x += this.vx;
	this.y +=  this.vy;

	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
	ctx.fill();

	var a = this.x - mouse.x;
	var b = this.y - mouse.y;

	var distance = Math.sqrt( a*a + b*b );
	if(distance<(radius*70)){
		this.accX = (this.x - mouse.x)/100;
		this.accY = (this.y - mouse.y)/100;
		this.vx += this.accX;
		this.vy += this.accY;
	}

}

function onMouseMove(e){
	mouse.x = e.clientX;
	mouse.y = e.clientY;
}

function onTouchMove(e){
	if(e.touches.length > 0 ){
		mouse.x = e.touches[0].clientX;
		mouse.y = e.touches[0].clientY;
	}
}

function onTouchEnd(e){
	mouse.x = -9999;
	mouse.y = -9999;
}

function initScene(text){

  lasttext = text; // for resize

  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold "+Math.floor((ww/10)*(text.length >14 || fontSizeFactor === null ?14/text.length:fontSizeFactor))+"px " + font;
	// console.log(ctx.font);
	ctx.textAlign = "center";
	ctx.fillText(text, ww/2, wh/2);

	var data  = ctx.getImageData(0, 0, ww, wh).data;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.globalCompositeOperation = "screen";

	console.log("length" + lastPosX.length);
	particles = [];
	var count = 0;
	for(var i=0;i<ww;i+=Math.round(ww/densityFactor)){
		for(var j=0;j<wh;j+=Math.round(ww/densityFactor)){

			if(data[ ((i + j*ww)*4) + 3] > 150){
				count = count + 1;

				if (lastPosX.length < count) {
					lastPosX.push(Math.random()*ww);
					lastPosY.push(Math.random()*wh);

				}

				particles.push(new Particle(i, j, lastPosX[count-1], lastPosY[count-1]));
			}
		}
	}
	amount = particles.length;

	
	console.log("no.of parts: " + amount)
}

function onMouseClick(){
	//radius++;
	if(radius ===5){
		radius = 0;
	}
}

function render(a) {
	requestAnimationFrame(render);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < amount; i++) {
		particles[i].render();
		lastPosX[i] = particles[i].x;
		lastPosY[i] = particles[i].y;
	}
};

// copy.addEventListener("keyup", initScene);
window.addEventListener("resize", () => initScene(lasttext));
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("click", onMouseClick);
window.addEventListener("touchend", onTouchEnd);
