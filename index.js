const opbeat = require('opbeat').start({
	appId: 'e7f9b84da2',
	organizationId: '3b323ca34077436a8e5d636c7ec38413',
	secretToken: 'ef58eecb811d5a477ec869bf4fe11f2718037355'
}); //app externe de debugging
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const db = require('./modules/db.js');
const pw = require('./modules/pw.js');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const pictio = require('./modules/pictio.js');
const boxheadModule = require('./modules/boxhead.js');
const jwt = require('./modules/jwt.js');

//setup application
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/www')); //dossier public
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(session({ //setup cookie session
	secret: 'TCC VAINCRA',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 36000000 //age
	}
}));
app.use(opbeat.middleware.express()); //setup debug externe

//get root
app.get('/', (req, res) => {
	fs.readFile('www/index.html', function(err, html) {
		if (err) {
			throw err;
		}
		res.writeHeader(200, {
			"Content-Type": "text/html"
		});
		res.send(html);
	});
});

var connected_users = {}; //les utilisateurs connectés maintenant
var boxhead = new boxheadModule.Game();


//connexion socket et gestion des IO des sockets
io.on('connection', function(socket) { //connexion d'un socket

	//Un socket envoie ses infos d'utilisateur, ajout dans le tableau des connexions
	socket.on('user', function(infos) {
		socket.user = infos.user;
		socket.id_user = infos.id_user;
		var dateNow = new Date();
		dateNow = {
			hour: dateNow.getHours(),
			minute: dateNow.getMinutes(),
			second: dateNow.getSeconds()
		};
		var msg = {
			date: dateNow,
			msg: '<em>' + socket.user + ' just logged in </em>',
			user: 'server'
		};
		connected_users[infos.id_user] = infos.user;
		io.emit('connected_user', socket.id_user); //broadcast de la connexion de l'utilisateur
		io.emit('chatMessage', msg); //broadcast connexion chat
	});
	//Un socket demande quels utilisateurs sont connectés
	socket.on('current_users', function() {
		socket.emit('current_users', connected_users);
	});
	//un socket s'est déconnecté
	socket.on('disconnect', function() {
		var dateNow = new Date();
		dateNow = {
			hour: dateNow.getHours(),
			minute: dateNow.getMinutes(),
			second: dateNow.getSeconds()
		};
		var msg = {
			date: dateNow,
			msg: '<em>' + socket.user + ' disconnected </em>',
			user: 'server'
		};
		delete connected_users[socket.id_user];
		io.emit('disconnected_user', socket.id_user);
		io.emit('chatMessage', msg);
	});
	//un socket a envoyé un message dans le chat
	socket.on('chatMessage', function(msg) {
		var msg = {
			msg: msg.msg,
			date: msg.date,
			user: socket.user
		};
		socket.broadcast.emit('chatMessage', msg);
	});
	socket.on('isTyping', function() {
		var user = {
			id_user: socket.id_user,
			user: socket.user
		};
		socket.broadcast.emit('isTyping', user);
	});
	socket.on('stoppedTyping', function() {
		var user = {
			id_user: socket.id_user,
			user: socket.user
		};
		socket.broadcast.emit('stoppedTyping', user);
	});

	socket.on('lancerJeu1', function() {
		console.log("Jeu lancé");
		pictio.start(socket, io);
	});

	//listeners game box head
	socket.on('bhJoinGame', function(player) { //un nouveau jouer rejoins la partie
		var initX = 400;
		var initY = 400;
		var init_hp = 100;
		socket.emit('bhJoinGame', { //réponse au socket connectant
			id: player.id,
			name: player.name,
			isLocal: true,
			x: initX,
			y: initY,
			hp: init_hp
		});
		socket.broadcast.emit('bhJoinGame', { //envoie de la connexion aux autres utilisateurs
			id: player.id,
			name: player.name,
			isLocal: false,
			x: initX,
			y: initY,
			hp: init_hp
		});
		boxhead.addPlayer({
			id: player.id,
			name: player.name,
			hp: init_hp
		});

	});

	socket.on('bhLeaveGame', function(player) { //un joueur quitte la partie
		boxhead.removePlayer(player);
	});

});

//servlet post switch case action
app.post('/post', (req, res) => {
	var action = req.body.action;
	if (!action) {
		action = "none";
	}
	//switch actions user
	switch (action) {
		case 'formMainSignIn': //login d'un utilisateur
			login(req, res);
			return;
		case 'isLogged': //une session demande si l'utilisateur est déja connecté
			if (isLogged(req)) {
				res.send(response(1, {
					user: req.session.user.login,
					id_user: req.session.user.id_user
				}));
				return;
			} else {
				res.send(response(0, null));
				return;
			}
		case 'formMainSignOut': //une session se déconnecte
			req.session.destroy(function(err) {
				if (err) {
					res.send(response(0, null));
				} else {
					res.send(response(1, null));
				}
			});
			return;
		case 'loadPage': //une session demande une page
			loadPage(req, res);
			return;
	}
	isLogged(req, function(logged) {
		if (!isLogged(req)) {
			res.send(response(3, null));
			return;
		}
	});
	//switch actions logged in mandatory
	switch (action) {
		case 'chargerSession': //chargement des infos d'un utilisateur
			res.send(response(1, null));
			return;
		case 'loadChatUsers': //chargement des utilisateurs dans le chat
			loadChatUsers(req, res);
			return;
		case 'loadChatUser': //chargement infos d'un utilisateur (profil)
			loadChatUser(req, res);
			return;
		case 'modifProfil': //demande de mofif du profil
			modifProfil(req, res);
			return;
	}

});


server.listen(app.get('port'), function() {
	console.log('Server is listening on port', app.get('port'));
});

//format des réponses pour le front end
var response = function(num, map) {
	var self = {};
	self.num = num;
	self.map = map;
	return JSON.stringify(self);
}

//modifie le profil en db
function modifProfil(req, res) {
	if (req.body.data.password !== req.body.data.confirmPassword) { //le pwd de confirmation ne coincide pas
		res.send(response(6, null));
		return;
	}
	for (var data in req.body.data) { //enleve les string encombrants
		if (req.body.data[data] === 'Pas donné par l\'utilisateur') {
			req.body.data[data] = null;
		}
	}
	req.body.data.id_user = req.session.user.id_user;
	pw.crypt(req.body.data.password, function(err, hash) {
		if (err) {
			res.send(response(2, null));
			return;
		} else {
			req.body.data.password = hash;
			db.updateUser(req.body.data, function(err, ret) {
				res.send(response(1, null));
				return;
			});
		}
	});
}

//renvoie l'ensemble des id_user et pseudo au front end
function loadChatUsers(req, res) {
	db.selectAllUser(function(err, ret) {
		if (err) {
			res.send(response(2, null));
		}
		if (ret) {
			res.send(response(1, ret.rows));
		}
	});
	return;
}

//renvoie les infos d'un utilisateur au front end
function loadChatUser(req, res) {
	db.selectUserId(req.body.id_user, function(err, ret) {
		if (err) {
			res.send(response(2, null));
			return;
		}
		if (ret) {
			if (ret.rowCount === 1) {
				for (let tuple in ret.rows[0]) {
					if (!ret.rows[0][tuple]) {
						ret.rows[0][tuple] = 'Pas donné par l\'utilisateur';
					}
				}
				res.send(response(1, {
					login: ret.rows[0].login,
					surname: ret.rows[0].surname,
					firstname: ret.rows[0].firstname,
					email: ret.rows[0].email
				}));
			} else {
				res.send(response(5, null));
			}
		}
		return;
	});
}

//permet de se conencter et de créer une session
function login(req, res) {
	if (isLogged(req)) { //logged in session ou jwt
		res.send(response(1, {
			user: req.session.user.login,
			id_user: req.session.user.id_user
		})); // fin send
		return;
	} else { // pas logged
		var map = req.body.map;
		db.selectUser(map.login, function(err, ret) {
			if (ret.rowCount === 0) { //l'utilisateur n'est pas trouvé
				res.send(response(4, null));
				return;
			} //fin row count 0
			pw.compare(map.password, ret.rows[0].passwd, function(err, same) {
				if (err) {
					res.send(response(2, null));
					return;
				}
				if (same) { //password correspond
					req.session.user = {};
					req.session.user.login = ret.rows[0]['login'];
					req.session.user.id_user = ret.rows[0]['id_user'];
					console.log(req.session.user);
					var token = jwt.sign(req.session.user);
					res.send(response(1, {
						user: ret.rows[0].login,
						id_user: ret.rows[0].id_user,
						cookieAuth: req.body.map.cookieAuth ? token : null //Si rester connecté demandé jwt envoyé
					}));
					return;
				} else { //fin same
					res.send(response(4, null));
					return;
				}
			}); //fin comare pw
		}); //fin db select user
	} //fin else pas logged
	return;
}

//permet de charger une page demandée
function loadPage(req, res) {
	if ((!isLogged(req)) && (req.body.page !== 'home' &&
			req.body.page !== 'about' &&
			req.body.page !== 'notLoggedIn')) { //request of a logged in page as a visitor
		res.send(response(3, null));
		return;
	}
	res.sendFile('www/views/' + req.body.page + '.html', {
		root: __dirname
	});
	return;
};

//vérifie s'il existe une session grâce a la requete client et à un jwt token
function isLogged(req) {
	if (req.session.user) {
		return true;
	} else {
		if (req.body.cookieAuth) {
			var decoded = jwt.verify(req.body.cookieAuth);
			req.session.user = {};
			req.session.user.login = decoded['login'];
			req.session.user.id_user = decoded['id_user'];
			console.log(req.session.user);
			return true;
		} else {
			return false;
		}
	}
}
