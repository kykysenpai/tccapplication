const bcrypt = require('bcryptjs');

exports.crypt = function(text, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(text, salt, (err,hash) => {
      callback(err, hash);
    });
  });
};

exports.compare = function(text, hash, callback){
  bcrypt.compare(text, hash, (err, res) => {
    callback();
  });
};
