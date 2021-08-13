const app = require("./server");
const config = require("./config/config");

// ------------------------- WEB SOCKETS ----------------------

const server = require("http").createServer(app);
const io = require("socket.io")(server);

const productos = require("./controllers/productos.controller");
const mensajes = require("./controllers/mensajes.controller");

io.on("connection", (socket) => {
  console.log(`cliente con ID: ${socket.id} CONECTADO AL WEBSOCKET.`);
  socket.emit("productos", productos.listar());

  //escuchando mensajes enviados por cliente
  socket.on("update", (data) => {
    //se propaga a todos los clientes conectados.
    io.sockets.emit("productos", productos.listar());
  });

  //mensajes
  socket.emit("messages", mensajes.readMessages());

  socket.on("new-message", (payload) => {
    console.log("llego al servidor un nuevo msg", payload);
    mensajes.addMessage(payload);

    socket.emit("messages", mensajes.readMessages());
  });
});

// -------------------------------------------------------------

// ---------------------------- APP LISTEN ---------------------
app.listen(config.PORT, () => {
  console.log(
    "\x1b[33m%s\x1b[0m",
    `============= servidor escuchando =============`,
  );
  console.log(`En puerto : http://localhost:${config.PORT}`);
  console.log(
    "\x1b[33m%s\x1b[0m",
    `============= Proceso PID: ${process.pid} =============`,
  );

});
// -------------------------------------------------------------

// ------------------------- EXCEPT ERROR ----------------------
app.on("error", (error) => {
  console.log("\x1b[41m", `error en el servidor: ${error}`);
});
