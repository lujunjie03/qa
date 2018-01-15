var express = require('express');
var router = express.Router();
const Reply = require('../models/reply');

router.post('/getReply', (req, res, next) => {
	Reply.getReply(req.body,(result) => {
		res.status(200).json(result);
	});
		
});

module.exports = router;