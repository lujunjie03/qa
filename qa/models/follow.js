const connection = require('../models/connection');

const FollowSQL = {
	add: 'INSERT INTO follow(question, user) VALUES(?,?)',
	del: 'DELETE FROM follow WHERE question=? AND user=?',
};

module.exports = {

	add: (follow, callback) => {
		const body = {};
		connection.query(connection.format(FollowSQL.add, [follow.question, follow.user]), (err, results) => {
			if (err) {
				body.errMsg = '关注失败！';
				console.log(err)
			} else {
				body.sucMsg = '关注成功！';
			}
			callback(body);
		});		
	},

	del: (follow,callback) => {
		const body = {};
		connection.query(connection.format(FollowSQL.del, [follow.question, follow.user]), (err, results) => {
			if (err) {
				body.errMsg = '取消关注失败！';
				console.log(err)
			} else {
				body.sucMsg = '取消关注成功！';
			}
			callback(body);
		});
	},
}