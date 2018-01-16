const connection = require('../models/connection');

const QuestionSQL = {
	add: 'INSERT INTO question(title,discription,asker) VALUES(?,?,?)',
	getQuestion: 'SELECT title,discription,asker,name,photo,question.id FROM question LEFT JOIN user ON question.asker=user.id WHERE title LIKE ?',
	getQuestionByUserId: 'SELECT title,discription,asker,name,photo,question.id FROM question LEFT JOIN user ON question.asker=user.id WHERE asker=?',
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
	}

}