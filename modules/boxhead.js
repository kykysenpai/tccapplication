exports.Game = function() { //variables du jeu
	this.players = [];
	this.projectiles = [];
}

exports.Game.prototype = {
	addPlayer: function(player) {
		this.players.push(player);
		console.log(player.name + " connected");
		console.log("all players connected : ");
		console.log(this.players)
	},
	removePlayer: function(player) {
		this.players = this.players.filter(function(t) {
			return t.id != player.id;
		}); //return le tableau moins celui qui correspond a playerID
		console.log("A player disconnected");
	}
}
