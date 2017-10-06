var bhGame;
const INTERVAL = 500;

console.log("current id : " + localStorage.getItem('current_user_id'));
socket.emit('bhJoinGame', {
	id: localStorage.getItem('current_user_id'),
	name: "jean"
});

socket.on('bhJoinGame', function(player) {
	bhGame = new GameBoxhead();
	bhGame.addPlayer(player);
});

function GameBoxhead() {
	this.players = []; //tous sauf local, local initialisé dans addPlayer
	this.width = 800;
	this.height = 800;

	var t = this;

	setInterval(function() { //appelle la fonction toutes les "INTERVAL" millisecondes
		t.mainLoop();
	}, INTERVAL);
}

GameBoxhead.prototype = {
	addPlayer: function(data) {
		var player = new Player(data);
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

function Player(data) {
	this.id = data.id;
	this.name = data.name;
	this.isLocal = data.isLocal;
	this.x = data.x;
	this.y = data.y;
	this.hp = data.hp;
	if (this.isLocal) { //si joueur local, le nav peut le controler
		this.setControls();
	}
}

Player.prototype = {
	setControls: function() {
		$('div[name=boxhead]').keypress(function(e) {
			var k = e.keyCode || e.which;
			console.log(k);
		})
	}
}
