var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.post('/', function(req, res, next) {
	res.status(200).json('ljj');
});

router.post('/login', (req, res, next) => {

	User.login(req.body,(result) => {
		if (result.sucMsg) {
			req.session.user = result.data;
		}
		res.status(200).json(result);
	});
		
});

router.post('/register', (req, res, next) => {

	User.register(req.body, (result) => {
		if (result.sucMsg) {
			req.session.user = result.data;
		}
		res.status(200).json(result);
	});
});

module.exports = router;
