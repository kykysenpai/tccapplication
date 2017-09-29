const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/www'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(session({
	secret: 'TCC VAINCRA',
	cookie:{
		secure: true
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
	//res.send(action);
	isLogged(req, resp);
	resp.end();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function isLogged(req, resp){
	if(req.session){
		resp.write("session : " + JSON.stringify(req.session));
	}else{
		resp.write("pas de session");
	}
}
