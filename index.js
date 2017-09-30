const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const db = require('./www/js/modules/db.js');
const pw = require('./www/js/modules/pw.js');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/www'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(session({
	secret: 'TCC VAINCRA',
	resave: false,
	saveUninitialized : true,
	cookie:{
		maxAge: 1800000
	}
}));

app.get('/', (req, res) => {
	fs.readFile('www/index.html', function (err, html) {
		if (err) {
			throw err;
		}
		res.writeHeader(200, {"Content-Type": "text/html"});
		res.send(html);
	});
});

//format des réponses pour le front end
var response = function($num, $map){
  var self = {};
  self.num = $num;
  self.map = $map;
  return JSON.stringify(self);
}


//connexion socket
io.on('connection', function(socket){
	console.log('a user connected');
});


//servlet post
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
				res.send(response(1, {user : req.session.user.login}));
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
	}
	if(!isLogged(req)){
		res.send(response(3, null));
		return;
	}
	//switch actions logged in
	switch(action){
		case 'chargerSession':
			return;
	}

});

server.listen(app.get('port'), function(){
	console.log('Server is listening on port', app.get('port'));
});

app.listen(8080, function() {
	console.log('Node app is running on port', 8080);
});

//permet de se conencter et de créer une session
function login(req, res){
	if(isLogged(req)){
		res.send("1");
		return;
	}
	var map = req.body.map;
	db.selectUser(map.login , function(err, rows){
		if(rows.length === 0){ //l'utilisateur n'est pas trouvé
			res.send(response(4, null));
			return;
		}
		pw.compare(map.password, rows[0].passwd, function(err, same){
			if(err){
				res.send(response(2, null));
			}
			if(same){//password correspond
				req.session.user = rows[0];
				res.send(response(1, {user :rows[0].login}));
			} else {
				res.send(response(4, null));
			}
		});
	});
	return;
}

function isLogged(req){
	if(req.session.user){
		return true;
	}else{
		return false;
	}
}
