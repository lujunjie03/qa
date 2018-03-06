var express = require('express');
var router = express.Router();
const Upvote = require('../models/upvote');

router.post('/addUpvote', (req, res, next) => {
	const user = req.session.user.id;
	Upvote.add({ ...req.body, user },(result) => {
		res.status(200).json(result);
	});
		
});

router.post('/delUpvote', (req, res, next) => {
	const user = req.session.user.id;
	Upvote.del({ ...req.body, user }, (result) => {
		res.status(200).json(result);
	});
});

module.exports = router;