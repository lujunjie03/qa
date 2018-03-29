var express = require('express');
var router = express.Router();
const Upvote = require('../models/upvote');

router.post('/addUpvote', (req, res, next) => {
	if (req.session.user) {
		const user = req.session.user.id;
		Upvote.add({ ...req.body, user },(result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}		
});

router.post('/delUpvote', (req, res, next) => {
	if (req.session.user) {
		const user = req.session.user.id;
		Upvote.del({ ...req.body, user }, (result) => {
			res.status(200).json(result);
		});	
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}
});

module.exports = router;