const connection = require('../models/connection');

const ReplySQL = {
	getReply: `
		SELECT question,answer,content,reply.date,reply.id,name,photo,title,upvote,comment 
		FROM reply 
		LEFT JOIN user ON reply.answer=user.id 
		LEFT JOIN question ON reply.question=question.id 
		LEFT JOIN (SELECT reply,COUNT(*) AS upvote FROM upvote GROUP BY reply) upvote ON reply.id=upvote.reply 
		LEFT JOIN (SELECT reply,COUNT(*) AS comment FROM comment WHERE state=1 GROUP BY reply) comment ON reply.id=comment.reply 
		WHERE reply.state=1 AND title LIKE ? 
		ORDER BY date DESC`,

	getReplyByUserId: `
		SELECT answer,content,reply.date,reply.id,title,question,comment,upvote 
		FROM reply 
		LEFT JOIN question ON reply.question=question.id 
		LEFT JOIN (SELECT reply,COUNT(*) AS upvote FROM upvote GROUP BY reply) upvote ON reply.id=upvote.reply 
		LEFT JOIN (SELECT reply,COUNT(*) AS comment FROM comment WHERE state=1 GROUP BY reply) comment ON reply.id=comment.reply 
		WHERE state=1 AND answer=? 
		ORDER BY date DESC`,

	addReply: `INSERT INTO reply(content,answer,question) VALUES(?,?,?)`,

	delReply: `
		UPDATE reply 
		SET state=0,content=? 
		WHERE id=? AND answer=?`,

	getReplyById: `
		SELECT reply.id, content, answer, question, date, name, photo, 
			(SELECT COUNT(*) FROM upvote WHERE reply=?) AS upvote, 
			(SELECT COUNT(*) FROM upvote WHERE reply=? AND user=?) AS isUpvote, 
			(SELECT COUNT(*) FROM comment WHERE state=1 AND reply=?) AS comments, 
			(SELECT COUNT(*) FROM collection WHERE reply=? AND user=?) AS isCollect 
		FROM reply 
		LEFT JOIN user ON reply.answer=user.id 
		WHERE reply.id=?;

		SELECT comment.id, content, commentor, date, name, photo 
		FROM comment,user 
		WHERE commentor=user.id AND reply=? AND state=1;`,

	getCollectReply: `
		SELECT question,answer,content,reply.id,name,photo,title,upvote,comment 
		FROM collection,reply 
		LEFT JOIN user ON reply.answer=user.id 
		LEFT JOIN question ON reply.question=question.id 
		LEFT JOIN (SELECT reply,COUNT(*) AS upvote FROM upvote GROUP BY reply) upvote ON reply.id=upvote.reply 
		LEFT JOIN (SELECT reply,COUNT(*) AS comment FROM comment WHERE state=1 GROUP BY reply) comment ON reply.id=comment.reply 
		WHERE collection.reply=reply.id AND reply.state=1 AND collection.user=? 
		ORDER BY collection.date DESC`,
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

	delReply: (reply, callback) => {
		const body = {};
		connection.query(connection.format(ReplySQL.delReply, ['该回答已被删除', reply.id, reply.answer]), (err, results) => {
			if (err) {
				body.errMsg = '删除回答失败！';
				console.log(err)
			} else {
				body.sucMsg = '删除回答成功！';
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

	getCollectReply:  (reply, callback) => {
		const body = {};
		connection.query(connection.format(ReplySQL.getCollectReply, [reply.user]), (err, results) => {
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
}