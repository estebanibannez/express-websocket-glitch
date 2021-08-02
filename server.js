const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const config = require("./config/config");
const MongoStore = require("connect-mongo");

require(`./data/conectiondb`);
//socket io
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
//configuraciones middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      //En Atlas connect App :  Make sure to change the node version to 2.2.12:
      mongoUrl: config.MONGO_URL,
      mongoOptions: advancedOptions,
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   expires: new Date().getTime() + minutes * 60 * 1000,
    // },
  }),
);

//configuracion de handlebars
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
  }),
);

//EXPORTANDO ROUTES
const ProductosRouter = require("./routers/productos.router");
const productos = require("./controllers/productos.controller");
const mensajes = require("./controllers/mensajes.controller");

// const Mensaje = require("./models/message");
// // const mensaje = new Mensaje();

//se establece el motor de plantilla
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

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

// middleware para excepciones no atrapadas
app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).send("Algo se rompio!");
});

//Seteo Rutas Producto
app.use("/api", ProductosRouter);
app.use("/api", require("./routers/login.router"));

//se establece ruta que expone archivos html , css, js
app.use(express.static(__dirname + "/public"));

server.listen(config.PORT, () => {
  console.log(
    `servidor escuchando en puerto : http://localhost:${config.PORT}`,
  );
});

// en caso de error
server.on("error", (error) => {
  console.log("error en el servidor:", error);
});
