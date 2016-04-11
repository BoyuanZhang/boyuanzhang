controller = require('../controllers/services/email');

function init(app){
	app.post('/services/email/send', controller.send);
};

exports.init = init;