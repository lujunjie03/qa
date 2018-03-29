var express = require('express');
var router = express.Router();
const Message = require('../models/message');

router.post('/getMessage', (req, res, next) => {
	if (req.session.user) {
		const user = req.session.user.id;
		Message.get({ ...req.body, user },(result) => {
			res.status(200).json(result);
		});
	} else {
		res.status(200).json({ back: '未登录！', errMsg: '未登录！' });
	}		
});

module.exports = router;