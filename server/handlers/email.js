var secrets = require("../../secrets.js"),
	nodemailer = require("nodemailer");

function createHtmlBody(message) {
	return "<body>" + message + "</body>";
}

function createFromEmail(name) {
	return '"' + name + '" <' + secrets.fromEmail.email + '>'
}

function createSubject(email, subject) {
	return email + " - " + subject;
}

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: secrets.fromEmail.email,
        pass: secrets.fromEmail.password
    }
};

var handler = {
	'send': function(name, email, subject, message, callback) {
		var htmlMsg = createHtmlBody(message),
			fromEmail = createFromEmail(name),
			finalSubject = createSubject(email, subject);

		var transporter = nodemailer.createTransport(smtpConfig);

		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: fromEmail, // sender address
		    to: secrets.toEmail.email, // list of receivers
		    subject: finalSubject, // Subject line
		    text: message, // plaintext body
		    html: htmlMsg // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        callback(false);
		    }
		    
		    callback(true);
		});
	}
};

module.exports = handler;