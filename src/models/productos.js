const mongoose = require("mongoose");

const schema = mongoose.Schema({
  nombre: { type: String, required: true, max: 100 },
  descripcion: { type: String, required: true, max: 100 },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, max: 100 },
});

const Productos = mongoose.model("producto", schema);

module.exports = Productos;
