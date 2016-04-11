var controller = {
	'home' : function( req, res ) {
		res.sendFile('index.html');
	},
	'notfound' : function( req, res ) {
		res.status(404).send('404 error, resource not found!');
	}
};

module.exports = controller;