var emailUtil = require('../util/email/util'),
	emailHandler = require('../../handlers/email')

var controller = {
	'send': function(req, res) {
		if(!emailUtil.validateSendReq(req.body)) {
			res.statusCode = 400;
			res.end();
			return;
		}
		var body = req.body;

		emailHandler.send(body.name, body.email, body.subject, body.message, function(success) {
			if(success) {
				res.statusCode = 200;
				res.end();
			} else {
				res.statusCode = 500;
				res.end();
			}
		});
	}
};

module.exports = controller;