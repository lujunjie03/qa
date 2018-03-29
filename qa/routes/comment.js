var express = require('express');
var router = express.Router();
const Comment = require('../models/comment');

router.post('/addComment', (req, res, next) => {
	if (req.session.user) {
		const commentor = req.session.user.id;
		Comment.add({ ...req.body, commentor },(result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}		
});

router.post('/delComment', (req, res, next) => {
	if (req.session.user) {
		const commentor = req.session.user.id;
		Comment.delete({ ...req.body, commentor },(result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}		
});

module.exports = router;