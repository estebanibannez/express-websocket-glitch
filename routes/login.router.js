const router = require("express").Router();
const passport = require("passport");
const controller = require("../controllers/login.controller");

// router.get("/sin-session", (req, res) => {
//   let contador = 0;
//   res.send({ contador: ++contador });
// });

// router.get("/con-session", (req, res) => {
//   if (req.session.contador) {
//     req.session.contador++;
//     res.send(`Ud ha visitado el sitio ${req.session.contador} veces.`);
//   } else {
//     req.session.contador = 1;
//     res.send("Bienvenido a su primera visita al sitio!");
//   }
// });

// --------------- LOGIN -----------------
router.get("/signin", controller.getSignin);
// http://localhost:8080/api/signin
// {
// 	"username":"estebanibannezp",
// 	"password": "1234"
// }
router.post(
  "/signin",
  passport.authenticate("local-signin", {
    failureRedirect: "/faillogin",
    successRedirect: "/home",
  }),
);

// ---------------SIGNUP------------------
router.get("/signup", controller.getSignup);
// http://localhost:8080/api/signup

// {
// 	"username":"estebanibannezp",
// 	"firstname":"Esteban",
// 	"lastname": "Ibanez",
// 	"email":"e.ibannez.p@gmail.com",
// 	"password": "1234"
// }
router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/home",
    failureRedirect: "/failsignup",
    passReqToCallback: true,
  })
);

// router.get("/ruta-protegida", controller.rutaProtegida);

router.get("/failsignup", controller.getFailsignup);

router.get("/faillogin", controller.getFaillogin);

// http://localhost:8080/api/logout
router.get("/logout", controller.getLogout);

// ------------------------------------
// router.post("/login", (req, res) => {
//   if (!req.body.username || !req.body.password) {
//     res.send("login fallo");
//   } else if (req.body.username == "admin" || req.body.password == "1234") {
//     req.session.user = "admin";
//     req.session.admin = true;

//     let date = new Date();
//     date.setTime(date.getTime() + 60 * 10000);

//     req.session.cookie.expires = date;
//     res.send({ User: req.session });
//   }
// });

//middleware para verificar si usuario está logeado
const auth = (req, res, next) => {
  if (req.session && req.session.user == "admin" && req.session.admin) {
    return next();
  } else {
    return res.status(401).send("No autorizado");
  }
};

router.get("/contenido", auth, (req, res) => {
  res.send("solo un administrador puede ver esta info");
});

// --------------- autenticación con Facebook ----------------- //
router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/api/datos",
    failureRedirect: "/faillogin",
  }),
);

// router.get("/datos", (req, res) => {
//   console.log(req.user);
//   if (req.isAuthenticated()) {
//     res.send("<h1>datos protegidos</h1>");
//   } else {
//     res.status(401).send("debe autenticarse primero");
//   }
// });

router.get("/faillogin", (req, res) => {
  res.status(401).send({ error: "no se pudo autenticar con facebook" });
});

module.exports = router;
