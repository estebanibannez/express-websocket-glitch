const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const config = require("./config/config");
const MongoStore = require("connect-mongo");
const path = require("path");
const hash = require("./utils/utils");
require("dotenv").config();
//models
const User = require("./models/users");

// completar con sus credenciales
// const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
// const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;

require(`./data/conectiondb`);
//socket io
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//configuraciones middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.MONGO_URL,
      mongoOptions: advancedOptions,
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: config.TIEMPO_EXPIRACION,
    },
  }),
);

// app.use(
//   require("express-session")({
//     secret: "keyboard cat",
//     cookie: {
//       httpOnly: false,
//       secure: false,
//       maxAge: config.TIEMPO_EXPIRACION,
//     },
//     rolling: true,
//     resave: true,
//     saveUninitialized: false,
//   }),
// );

// inicializamos passport
app.use(passport.initialize());
app.use(passport.session());

//-------- LOGIN PASSPORT -------//
passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      // check in mongo if a user with username exists or not
      User.findOne({ username: username }, function (err, user) {
        // In case of any error, return using the done method
        if (err) return done(err);
        // Username does not exist, log error & redirect back
        if (!user) {
          console.log("User Not Found with username " + username);
          return done(
            null,
            false,
            //req.flash('message', 'User Not found.'));
            console.log("message", "User Not found."),
          );
        }
        // User exists but wrong password, log the error
        if (!hash.isValidPassword(user, password)) {
          console.log("Invalid Password");
          return done(
            null,
            false,
            //req.flash('message', 'Invalid Password'));
            console.log("message", "Invalid Password"),
          );
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user);
      });
    },
  ),
);

//-------- REGISTER PASSPORT -------//
passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      findOrCreateUser = function () {
        // find a user in Mongo with provided username
        User.findOne({ username: username }, function (err, user) {
          // In case of any error return
          if (err) {
            console.log("Error in SignUp: " + err);
            return done(err);
          }
          // already exists
          if (user) {
            console.log("User already exists");
            return done(
              null,
              false,
              //req.flash('message','User Already Exists'));
              console.log("message", "User Already Exists"),
            );
          } else {
            // if there is no user with that email
            // create the user
            var newUser = new User();
            // set the user's local credentials
            newUser.username = username;
            newUser.password = hash.createHash(password);
            newUser.email = req.body.email;
            newUser.firstName = req.body.firstname;
            newUser.lastName = req.body.lastname;

            // save the user
            newUser.save(function (err) {
              if (err) {
                console.log("Error in Saving user: " + err);
                throw err;
              }
              console.log("User Registration succesful");
              return done(null, newUser);
            });
          }
        });
      };
      // Delay the execution of findOrCreateUser and execute
      // the method in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    },
  ),
);

// ------- configuramos passport para usar facebook
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_CLIENT_ID,
//       clientSecret: FACEBOOK_CLIENT_SECRET,
//       callbackURL: "/api/auth/facebook/callback",
//       profileFields: ["id", "displayName", "photos", "emails"],
//       scope: ["email"],
//     },
//     function (accessToken, refreshToken, profile, done) {
//       let userProfile = profile._json;

//       console.log("Perfil de usuario logeado : ", userProfile);
//       return done(null, userProfile);
//     },
//   ),
// );

//configuracion de handlebars
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "login.hbs",
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
  }),
);

//CONTROLLERS
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

//RUTAS.
require("require-all")({
  dirname: path.join(__dirname, "routes"),
  map: (name, path) => {
    app.use("/api", require(path));
  },
});

// app.use("/api", require("./routes/productos.router"));
// app.use("/api", require("./routes/login.router"));

app.get("/", checkAuthentication, (req, res) => {
  //do something only if user is authenticated
  var user = req.user;
  console.log(user);
  if (user) {
    return res
      .status(200)
      .json({ status: "ok", message: "Usuario Encontrado", body: user });
  }

  //navego a la ruta principal Protegida
  // res.render("ruta-protegida", { user });
  // res.redirect("/api/ruta-protegida");
});

//middleware para ver si el usuario está autenticado.
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/api/login");
  }
}

//se establece ruta que expone archivos html , css, js
app.use(express.static(__dirname + "/public"));

server.listen(config.PORT, () => {
  console.log(
    "\x1b[33m%s\x1b[0m",
    `============= servidor escuchando =============`,
  );

  console.log(`En puerto : http://localhost:${config.PORT}`);
});

// en caso de error
server.on("error", (error) => {
  console.log("\x1b[41m", `error en el servidor: ${error}`);
});
