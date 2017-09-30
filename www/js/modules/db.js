const {Client} = require('pg');
const client = new Client({
  //connectionString: process.env.DATABASE_URL,
  connectionString: "postgres://pjepyjpyjcepzj:29382eb6780687bc58ab78d3a53c8bc2fd873e5b15bbcbee9b28d06d75588f31@ec2-79-125-105-164.eu-west-1.compute.amazonaws.com:5432/d7ptr5cltbq7d",
  ssl: true
});
client.connect();

const table_users = "tccapp.users";
const table_posts = "tccapp.posts";

const select_user = "SELECT * FROM " + table_users + " u WHERE u.login = ($1)";
const select_user_id = "SELECT * FROM " + table_users + " u WHERE u.id_user = ($1)";
const insert_post = "INSERT INTO " + table_posts + " VALUES (DEFAULT, ($1), ($2), DEFAULT) RETURNING *";

exports.selectUser = function(login, callback){
  client.query(select_user,[login], (err, res) => {
    if(err){
      throw(err);
    } else {
      callback(null,res);
    }
  });
}

exports.selectUserId = function(id_user, callback){
    client.query(select_user_id,[id_user], (err,res) =>{
      if(err){
        throw(err);
      } else {
        callback(null,res);
      }
    });
}

exports.insertPost = function(texte, user, callback){
  client.query(insert_post, [texte, user], (err, res) => {
    if(err){
      throw (err);
    } else {
      callback(null, res);
    }
  });
}
