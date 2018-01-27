const mysql = require('mysql');

const client = mysql.createConnection({
	user: 'root',
	socketPath: '/var/run/mysqld/mysqld.sock',
	database: 'tccApp',
	password: 'Shakti1405'
});
client.connect();

const table_users = "users";
const table_posts = "posts";

const select_all_user = "SELECT u.id_user, u.login FROM " + table_users + " u";
const select_user = "SELECT * FROM " + table_users + " u WHERE u.login = ?";
const select_user_id = "SELECT * FROM " + table_users + " u WHERE u.id_user = ?";
const insert_post = "INSERT INTO " + table_posts + " VALUES (DEFAULT, ?, ?, ?) RETURNING *";
const update_user = "UPDATE " + table_users + " SET firstname = ?, surname = ?, login = ?, passwd = ?, email = ? WHERE id_user = ?";

exports.updateUser = function(data, callback) {
	client.query(update_user, [data.firstname, data.surname, data.login, data.password, data.email, data.id_user], (err, res) => {
		if (err) {
			throw (err);
		} else {
			callback(null, res);
		}
	});
};

exports.selectUser = function(login, callback) {
	client.query(select_user, [login], (err, res) => {
		if (err) {
			throw (err);
		} else {
			callback(null, res);
		}
	});
};

exports.selectAllUser = function(callback) {
	client.query(select_all_user, (err, res) => {
		if (err) {
			throw (err);
		} else {
			callback(null, res);
		}
	});
};

exports.selectUserId = function(id_user, callback) {
	client.query(select_user_id, [id_user], (err, res) => {
		if (err) {
			throw (err);
		} else {
			callback(null, res);
		}
	});
}

exports.insertPost = function(texte, user, callback) {
	client.query(insert_post, [texte, user, new Date()], (err, res) => {
		if (err) {
			throw (err);
		} else {
			callback(null, res);
		}
	});
};