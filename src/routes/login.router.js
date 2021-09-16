const router = require("express").Router();
const passport = require("passport");
const controller = require("../controllers/login.controller");
const log4js = require("log4js");
const logger = log4js.getLogger("error");

// --------------- LOGIN -----------------
router.get("/login", async (req, res) => {
  try {
    res.render("signin", {});
  } catch (error) {}
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/faillogin",
    successRedirect: "/home",
  }),
);

// ---------------REGISTRO------------------
router.get("/register", async (req, res) => {
  try {
    res.render("signup", {});
  } catch (error) {}
});

router.post(
  "/register",
  passport.authenticate("registro", {
    successRedirect: "/home",
    failureRedirect: "/register",
    failureFlash: true,
  }),
);

router.get("/failsignup", async (req, res) => {
  try {
    return res.render("signup-error");
  } catch (error) {}
});

router.get("/faillogin", async (req, res) => {
  try {
    return res.render("login-error");
  } catch (error) {}
});

router.get("/logout", controller.getLogout);

// //middleware para verificar si usuario está logeado
// const auth = (req, res, next) => {
//   if (req.session && req.session.user == "admin" && req.session.admin) {
//     return next();
//   } else {
//     return res.status(401).send("No autorizado");
//   }
// };

// router.get("/contenido", auth, (req, res) => {
//   res.send("solo un administrador puede ver esta info");
// });

// // --------------- autenticación con Facebook ----------------- //
router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/home",
    failureRedirect: "/faillogin",
  }),
);

router.get("/faillogin", (req, res) => {
  logger.error("Ocurrió un error con el login");
  res.status(401).send({ error: "no se pudo autenticar con facebook" });
});

module.exports = router;
