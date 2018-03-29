var express = require('express');
var router = express.Router();
const Reply = require('../models/reply');

router.post('/getReply', (req, res, next) => {
	Reply.getReply(req.body, (result) => {
		res.status(200).json(result);
	});
});

router.post('/getReplyByUserId', (req, res, next) => {
	if (req.session.user) {
		const answer = req.session.user.id;
		Reply.getReplyByUserId({ ...req.body, answer }, (result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}
});

router.post('/getCollectReply', (req, res, next) => {
	if (req.session.user) {
		const user = req.session.user.id;
		Reply.getCollectReply({ ...req.body, user }, (result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}
});

router.post('/addReply', (req, res, next) => {
	if (req.session.user) {
		const answer = req.session.user.id;
		Reply.addReply({ ...req.body, answer }, (result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}
});

router.post('/delReply', (req, res, next) => {
	if (req.session.user) {
		const answer = req.session.user.id;
		Reply.delReply({ ...req.body, answer }, (result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}
});

router.post('/getReplyById', (req, res, next) => {
	if (req.session.user) {
		const user = req.session.user.id;
		Reply.getReplyById({ ...req.body, user }, (result) => {
			res.status(200).json(result);
		})
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}
});

module.exports = router;