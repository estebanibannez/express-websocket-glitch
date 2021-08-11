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

// ------------------------- MIDDLEWARES -----------------------
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true})); // New
app.use(express.json());
app.use(cookieParser());

// ------------------------- SETTINGS --------------------------
require("dotenv").config();
require(`./data/conectiondb`);
require(`./passport/local-auth`);

// -------------------------------------------------------------


// ------------------ VIEW ENGINE CONFIG -----------------------
app.engine('hbs', exphbs( {extname: '.hbs' }));
app.set('view engine', 'hbs');

// app.engine(
//   "hbs",
//   exphbs({
//     defaultLayout: "main",
//     layoutsDir: path.join(app.get("views"), "layouts"),
//     partialsDir: path.join(app.get("views"), "partials"),
//     extname: ".hbs",
//   }),
// );
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");
// -------------------------------------------------------------


// ------------------------- STATIC FILES ----------------------
app.use(express.static(path.join(__dirname, "public")));
// -------------------------------------------------------------

app.use(flash());

app.use(require('express-session')({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}));

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

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   app.locals.signinMessage = req.flash("signinMessage");
//   app.locals.signupMessage = req.flash("signupMessage");
//   app.locals.user = req.user;
//   // console.log(app.locals)
//   next();
// });
// -------------------------------------------------------------

// ---------------------------- ROUTES -------------------------
require("require-all")({
  dirname: path.join(__dirname, "routes"),
  map: (name, path) => {
    app.use("/", require(path));
  },
});

// -------------------------------------------------------------
// middleware para excepciones no atrapadas
app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).send("Algo se rompio!");
});


module.exports = app;
