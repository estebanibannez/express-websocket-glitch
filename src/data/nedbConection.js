//base de datos en memoria NeDb
if ((process.env.NODE_ENV || '').trim() !== 'production' && process.env.TIPOPERSISTENCIA == 'memory') {
	const Datastore = require('nedb');

	const messageCollection = new Datastore();
	const productsCollection = new Datastore();
	const cartCollection = new Datastore();

	messageCollection.loadDatabase(function(err) {
		// Callback is optional
		// Now commands will be executed
		console.log('\x1b[36m%s\x1b[0m', '============ conexion a la base de datos en memoria realizada =========');
	});

	module.exports = { messageCollection , productsCollection, cartCollection};
}
