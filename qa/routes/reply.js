var express = require('express');
var router = express.Router();
const Reply = require('../models/reply');

router.post('/getReply', (req, res, next) => {
	Reply.getReply(req.body, (result) => {
		res.status(200).json(result);
	});
});

router.post('/getReplyByUserId', (req, res, next) => {
	const answer = req.session.user.id;
	Reply.getReplyByUserId({ ...req.body, answer }, (result) => {
		res.status(200).json(result);
	});
});

router.post('/addReply', (req, res, next) => {
	const answer = req.session.user.id;
	Reply.addReply({ ...req.body, answer }, (result) => {
		res.status(200).json(result);
	});
});

module.exports = router;