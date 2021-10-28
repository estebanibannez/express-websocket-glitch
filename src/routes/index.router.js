const router = require('express').Router();
const config = require('../config/config');
const numCPUs = require('os').cpus().length;
const { fork } = require('child_process');
const log4js = require('log4js');
const logger = log4js.getLogger('consola');
const path = require('path');
const sendMail = require('../utils/mails');
const controller = require('../controllers/productos.controller');
const controllerMsg = require('../controllers/mensajes.controller');
const Order = require('../models/order');
const Cart = require('../models/cart');
// const csrf = require('csurf');
// const csrfProtection = csrf();
// router.use(csrfProtection);

router.get('/', async (req, res) => {
	const productChunks = await controller.buscar();
	console.log(productChunks);
	res.render('ecommerce', {
		title: 'Shopping Cart',
		products: productChunks,
		// successMsg: successMsg,
		// noMessages: !successMsg,
	});
	// return res.render('signin');
});

//navego a la ruta principal Protegida
router.get('/admin', isAuthenticated, async (req, res) => {
	//envia correo ethereal
	// sendMail.sendMail(
	//   "Servidor Node.js test",
	//   "hank.fay91@ethereal.email",
	//   "LOGIN",
	//   `Nombre ${
	//     req.user.firstName
	//     // userProfile._json.name
	//   } hora de log ${new Date()} foto de perfil ${
	//     req.user.photo["data"].url ? req.user.photo["data"].url : ""
	//     // userProfile._json.picture.data.url
	//   }`,
	// );

	let result = await controller.buscar();
	let mensajes = await controllerMsg.findAll();

	// res.render('administracion', {
	// 	csrfToken: req.csrfToken(),
	// 	products: result,
	// 	messages: mensajes,
	// });
	return res.sendFile(path.join(__dirname, '../public', 'home.html'));
});

router.get('/user/profile', isAuthenticated, (req, res) => {
	logger.trace('llamada a Profile');
	Order.find({ user: req.user }, (err, orders) => {
		if (err) {
			return res.write('Error!');
		}
		let cart;
		orders.forEach((order) => {
			cart = new Cart(order.cart);
			order.items = cart.generateArray();
		});
		res.render('user/profile', { orders: orders });
	}).lean();
});

router.get('/datos', (req, res) => {
	logger.trace('llamada a Datos');
	// loggerError.error("error test");
	res.send(
		`Servidor express <span style="color:blueviolet;">(Nginx)</span> en ${config.PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`,
	);
});

//navego a la ruta principal Protegida
router.get('/info', (req, res) => {
	logger.trace('llamada a Info');
	const data = {
		arg1: process.argv[2] || config.FACEBOOK_CLIENT_ID,
		arg2: process.argv[3] || config.FACEBOOK_CLIENT_SECRET,
		platform: process.platform,
		nodeVersion: process.version,
		memoryUse: process.memoryUsage(),
		path: process.cwd(),
		processId: process.pid,
		numProcesor: numCPUs | '',
	};

	return res.render('info', {
		data: data,
	});
});

router.get('/randoms', (req, res) => {
	logger.trace('llamada a Randoms');
	let cantidad = req.query.cant;

	const computo = fork('./serverChild.js');
	computo.send(cantidad || 10000000);

	computo.on('message', function(sum) {
		// Receive results from child process
		res.end(`El array de numeros es  ${JSON.stringify(sum)}`);
	});
});

//middleware para ver si el usuario está autenticado.
function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/');
	}
}

router.get('/ecommerce', async (req, res) => {
	let result = await controller.buscar();

	let mensajes = await controllerMsg.findAll();
	return res.render('ecommerce', {
		user: req.user,
		products: result,
		messages: mensajes,
	});
});

router.get('/add-to-cart/:id', async (req, res, next) => {
	try {
		let productId = req.params.id;
		// var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
		let cart = new Cart(req.session.cart ? req.session.cart : {});

		const producto = await controller.buscarPorId(productId);

		cart.add(producto, producto.id);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('/ecommerce');
	} catch (error) {
		console.log('Ocurrió un error.');
		return res.redirect('/ecommerce');
	}
});

router.get('/reduce/:id', (req, res, next) => {
	let productId = req.params.id;
	let cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.reduceByOne(productId);
	req.session.cart = cart;
	res.redirect('/shopping-cart');
});

router.get('/remove/:id', (req, res, next) => {
	let productId = req.params.id;
	let cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.removeItem(productId);
	req.session.cart = cart;
	res.redirect('/shopping-cart');
});

//redirecciona al carro de compras
router.get('/shopping-cart', (req, res, next) => {
	if (!req.session.cart) {
		return res.render('shopping-cart', { products: null });
	}
	let cart = new Cart(req.session.cart);
	res.render('shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
});

module.exports = router;
