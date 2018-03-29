var express = require('express');
var router = express.Router();
const Question = require('../models/question');

router.post('/addQuestion', (req, res, next) => {
	if (req.session.user) {
		const asker = req.session.user.id;
		Question.add({ ...req.body, asker },(result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}
});

router.post('/getQuestion', (req, res, next) => {
	Question.getQuestion(req.body, (result) => {
		res.status(200).json(result);
	});
});

router.post('/getQuestionByUserId', (req, res, next) => {
	if (req.session.user) {
		const asker = req.session.user.id;
		Question.getQuestionByUserId({ ...req.body, asker }, (result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}
});

router.post('/getQuestionById', (req, res, next) => {
	if (req.session.user) {
		const user = req.session.user.id;
		Question.getQuestionById({ ...req.body, user }, (result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}
});

router.post('/getFollowQuestion', (req, res, next) => {
	if (req.session.user) {
		const user = req.session.user.id;
		Question.getFollowQuestion({ ...req.body, user }, (result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}
});


module.exports = router;