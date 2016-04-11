var emailUtil = {
	validateSendReq: function(body) {
		var name = body.name,
			email = body.email,
			subject = body.subject,
			message = body.message;

		if(name && name.trim().length > 0 && body.email && body.email.length > 0 && 
			body.subject && body.subject.length > 0 && body.message && body.message.length > 0) {
			return true; 
		}
			
		return false;
	}
}

module.exports = emailUtil;