const connection = require('../models/connection');

const QuestionSQL = {
	add: 'INSERT INTO question(title,discription,asker) VALUES(?,?,?)',
	getQuestion: 'SELECT title,discription,asker,name,photo,question.id FROM question LEFT JOIN user ON question.asker=user.id WHERE title LIKE ?',
	getQuestionByUserId: 'SELECT title,discription,asker,name,photo,question.id FROM question LEFT JOIN user ON question.asker=user.id WHERE asker=?',
	getQuestionById: 'SELECT title,discription,asker,name,photo,question.id,(SELECT COUNT(*) FROM follow WHERE question=?) AS follow,(SELECT COUNT(*) FROM follow WHERE question=? AND user=? ) AS isFollow FROM question LEFT JOIN user ON question.asker=user.id WHERE question.id=?;SELECT reply.id,content,date,name,photo,upvote,comment  FROM user,reply LEFT JOIN (SELECT reply,COUNT(*) AS upvote FROM upvote GROUP BY reply) upvote ON upvote.reply=reply.id LEFT JOIN (SELECT reply,COUNT(*) AS comment FROM comment GROUP BY reply) comment ON comment.reply=reply.id WHERE answer=user.id AND question=?',
};

module.exports = {

	add: (question, callback) => {
		const body = {};
		connection.query(connection.format(QuestionSQL.add, [question.title, question.discription, question.asker]), (err, results) => {
			if (err) {
				body.errMsg = '提交问题失败！';
				console.log(err)
			} else {
				body.sucMsg = '提交问题成功！';
			}
			callback(body);
		});		
	},

	getQuestion: (question, callback) => {
		const body = {};
		connection.query(connection.format(QuestionSQL.getQuestion, [`%${question.title}%`]), (err, results) => {
			if (err) {
				body.errMsg = '加载失败！';
				console.log(err)
			} else {
				body.data = results;
				body.sucMsg = '加载成功！';
			}
			callback(body);
		});	
	},

	getQuestionByUserId: (question, callback) => {
		const body = {};
		connection.query(connection.format(QuestionSQL.getQuestionByUserId, [question.asker]), (err, results) => {
			if (err) {
				body.errMsg = '加载失败！';
				console.log(err)
			} else {
				body.data = results;
				body.sucMsg = '加载成功！';
			}
			callback(body);
		});
	},

	getQuestionById: (question, callback) => {
		const body = {};
		connection.query(connection.format(QuestionSQL.getQuestionById, [question.id, question.id, question.user, question.id, question.id]), (err, results) => {
			if (err) {
				body.errMsg = '加载失败！';
				console.log(err)
			} else {
				body.data = { ...results[0][0], reply: results[1] };
				console.log(results[0], results[1])
				body.sucMsg = '加载成功！';
			}
			callback(body);
		});
	},

}