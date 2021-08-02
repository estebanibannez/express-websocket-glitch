// module of connection to the database.
const mongoose = require("mongoose");
const url = require("../config/config").MONGO_URL;

const connection = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("conexion a la base de datos realizada!", url);
});

mongoose.connection.on("error", (err) => {
  console.log("[Mongoose] - error:", err);
});

module.exports = connection;
