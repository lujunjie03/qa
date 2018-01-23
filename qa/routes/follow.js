var express = require('express');
var router = express.Router();
const Follow = require('../models/follow');

router.post('/addFollow', (req, res, next) => {
	const user = req.session.user.id;
	Follow.add({ ...req.body, user },(result) => {
		res.status(200).json(result);
	});
		
});

router.post('/delFollow', (req, res, next) => {
	const user = req.session.user.id;
	Follow.del({ ...req.body, user }, (result) => {
		res.status(200).json(result);
	});
});

module.exports = router;