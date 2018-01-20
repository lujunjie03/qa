var express = require('express');
var router = express.Router();
const Question = require('../models/question');

router.post('/addQuestion', (req, res, next) => {
	const asker = req.session.user.id;
	Question.add({ ...req.body, asker },(result) => {
		res.status(200).json(result);
	});

});

router.post('/getQuestion', (req, res, next) => {
	Question.getQuestion(req.body, (result) => {
		res.status(200).json(result);
	});
});

router.post('/getQuestionByUserId', (req, res, next) => {
	const asker = req.session.user.id;
	Question.getQuestionByUserId({ ...req.body, asker }, (result) => {
		res.status(200).json(result);
	});
});

router.post('/getQuestionById', (req, res, next) => {
	Question.getQuestionById({ ...req.body }, (result) => {
		res.status(200).json(result);
	});
});


module.exports = router;