const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const db = require('./www/js/modules/db.js');
const pw = require('./www/js/modules/pw.js');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

//setup application
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/www'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//setup cookie session
app.use(session({
	secret: 'TCC VAINCRA',
	resave: false,
	saveUninitialized : true,
	cookie:{
		maxAge: 1800000
	}
}));

//get root
app.get('/', (req, res) => {
	fs.readFile('www/index.html', function (err, html) {
		if (err) {
			throw err;
		}
		res.writeHeader(200, {"Content-Type": "text/html"});
		res.send(html);
	});
});

var connected_users = {};
console.log(0);

//connexion socket et gestion des IO des sockets
io.on('connection', function(socket){
	socket.on('user', function(infos){
		socket.user = infos.user;
		socket.id_user = infos.id_user;
		var msg = {
			date: new Date(),
			msg: '<em>' + socket.user + ' just logged in </em>',
			user: 'server'
		};
        console.log(1);

		connected_users[infos.id_user] = infos.user;

		io.emit('chatMessage', msg);
	});

    socket.on('current_users', function(){
        console.log(2);

        socket.emit('current_users', connected_users);
    });

	socket.on('disconnect', function(){
		var msg = {
			date: new Date(),
			msg: '<em>' + socket.user + ' disconnected </em>',
			user: 'server'
		};
		io.emit('chatMessage', msg);
	});

	socket.on('chatMessage', function(msg){
		var msg = {
			date: new Date(),
			msg: msg,
			user: socket.user
		};
		io.emit('chatMessage', msg);

		//persistance posts db
		/*
		db.insertPost(msg, socket.id_user, function(err, ret){
			if(ret.rowCount === 1){
				var msg = {
					date: ret.rows[0].datepost,
					msg: ret.rows[0].val
				};
				db.selectUserId(ret.rows[0].id_user, function(err, ret){
					if(ret.rowCount === 1){
						msg.user = ret.rows[0].login;
						io.emit('chatMessage', msg);
					} //row Count != 0
				});
			}//row Count != 0
		});
		*/
		//fin persistance db
	});

});

//servlet post switch case action
app.post('/post', (req, res) => {
	var action = req.body.action;
	if(!action){
		action = "none";
	}
	//switch actions user
	switch(action){
		case 'formMainSignIn':
			login(req, res);
			return;
		case 'isLogged':
			if(isLogged(req)){
				res.send(response(1, {user : req.session.user.login, id_user : req.session.user.id_user}));
			} else {
				res.send(response(0, null));
			}
			return;
		case 'formMainSignOut':
			req.session.destroy(function(err){
				if(err){
					res.send(response(0, null));
				} else {
					res.send(response(1, null));
				}
			});
			return;
		case 'loadPage':
			loadPage(req, res);
			return;
	}
	if(!isLogged(req)){
		res.send(response(3, null));
		return;
	}
	//switch actions logged in mandatory
	switch(action){
		case 'chargerSession':
			res.send(response(1, null));
			return;
		case 'loadChatUsers':
			loadChatUsers(req, res);
			return;
		case 'loadChatUser':
			loadChatUser(req,res);
			return;
		case 'modifProfil':
			modifProfil(req,res);
			return;
	}

});

server.listen(app.get('port'), function(){
	console.log('Server is listening on port', app.get('port'));
});

//format des réponses pour le front end
var response = function(num, map){
  var self = {};
  self.num = num;
  self.map = map;
  return JSON.stringify(self);
}

//modifie le profil en db
function modifProfil(req,res){
	if(req.body.data.password !== req.body.data.confirmPassword){ //le pwd de confirmation ne coincide pas
		res.send(response(6,null));
		return;
	}
	for(var data in req.body.data){//enleve les string encombrants
		if(req.body.data[data] === 'Pas donné par l\'utilisateur'){
			req.body.data[data] = null;
		}
	}
	req.body.data.id_user = req.session.user.id_user;
	pw.crypt(req.body.data.password, function(err, hash){
		if(err){
			res.send(response(2, null));
		} else {
			req.body.data.password = hash;
			db.updateUser(req.body.data, function(err, ret){
				res.send(response(1, null));
				return;
			});
		}
	});
}

//renvoie l'ensemble des id_user et pseudo au front end
function loadChatUsers(req, res){
	db.selectAllUser(function(err, ret){
		if(err){
			res.send(response(2, null));
		}
		if(ret){
			res.send(response(1, ret.rows));
		}
	});
}

//renvoie les infos d'un utilisateur au front end
function loadChatUser(req, res){
	db.selectUserId(req.body.id_user, function(err, ret){
		if(err){
			res.send(response(2, null));
		}
		if(ret){
			if(ret.rowCount === 1){
				for(let tuple in ret.rows[0]){
					if(!ret.rows[0][tuple]){
						ret.rows[0][tuple] = 'Pas donné par l\'utilisateur';
					}
				}
				res.send(response(1, {
					login:ret.rows[0].login,
					surname:ret.rows[0].surname,
					firstname:ret.rows[0].firstname,
					email:ret.rows[0].email
				}));
			} else {
				res.send(response(5, null));
			}
		}
	});
}

//permet de se conencter et de créer une session
function login(req, res){
	if(isLogged(req)){
		res.send(response(1, {user : req.session.user.login, id_user : req.session.user.id_user}));
		return;
	}
	var map = req.body.map;
	db.selectUser(map.login , function(err, ret){
		if(ret.rowCount === 0){ //l'utilisateur n'est pas trouvé
			res.send(response(4, null));
			return;
		}
		pw.compare(map.password, ret.rows[0].passwd, function(err, same){
			if(err){
				res.send(response(2, null));
			}
			if(same){//password correspond
				req.session.user = ret.rows[0];
				res.send(response(1, {user : ret.rows[0].login, id_user : ret.rows[0].id_user}));
			} else {
				res.send(response(4, null));
			}
		});
	});
	return;
}

//permet de charger une page demandée
function loadPage(req, res){
	if((req.body.page !== 'home' &&
		req.body.page !== 'about' &&
		req.body.page !=='notLoggedIn') && (!isLogged(req)) ){//request of a logged in page as a visitor
				res.send(response(3,null));
				return;
			}
	res.sendFile('www/views/' + req.body.page + '.html', {root: __dirname});
	return;
}

//vérifie s'il existe une session grâce a la requete client
function isLogged(req){
	if(req.session.user){
		return true;
	}else{
		return false;
	}
}
