const router = require("express").Router();
const passport = require('passport');

//navego a la ruta principal Protegida
router.get("/", isAuthenticated, (req, res) => {
  return res.render("home");
});

//navego a la ruta principal Protegida
router.get("/home", isAuthenticated, (req, res) => {
  return res.render("home");
});

//middleware para ver si el usuario está autenticado.
function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/signin')
}
module.exports = router;
