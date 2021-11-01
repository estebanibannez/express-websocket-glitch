const path = require('path');

const { serverPort } = require('yargs/yargs')(process.argv.slice(2)).option('server-port', {
	alias: 'p',
	default: '8080',
}).argv;

// require('dotenv').config({
// 	path: path.resolve(process.cwd(), `${process.env.NODE_ENV}.env`),
// });

require('dotenv').config();

const sqlite3 = {
	client: 'sqlite3',
	connection: {
		filename: __dirname + '/../data/basedatosMariaDb.sqlite',
	},
	useNullAsDefault: true,
};

const mysql = {
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'basedatosMariaDb',
	},
	pool: { min: 0, max: 7 },
};

module.exports = {
	// NODE_ENV: process.env.NODE_ENV || "'development'",
	NODE_ENV: process.env.NODE_ENV || 'development',
	HOST: process.env.HOST || '127.0.0.1',
	PORT: process.env.PORT || parseInt(process.argv[2]) || serverPort,
	MONGO_DB: {
		URI:
			process.env.MONGO_URL ||
			'mongodb+srv://root:root@cluster0.jdgnu.mongodb.net/chatcoder?retryWrites=true&w=majority', //"mongodb://localhost:27017/chatcoder",
	},
	TIPOPERSISTENCIA: process.env.TIPOPERSISTENCIA, //mariadb - memory
	TIEMPO_EXPIRACION: process.env.TIEMPO_EXPIRACION || 10000,
	FACEBOOK_CLIENT_ID: process.argv[2] || process.env.FACEBOOK_CLIENT_ID || 'AC88750c917a154293f1d60ac9abf26267',
	FACEBOOK_CLIENT_SECRET: process.argv[3] || process.env.FACEBOOK_CLIENT_SECRET,
	GMAIL_USER: process.env.GMAIL_USER || 'hank.fay91@ethereal.email',
	GMAIL_PASS: process.env.GMAIL_PASS || 'mtC5C4YrtpjTYRZKPB',
	ACCOUNT_SID: process.env.ACCOUNT_SID || 'AC88750c917a154293f1d60ac9abf26267',
	AUTH_TOKEN: process.env.AUTH_TOKEN || 'd9f75b2c53a2ecaa1d3c8d3e661049c4',
	sqlite3,
	mysql,
};
