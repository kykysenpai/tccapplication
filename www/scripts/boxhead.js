//version WebGL
var Container = PIXI.Container;
var autoDetectRenderer = PIXI.autoDetectRenderer;
var loader = PIXI.loader;
var resources = PIXI.loader.resources;
var Sprite = PIXI.Sprite;
var TextureCache = PIXI.utils.TextureCache;


var assets = "/assets/";
var sprites = assets + "sprites/";

var packs = [
	'santa'
]

console.log($('html, body').css('width'));
console.log($('html, body').css('height'));
console.log($('html, body').css('margin'));
$('#chatContainer').hide();
//cache tout les éléments inutiles


var stage = new PIXI.Container();
var renderer = autoDetectRenderer(1280, 720);
/* Prend toute la fenetre


renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);
*/
renderer.backgroundColor = 0xffffff;
$('div[name=boxhead]').append(renderer.view);

var toLoad = [];
var packLoaded = 0;

packs.forEach(function(pack) {
	$.ajax({
		url: sprites + pack,
		success: function(data) {
			$(data).find("li > a").each(function() {
				// will loop through
				toLoad.push($(this).attr("href"));
			});
			packLoaded++;
			$('div[name=fetchBar]').css('width', ((packLoaded / packs.length) * 100) + '%'); //pourcentage de d'infos du loaded chargées
			if (packLoaded == packs.length) { //tout a été fetch
				start();
			}
		}
	}); //Chargement sprites
}); //fin each

function start() {
	loader
		.add(toLoad)
		.on("progress", loadProgressHandler)
		.load(setup);
}

function loadProgressHandler(loader, resource) {
	$('div[name=loadBar]').css('width', loader.progress + '%');
	$('div[name=loadBar] > span').text("Chargement de " + resource.url);
}

var santa;

function setup() {
	$('div[name=progressBarsDiv]').hide();
	santa = new Sprite(resources[sprites + "santa/Dead%20(2).png"].texture);
	santa.scale.set(0.2, 0.2);
	santa.vx = 0;
	santa.vy = 0;
	santa.y = 96;
	santa.x = 96;
	stage.addChild(santa);

	var left = keyboard(37),
		up = keyboard(38),
		right = keyboard(39),
		down = keyboard(40);

	left.press = function() {
		santa.vx = -2;
		santa.vy = 0;
	};

	left.release = function() {
		if (!right.isDown && santa.vy === 0) {
			santa.vx = 0;
		}
	};

	up.press = function() {
		santa.vy = -2;
		santa.vx = 0;
	};
	up.release = function() {
		if (!down.isDown && santa.vx === 0) {
			santa.vy = 0;
		}
	};

	right.press = function() {
		santa.vx = 2;
		santa.vy = 0;
	};
	right.release = function() {
		if (!left.isDown && santa.vy === 0) {
			santa.vx = 0;
		}
	};

	down.press = function() {
		santa.vy = 2;
		santa.vx = 0;
	};
	down.release = function() {
		if (!up.isDown && santa.vx === 0) {
			santa.vy = 0;
		}
	};

	state = play;
	gameLoop();
	renderer.render(stage);
}

function gameLoop() {
	requestAnimationFrame(gameLoop);
	state();
	renderer.render(stage);
}

function play() {
	santa.x += santa.vx;
	santa.y += santa.vy;
}
