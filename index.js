const express = require('express');
const app = express();
const fs = require('fs');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/www'));

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
