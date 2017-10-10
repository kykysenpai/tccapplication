//version WebGL

var renderer = PIXI.autoDetectRenderer(480, 480);

$('div[name=boxhead]').append(renderer.view);

var stage = new PIXI.Container();

renderer.render(stage);


/* probleme version HTML lags
var bhGame;
const INTERVAL = 3000; //3 sec

socket.emit('bhJoinGame', {
	id: sessionStorage.getItem('current_user_id'),
	name: sessionStorage.getItem('current_users')
});

socket.on('bhJoinGame', function(player) {
	bhGame = new GameBoxhead();
	bhGame.addPlayer(player);
});

function GameBoxhead() {
	this.players = []; //tous sauf local, local initialisé dans addPlayer
	this.width = 800;
	this.height = 800;
	this.arena = $('div[name=boxhead]');
	$('div[name=boxhead]').css({
		width: 400,
		height: 400,
		backgroundColor: "#F0FFFF"
	});

	var t = this;

	setInterval(function() { //appelle la fonction toutes les "INTERVAL" millisecondes
		t.mainLoop();
	}, INTERVAL);
}

GameBoxhead.prototype = {
	addPlayer: function(data) {
		var player = new Player(data, this.arena);
		if (player.isLocal) { //Si c'est le joueur local qui s'est connecté
			this.localPlayer = player;
		} else { //si c'est un autre joueur
			this.players.push(player);
		}
		console.log("connexion de :");
		console.log(player);
	},
	mainLoop: function() {

	}
}

function Player(data, arena) {
	this.id = data.id;
	this.name = data.name;
	this.isLocal = data.isLocal;
	this.x = data.x;
	this.y = data.y;
	this.hp = data.hp;
	this.width = 100;
	this.height = 100;
	this.speed = 2;
	this.rotation_speed = 5;
	this.baseAngle = getRandomInt(0, 360);
	this.baseAngle -= (this.baseAngle % this.rotation_speed);
	this.dir = {
		up: false,
		down: false,
		left: false,
		right: false
	};
	this.arena = arena;

	this.materialize();
}

Player.prototype = {
	setControls: function() {
		$(document).keypress(function(e) {
			var k = e.keyCode || e.which;
		});
	},
	materialize: function() {
		this.arena.append('<div id="' + this.id + '" class="player"></div>');
		this.body = $('#' + this.id);
		this.body.css('width', this.width);
		this.body.css('height', this.height);

		this.body.css('-webkit-transform', 'rotateZ(' + this.baseAngle + 'deg)');
		this.body.css('-moz-transform', 'rotateZ(' + this.baseAngle + 'deg)');
		this.body.css('-o-transform', 'rotateZ(' + this.baseAngle + 'deg)');
		this.body.css('transform', 'rotateZ(' + this.baseAngle + 'deg)');

		this.arena.append('<div id="info-' + this.id + '" class="info"></div>');
		this.info = $('#info-' + this.id);
		this.info.append('<div class="label">' + this.name + '</div>');
		this.info.append('<div class="hp-bar"></div>');

		this.refresh();

		if (this.isLocal) {
			this.setControls();
		}
	},
	refresh: function() {
		this.body.css('left', this.x + 'px');
		this.body.css('top', this.y + 'px');

		this.body.css('-webkit-transform', 'rotateZ(' + this.baseAngle + 'deg)');
		this.body.css('-moz-transform', 'rotateZ(' + this.baseAngle + 'deg)');
		this.body.css('-o-transform', 'rotateZ(' + this.baseAngle + 'deg)');
		this.body.css('transform', 'rotateZ(' + this.baseAngle + 'deg)');

		this.info.css('left', this.x + 'px');
		this.info.css('top', this.y + 'px');

		this.info.find('.hp-bar').css('width', this.hp + 'px');
		this.info.find('.hp-bar').css('background-color', getGreenToRed(this.hp));

	}
}

function getGreenToRed(percent) {
	r = percent < 50 ? 255 : Math.floor(255 - (percent * 2 - 100) * 255 / 100);
	g = percent > 50 ? 255 : Math.floor((percent * 2) * 255 / 100);
	return 'rgb(' + r + ',' + g + ',0)';
}
*/
