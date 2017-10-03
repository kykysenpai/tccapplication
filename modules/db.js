const {Client} = require('pg');
const client = new Client({
  //connectionString: process.env.DATABASE_URL,
  connectionString: "postgres://pjepyjpyjcepzj:29382eb6780687bc58ab78d3a53c8bc2fd873e5b15bbcbee9b28d06d75588f31@ec2-79-125-105-164.eu-west-1.compute.amazonaws.com:5432/d7ptr5cltbq7d",
  ssl: true
});
client.connect();

const table_users = "tccapp.users";
const table_posts = "tccapp.posts";

const select_all_user = "SELECT u.id_user, u.login FROM " + table_users + " u";
const select_user = "SELECT * FROM " + table_users + " u WHERE u.login = ($1)";
const select_user_id = "SELECT * FROM " + table_users + " u WHERE u.id_user = ($1)";
const insert_post = "INSERT INTO " + table_posts + " VALUES (DEFAULT, ($1), ($2), ($3)) RETURNING *";
const update_user = "UPDATE " + table_users + " SET firstname = ($1), surname = ($2), login = ($3), passwd = ($4), email = ($5) WHERE id_user = ($6)";

exports.updateUser = function(data, callback){
  client.query(update_user,[data.firstname, data.surname, data.login, data.password, data.email, data.id_user], (err, res) => {
    if(err){
      throw(err);
    } else {
      callback(null, res);
    }
  });
}

exports.selectUser = function(login, callback){
  client.query(select_user,[login], (err, res) => {
    if(err){
      throw(err);
    } else {
      callback(null,res);
    }
  });
}

exports.selectAllUser = function(callback){
  client.query(select_all_user, (err, res) =>{
    if(err){
      throw(err);
    } else {
      callback(null, res);
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
  client.query(insert_post, [texte, user, new Date()], (err, res) => {
    if(err){
      throw (err);
    } else {
      callback(null, res);
    }
  });
}
