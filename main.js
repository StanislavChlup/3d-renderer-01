let canvas;

let context;

let points = JSON.parse('[{"x":-100,"y":-100,"z":-100},{"x":-100,"y":100,"z":-100},{"x":100,"y":-100,"z":-100},{"x":100,"y":100,"z":-100},{"x":-100,"y":-100,"z":100},{"x":-100,"y":100,"z":100},{"x":100,"y":-100,"z":100},{"x":100,"y":100,"z":100},{"x":-200,"y":-200,"z":-200},{"x":-200,"y":200,"z":-200},{"x":200,"y":-200,"z":-200},{"x":200,"y":200,"z":-200},{"x":-200,"y":-200,"z":200},{"x":-200,"y":200,"z":200},{"x":200,"y":-200,"z":200},{"x":200,"y":200,"z":200}]');

let edges = JSON.parse('[{"a":0,"b":1},{"a":1,"b":3},{"a":3,"b":2},{"a":2,"b":0},{"a":0,"b":4},{"a":1,"b":5},{"a":2,"b":6},{"a":3,"b":7},{"a":4,"b":5},{"a":5,"b":7},{"a":7,"b":6},{"a":6,"b":4},{"a":0,"b":8},{"a":1,"b":9},{"a":2,"b":10},{"a":3,"b":11},{"a":4,"b":12},{"a":5,"b":13},{"a":6,"b":14},{"a":7,"b":15},{"a":8,"b":9},{"a":9,"b":11},{"a":11,"b":10},{"a":10,"b":8},{"a":8,"b":12},{"a":9,"b":13},{"a":10,"b":14},{"a":11,"b":15},{"a":12,"b":13},{"a":13,"b":15},{"a":15,"b":14},{"a":14,"b":12}]');

let cam = 1000;

let t;

let fps2 = [];

let logfps;

let loop;

let rotx = 0;

let roty = 0;

let rotz = 0;

let hue = 0

window.onload = function(){

	canvas = document.getElementById('canvas');	context = canvas.getContext('2d');

	logfps = document.getElementById('fps');

	context.translate(500,500);

	t = Date.now();

	

	

	

}

function start(){

	if (loop==undefined) {

		render();

	}

}

function stop(){

	cancelAnimationFrame(loop);

	loop = undefined;

}

function render(){

tpassed = Date.now()-t;

	t = Date.now();

	fps = 1000/tpassed;

	

	

	fps2.push(fps);

	if (fps2.length >= 60 ) {

		fps2.shift();

	}

	

	

	fpsreal = Math.round((eval(fps2.join(' + ')))/fps2.length);

	logfps.innerHTML = fpsreal;

//cam = +document.getElementById('cam').value;

roty+=13/tpassed;

rotx+=7/tpassed;

rotz+=5/tpassed;

clear();

drawpoints(camera(cam,rotate(points,rotx,roty,rotz)));

drawedges(camera(cam,rotate(points,rotx,roty,rotz)),edges);

// color

if (hue>=360) hue = 0; else hue+=0.5;

loop = requestAnimationFrame(render);

}

function rotate(points,rotx,roty,rotz){

	

	let pointsx = Array.from({length: points.length}, () => ({x:undefined,y:undefined,z:undefined}));

	let pointsy = Array.from({length: points.length}, () => ({x:undefined,y:undefined,z:undefined}));

	let pointsz = Array.from({length: points.length}, () => ({x:undefined,y:undefined,z:undefined}));

	while (rotx > 360) {rotx -= 360;}

	rotx = rotx * (Math.PI / 180);

	while (roty > 360) {roty -= 360;}

	roty = -1 * roty * (Math.PI / 180);

	while (rotz > 360) {rotz -= 360;}

	rotz = rotz * (Math.PI / 180);

	

	for (let i in points) {

		pointsx[i].y = points[i].y*Math.cos(rotx)-points[i].z*Math.sin(rotx);

		pointsx[i].z = points[i].y*Math.sin(rotx)+points[i].z*Math.cos(rotx);

		pointsx[i].x = points[i].x;

	}

	for (let i in points) {

		pointsy[i].x = pointsx[i].x*Math.cos(roty)-pointsx[i].z*Math.sin(roty);

		pointsy[i].z = pointsx[i].x*Math.sin(roty)+pointsx[i].z*Math.cos(roty);

		pointsy[i].y = pointsx[i].y;

	}

	for (let i in pointsz) {

		pointsz[i].x = pointsy[i].x*Math.cos(rotz)-pointsy[i].y*Math.sin(rotz);

		pointsz[i].y = pointsy[i].x*Math.sin(rotz)+pointsy[i].y*Math.cos(rotz);

		pointsz[i].z = pointsy[i].z;

	}

	return pointsz;

}

	

function camera(cam,points){

	let pointsc = Array.from({length: points.length}, () => ({x:undefined,y:undefined,z:undefined}));

	for (let i in points) {

		pointsc[i].x = ((cam*points[i].x)/(cam+points[i].z));

		pointsc[i].y = ((cam*points[i].y)/(cam+points[i].z));

		pointsc[i].z = points[i].z;

	}

	return pointsc;

}

function clear(){

	context.beginPath();

	context.rect(-500,-500,1000,1000);

	context.fillStyle = '#0000002f';

	context.fill();

}

function drawpoints(points){

	for(i=0;i<points.length;i++){

context.beginPath();

context.arc(points[i].x,points[i].y,10,0,2*Math.PI);

context.fillStyle = `hsl(${hue},100%,50%)`

context.fill();

}

}

function drawedges(points,edges){

for(i=0;i<edges.length;i++){

context.beginPath();

context.moveTo(points[edges[i].a].x,points[edges[i].a].y);

context.lineTo(points[edges[i].b].x,points[edges[i].b].y);

context.lineWidth = 3;

context.strokeStyle = `hsl(${hue},80%,40%)`;

context.stroke();

}}
