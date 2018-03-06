var express = require('express');
var router = express.Router();
const Collection = require('../models/collection');

router.post('/addCollection', (req, res, next) => {
	const user = req.session.user.id;
	Collection.add({ ...req.body, user },(result) => {
		res.status(200).json(result);
	});
		
});

router.post('/delCollection', (req, res, next) => {
	const user = req.session.user.id;
	Collection.del({ ...req.body, user }, (result) => {
		res.status(200).json(result);
	});
});

module.exports = router;