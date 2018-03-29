const connection = require('../models/connection');

const MessageSQL = {
	get: `
		SELECT reply.id,title,answer,name,photo,reply.date 
		FROM reply 
		LEFT JOIN question ON question.id=reply.id 
		LEFT JOIN user ON reply.answer=user.id 
		WHERE question.asker=? AND reply.state=1 
		ORDER BY date DESC; 
		SELECT reply.id,comment.content,title,commentor,name,photo,comment.date 
		FROM comment 
		LEFT JOIN reply ON comment.reply=reply.id 
		LEFT JOIN question ON reply.question=question.id 
		LEFT JOIN user ON commentor=user.id WHERE reply.answer=? AND comment.state=1 
		ORDER BY date DESC;`,
};

module.exports = {

	get: (message, callback) => {
		const body = {};
		connection.query(connection.format(MessageSQL.get, [message.user, message.user]), (err, results) => {
			if (err) {
				body.errMsg = '加载失败！';
				console.log(err)
			} else {
				body.data=results[0].concat(results[1]);
				body.sucMsg = '加载成功！';
			}
			callback(body);
		});		
	},
}