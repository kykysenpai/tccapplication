const jwt = require('jsonwebtoken');

exports.sign = function(data) {
	return jwt.sign(data, 'TCC VAINCRA');

	/* Async
  jwt.sign(data, 'TCC VAINCRA', function(err, token) {
		if (err) {
			throw err;
		} else {
			callback(token);
		}
	});
  */

};

exports.verify = function(data) {
	return jwt.verify(data, 'TCC VAINCRA');

	/* Async
  jwt.verify(data, 'TCC VAINCRA', function(err, decoded) {
		if (err) {
			throw err;
		} else {
			callback(decoded);
		}
	});
  */
};
