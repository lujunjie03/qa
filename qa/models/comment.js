const connection = require('../models/connection');

const CommentSQL = {
	addComment: 'INSERT INTO comment(content,commentor,reply) VALUES(?,?,?)',
	delete: 'UPDATE comment SET state=0,content=? WHERE id=? AND commentor=?'
};


module.exports = {
	add: (comment, callback) => {
		const body = {};
		connection.query(connection.format(CommentSQL.addComment, [comment.content, comment.commentor, comment.reply]), (err, results) => {
			if (err) {
				body.errMsg = '评论失败！';
				console.log(err)
			} else {
				body.sucMsg = '评论成功！';
			}
			callback(body);
		});
	},

	delete: (comment, callback) => {
		const body = {};
		connection.query(connection.format(CommentSQL.delete, ['该评论已被删除', comment.id, comment.commentor]), (err, results) => {
			if (err) {
				body.errMsg = '删除评论失败！';
				console.log(err)
			} else {
				body.sucMsg = '删除评论成功！';
			}
			callback(body);
		});
	},
}