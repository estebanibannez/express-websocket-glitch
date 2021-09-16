const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const passport = require("passport");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const MongoStore = require("connect-mongo");
const path = require("path");
const config = require("./src/config/config");
const log4js = require("log4js");

// ------------------------- MIDDLEWARES -----------------------

app.set("views", path.join(__dirname, "/src/views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

log4js.configure({
  appenders: {
      loggerConsole: { type: "console" },
      loggerErrorWarns: { type: 'file', filename: './logs/warn.log' },
      loggerFileErrors: { type: 'file', filename: './logs/error.log' }
  },
  categories: {
    
      default: { appenders: ["loggerConsole"], level: "trace" },
      consola: { appenders: ["loggerConsole"], level: "trace" },
      warns: { appenders: ["loggerErrorWarns"], level: "warn" },
      error: { appenders: ["loggerFileErrors"], level: "error" }
  }
});

// ------------------------- SETTINGS --------------------------
require("dotenv").config();
require(`./src/data/conectiondb`);
require(`./src/passport/local-auth`);
// require(`./src/passport/facebook-auth`);

// ------------------------- STATIC FILES ----------------------
app.use(express.static(path.join(__dirname, "./src/public")));
// -------------------------------------------------------------

app.use(flash());

app.use(
  require("express-session")({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.MONGO_DB.URI,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: config.TIEMPO_EXPIRACION,
    },
  }),
);

// Global Variables
//middleware para flash
app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.logeadoMessage = req.flash('logeadoMessage');
  
  res.locals.user = req.user || null;
  // console.log(app.locals)
  next();
});



// -------------------------------------------------------------

// ---------------------------- ROUTES -------------------------
require("require-all")({
  dirname: path.join(__dirname, "./src/routes"),
  map: (name, path) => {
    app.use("/", require(path));
  },
});

// -------------------------------------------------------------
// middleware para excepciones no atrapadas
app.use((err, req, res, next) => {
  console.error(err.message);
  return res
    .status(500)
    .send({ status: 500, message: `internal error server ${err.message}` });
});

module.exports = app;
