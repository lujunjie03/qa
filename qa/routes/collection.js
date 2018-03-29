var express = require('express');
var router = express.Router();
const Collection = require('../models/collection');

router.post('/addCollection', (req, res, next) => {
	if (req.session.user) {
		const user = req.session.user.id;
		Collection.add({ ...req.body, user },(result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}		
});

router.post('/delCollection', (req, res, next) => {
	if (req.session.user) {
		const user = req.session.user.id;
		Collection.del({ ...req.body, user }, (result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}
});

module.exports = router;