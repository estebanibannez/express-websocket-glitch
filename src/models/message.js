const mongoose = require("mongoose");

const schema = mongoose.Schema({
  mensaje: { type: String, max: 400 },
  autor: { type: String, max: 200 },
  email: { type: String },
  timestamp: { type: Date, default: new Date() },
});
const Message = mongoose.model("mensaje", schema);

module.exports = Message;
