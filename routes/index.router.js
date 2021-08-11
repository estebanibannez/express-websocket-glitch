const router = require("express").Router();
const passport = require("passport");
const path = require("path");

//navego a la ruta principal Protegida
router.get("/", isAuthenticated, (req, res) => {
  return res.render("home");
});

//navego a la ruta principal Protegida
router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "home.html"));
  // return res.render("home");
});

//middleware para ver si el usuario está autenticado.
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/signin");
}
module.exports = router;
