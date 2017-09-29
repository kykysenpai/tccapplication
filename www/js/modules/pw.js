const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.crypt = function(text, callback){
  bcrypt.hash(text, saltRounds, callback(err,hash));
};

exports.compare = function(text, hash, callback){
  bcrypt.compare(text, hash, callback(err, res));
};
