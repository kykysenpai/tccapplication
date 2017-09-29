const {Client} = require('pg');
const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: true
});
client.connect();

const table_users = "tccapp.users";
const table_posts = "tccapp.posts";

const select_user = "SELECT * FROM " + table_users + " u WHERE u.login = ";

exports.selectUser = function(login, callback){
  client.query(select_user + login, (err, res) => {
    if(err){
      callback(err, null);
    }
    callback(null,res);
  });
}
