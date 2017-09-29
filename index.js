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

	pw.crypt('jean', function(err, hash){
		if(err){
			res.write("ko");
		} else {
			res.write(hash);
		}
		res.end();
	});

	return;

	//debug
	db.selectUser("pierre", function(err, rows){
		if(err){
			res.write(JSON.stringify(err));
		} else {
			res.write(JSON.stringify(rows[0]));
		}
		res.end();
	});

	return;


	//switch actions user
	switch(action){
		case 'mainLogin':
			login(req, res);
			break;
	}
	if(!isLogged(req)){
		return;
	}
	//switch actions logged in
	switch(action){
		case 'chargerInfo':
			break;
	}

});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

function login(req, res){
	if(isLogged(req)){
		return;
	}
	var map = JSON.parse(req.body.map);

}

function isLogged(req){
	if(req.session.user){
		return true;
	}else{
		return false;
	}
}
