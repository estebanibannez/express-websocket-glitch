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
const config = require("./config/config");

// ------------------------- SETTINGS -------------------------
require("dotenv").config();
require(`./data/conectiondb`);
require(`./passport/local-auth`);

// -------------------------------------------------------------
// ------------------------- MIDDLEWARES -----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
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
// middleware para excepciones no atrapadas
app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).send("Algo se rompio!");
});

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash("signinMessage");
  app.locals.signupMessage = req.flash("signupMessage");
  app.locals.user = req.user;
  // console.log(app.locals)
  next();
});
// -------------------------------------------------------------
// ------------------ VIEW ENGINE CONFIG -----------------------
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main.hbs",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  }),
);
app.set("view engine", "handlebars");
app.set("view engine", ".hbs");
// -------------------------------------------------------------


// ---------------------------- ROUTES -------------------------
require("require-all")({
  dirname: path.join(__dirname, "routes"),
  map: (name, path) => {
    app.use("/", require(path));
  },
});
// -------------------------------------------------------------


module.exports = app;
