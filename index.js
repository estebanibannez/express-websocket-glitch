const app = require("./server");
const config = require("./src/config/config");
const log4js = require("log4js");
const logger = log4js.getLogger("consola");

// ------------------------- WEB SOCKETS ----------------------

const http = require("http").Server(app);
const io = require("socket.io")(http);

const productos = require("./src/controllers/productos.controller");
const mensajesctrl = require("./src/controllers/mensajes.controller");

// -------------------------------------------------------------
// ---------------------------- APP LISTEN ---------------------
http.listen(config.PORT || 8080, () => {
  logger.info("servidor escuchando en puerto: " + config.PORT);
  console.log(
    "\x1b[33m%s\x1b[0m",
    `============= servidor escuchando =============`,
  );
  console.log(`http://localhost:${config.PORT}`);
  console.log(
    "\x1b[33m%s\x1b[0m",
    `============= Proceso PID: ${process.pid} =============`,
  );
});
// -------------------------------------------------------------

io.on("connection", async (socket) => {
  console.log(`cliente con ID: ${socket.id} CONECTADO AL WEBSOCKET.`);
  const listadoproductos = await productos.buscar();
  const listadomensajes = await mensajesctrl.findAll();
  socket.emit("productos", listadoproductos);

  //escuchando mensajes enviados por cliente
  socket.on("update", async (data) => {
    //se propaga a todos los clientes conectados.
    const listadoproductos = await productos.buscar();
    io.sockets.emit("productos", listadoproductos);
  });

  // //mensajes
  socket.emit("messages", listadomensajes);

  socket.on("new-message", async (payload) => {
    console.log("llego al servidor un nuevo msg", payload);
    mensajesctrl.create(payload);
    const mensajes = await mensajesctrl.findAll();
    io.sockets.emit("messages", mensajes);
  });
});
