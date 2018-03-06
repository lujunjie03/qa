const connection = require('../models/connection');

const ReplySQL = {
	getReply: 'SELECT answer,content,reply.date,reply.id,name,photo,title FROM reply LEFT JOIN user ON reply.answer=user.id LEFT JOIN question ON reply.question=question.id WHERE title LIKE ?',
	getReplyByUserId: 'SELECT answer,content,reply.date,reply.id,name,photo,title FROM reply LEFT JOIN user ON reply.answer=user.id LEFT JOIN question ON reply.question=question.id WHERE answer=?',
	addReply: 'INSERT INTO reply(content,answer,question) VALUES(?,?,?)',
	getReplyById: 'SELECT reply.id, content, answer, question, date, name, photo, (SELECT COUNT(*) FROM upvote WHERE reply=?) AS upvote, (SELECT COUNT(*) FROM upvote WHERE reply=? AND user=?) AS isUpvote, (SELECT COUNT(*) FROM comment WHERE reply=?) AS comments, (SELECT COUNT(*) FROM collection WHERE reply=? AND user=?) AS isCollect FROM reply LEFT JOIN user ON reply.answer=user.id WHERE reply.id=?;SELECT comment.id, content, commentor, date, name, photo FROM comment,user WHERE commentor=user.id AND reply=?;',
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

	getReplyById: (reply, callback) => {
		const body = {};
		connection.query(connection.format(ReplySQL.getReplyById, [reply.id, reply.id, reply.user, reply.id, reply.id, reply.user, reply.id, reply.id]), (err, results) => {
			if (err) {
				body.errMsg = '加载失败！';
				console.log(err)
			} else {
				body.sucMsg = '加载成功！';
				body.data = { ...results[0][0], comment: results[1] };
			}
			callback(body);
		});
	},
}