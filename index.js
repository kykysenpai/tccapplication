const express = require('express'), 
app = express(),
fs = require('fs'),
http = require('http');

app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
	
	fs.readFile('www/index.html', function (err, html) {
		if (err) {
			throw err; 
		}  	
		res.writeHeader(200, {"Content-Type": "text/html"});
		res.write(html);
		res.end();
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
