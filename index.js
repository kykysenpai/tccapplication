const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const db = require('./www/js/modules/db.js');
const pw = require('./www/js/modules/pw.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/www'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(session({
	secret: 'TCC VAINCRA',
	cookie:{
		secure: true,
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
	}
	if(!isLogged(req)){
		res.send("3");
		return;
	}
	//switch actions logged in
	switch(action){
		case 'chargerInfo':
			return;
	}

});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

function login(req, res){
	if(isLogged(req)){
		res.send("1");
		return;
	}
	var map = req.body.map;
	db.selectUser(map.login , function(err, rows){
		console.log('callback');
		res.send(response(1, rows));
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
