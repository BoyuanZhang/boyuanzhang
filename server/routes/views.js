var controller = require('../controllers/view/views');

function init( app ) {
	app.get( '/', controller.home );
	app.get( '/*', controller.notfound );
};

exports.init = init;