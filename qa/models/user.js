const connection = require('../models/connection');

const UserSQL = {
	register: `INSERT INTO user(number,name,password) VALUES(?,?,?)`,
	login: `SELECT id,name,photo 
			FROM user 
			WHERE number = ? AND password = ?`,
};

module.exports = {

	login: (user, callback) => {
		const body = {};
		connection.query(connection.format(UserSQL.login,[user.number, user.password]), (err, results) => {
			if (err) {
				body.errMsg = '连接失败！';
				console.log(err)
			} else {
				if (results.length === 0) {
					body.errMsg = '账号密码错误！';
				} else {
					body.sucMsg = '登录成功！';
					body.data = results[0];
				}
			}
			callback(body);
		});
	},

	register: (user, callback) => {
		const body = {};
		connection.query(connection.format(UserSQL.register,[user.number, user.name, user.password]),(err, results) => {
			if (err) {
				body.errMsg = err.code === 'ER_DUP_ENTRY' ? '用户名重复！' : '注册失败！';
				console.log(err)
			} else {
				body.sucMsg = '注册成功！';
				body.data = { id: result.insertId, name: user.name };	
			}
			callback(body);
		});
	}
}