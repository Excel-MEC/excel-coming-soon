var colors = ["#468966","#FFF0A5", "#FFB03B","#B64926", "#8E2800"];
var font = "sans serif";
var canvas = document.querySelector("#scene"),
	ctx = canvas.getContext("2d"),
	particles = [],
	amount = 0,
	mouse = {x:0,y:0},
	radius = 0.7;

var lasttext = ""; // for resize()
// var copy = document.querySelector("#copy");

var ww = canvas.width = window.innerWidth;
var wh = canvas.height = window.innerHeight;

ww = ww > wh? ww: wh;
wh = ww > wh? wh: ww;

function Particle(x,y){
	this.x =  Math.random()*ww;
	this.y =  Math.random()*wh;
	this.dest = {
		x : x,
		y: y
	};
	this.r =  Math.random()*5*(ww/2500) + 2;
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

	ctx.font = "bold "+(ww/10)+"px " + font;
	ctx.textAlign = "center";
	ctx.fillText(text, ww/2, wh/2);

	var data  = ctx.getImageData(0, 0, ww, wh).data;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.globalCompositeOperation = "screen";

	particles = [];
	for(var i=0;i<ww;i+=Math.round(ww/150)){
		for(var j=0;j<wh;j+=Math.round(ww/150)){
			if(data[ ((i + j*ww)*4) + 3] > 150){
				particles.push(new Particle(i,j));
			}
		}
	}
	amount = particles.length;

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
	}
};

// copy.addEventListener("keyup", initScene);
window.addEventListener("resize", () => initScene(lasttext));
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("click", onMouseClick);
window.addEventListener("touchend", onTouchEnd);
