var express = require('express');
var router = express.Router();
const Follow = require('../models/follow');

router.post('/addFollow', (req, res, next) => {
	if (req.session.user) {
		const user = req.session.user.id;
		Follow.add({ ...req.body, user },(result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}		
});

router.post('/delFollow', (req, res, next) => {
	if (req.session.user) {
		const user = req.session.user.id;
		Follow.del({ ...req.body, user }, (result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}
});

module.exports = router;