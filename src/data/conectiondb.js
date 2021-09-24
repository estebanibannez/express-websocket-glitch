// module of connection to the database.
const mongoose = require("mongoose");
const URL = require("../config/config").MONGO_DB.URI;

const connection = mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    "============ conexion a la base de datos MONGO realizada =========",
  );
  // console.log("\x1b[36m%s\x1b[0m", URL);
});

mongoose.connection.on("error", (err) => {
  console.log("[Mongoose] - error:", err);
});

module.exports = connection;
