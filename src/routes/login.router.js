const router = require("express").Router();
const passport = require("passport");
const controller = require("../controllers/login.controller");
const log4js = require("log4js");
const logger = log4js.getLogger('error');
// --------------- LOGIN -----------------
router.get("/signin", controller.getSignin);

router.post(
  "/signin",
  passport.authenticate("signin", {
    failureRedirect: "/faillogin",
    successRedirect: "/home"
  }),
  // controller.postSignin,
);

// ---------------SIGNUP------------------
router.get("/signup", controller.getSignup);

router.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  controller.postSignup,
);

router.get("/failsignup", controller.getFailsignup);

router.get("/faillogin", controller.getFaillogin);

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