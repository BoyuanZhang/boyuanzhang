var express = require('express'),
	bodyParser = require('body-parser'),
	config = require('../config'),
	serviceRoutes = require('./routes/services'),
	viewRoutes = require('./routes/views'),
	app = express();

function start() {
	var port = config.serverport;

	var server = app.listen(port, function() {
		app.use(bodyParser.json());
		app.use(express.static('public'));

		serviceRoutes.init(app);
		viewRoutes.init(app);
		
		console.log('Server running on port: ' + port );
	});
};

exports.start = start;