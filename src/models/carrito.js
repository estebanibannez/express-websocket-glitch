const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	username: { type: String, require: true, max: 100 },
	carId: { type: Number, require: true },
	carTimestamp: { type: Date, default: new Date() },
	id: { type: Number, require: true },
	timestamp: { type: Date, default: new Date() },
	nombre: { type: String, require: true, max: 100 },
	descripcion: { type: String, require: true, max: 100 },
	codigo: { type: String, require: true, max: 100 },
	categoria: { type: String, require: true, max: 100 },
	foto: { type: String, require: true, max: 100 },
	precio: { type: Number, require: true, max: 100 },
	stock: { type: Number, require: true, max: 100 },
});

const Carrito = mongoose.model('carrito', schema);

module.exports = Carrito;
