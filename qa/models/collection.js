const connection = require('../models/connection');

const CollectionSQL = {
	add: 'INSERT INTO collection(reply, user) VALUES(?,?)',
	del: 'DELETE FROM collection WHERE reply=? AND user=?',
};

module.exports = {

	add: (collection, callback) => {
		const body = {};
		connection.query(connection.format(CollectionSQL.add, [collection.reply, collection.user]), (err, results) => {
			if (err) {
				body.errMsg = '收藏失败！';
				console.log(err)
			} else {
				body.sucMsg = '收藏成功！';
			}
			callback(body);
		});		
	},

	del: (collection,callback) => {
		const body = {};
		connection.query(connection.format(CollectionSQL.del, [collection.reply, collection.user]), (err, results) => {
			if (err) {
				body.errMsg = '取消收藏失败！';
				console.log(err)
			} else {
				body.sucMsg = '取消收藏成功！';
			}
			callback(body);
		});
	},
}