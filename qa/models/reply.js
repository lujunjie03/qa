const connection = require('../models/connection');

const ReplySQL = {
	getReply: 'SELECT answer,content,reply.date,reply.id,name,photo,title FROM reply LEFT JOIN user ON reply.answer=user.id LEFT JOIN question ON reply.question=question.id WHERE title LIKE ?',
	getReplyByUserId: 'SELECT answer,content,reply.date,reply.id,name,photo,title FROM reply LEFT JOIN user ON reply.answer=user.id LEFT JOIN question ON reply.question=question.id WHERE answer=?',
	addReply: 'INSERT INTO reply(content,answer,question) VALUES(?,?,?)',
};

module.exports = {
	getReply: (reply, callback) => {
		const body = {};
		connection.query(connection.format(ReplySQL.getReply, [`%${reply.title}%`]), (err, results) => {
			if (err) {
				body.errMsg = '加载失败！';
				console.log(err)
			} else {
				body.sucMsg = '加载成功！';
				body.data = results;
			}
			callback(body);
		});
	},

	getReplyByUserId: (reply, callback) => {
		const body = {};
		connection.query(connection.format(ReplySQL.getReplyByUserId, [reply.answer]), (err, results) => {
			if (err) {
				body.errMsg = '加载失败！';
				console.log(err)
			} else {
				body.sucMsg = '加载成功！';
				body.data = results;
			}
			callback(body);
		});
	},

	addReply: (reply, callback) => {
		const body = {};
		connection.query(connection.format(ReplySQL.addReply, [reply.content, reply.answer, reply.question]), (err, results) => {
			if (err) {
				body.errMsg = '回答失败！';
				console.log(err)
			} else {
				body.sucMsg = '回答成功！';
			}
			callback(body);
		});
	},
}