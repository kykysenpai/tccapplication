const {Client} = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
client.connect();

const table_users = "tccapp.users";
const table_posts = "tccapp.posts";

const select_user = "SELECT * FROM " + table_users + " u WHERE u.login = ($1)";

exports.selectUser = function(login, callback){
  console.log(client);
  client.query(select_user,[login], (err, res) => {
    console.log('2');
    if(err){
      callback(err, null);
    } else {
      callback(null,res.rows);
    }
  });
}
