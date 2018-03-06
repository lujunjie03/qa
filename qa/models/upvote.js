const connection = require('../models/connection');

const UpvoteSQL = {
	add: 'INSERT INTO upvote(reply, user) VALUES(?,?)',
	del: 'DELETE FROM upvote WHERE reply=? AND user=?',
};

module.exports = {

	add: (upvote, callback) => {
		const body = {};
		connection.query(connection.format(UpvoteSQL.add, [upvote.reply, upvote.user]), (err, results) => {
			if (err) {
				body.errMsg = '点赞失败！';
				console.log(err)
			} else {
				body.sucMsg = '点赞成功！';
			}
			callback(body);
		});		
	},

	del: (upvote,callback) => {
		const body = {};
		connection.query(connection.format(UpvoteSQL.del, [upvote.reply, upvote.user]), (err, results) => {
			if (err) {
				body.errMsg = '取消点赞失败！';
				console.log(err)
			} else {
				body.sucMsg = '取消点赞成功！';
			}
			callback(body);
		});
	},
}