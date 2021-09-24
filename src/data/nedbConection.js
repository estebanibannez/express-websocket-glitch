//base de datos en memoria NeDb

const Datastore = require("nedb");

const messageCollection = new Datastore();

messageCollection.loadDatabase(function (err) {
  // Callback is optional
  // Now commands will be executed
  console.log(
    "\x1b[36m%s\x1b[0m",
    "============ conexion a la base de datos en memoria realizada =========",
  );
});


module.exports = { messageCollection };
