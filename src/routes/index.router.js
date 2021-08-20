const router = require("express").Router();
const passport = require("passport");
const path = require("path");
const config = require("../config/config");
const numCPUs = require("os").cpus().length;
const { fork } = require('child_process');
//navego a la ruta principal Protegida
router.get("/", isAuthenticated, (req, res) => {
  return res.redirect("/signin");
});

//navego a la ruta principal Protegida
router.get("/home", isAuthenticated, (req, res) => {
  // res.sendFile(path.join(__dirname, "../public", "home.html"));

  return res.render("home", {
    // Enviamos como variables un título
    // y objeto 'user' que contiene toda
    // la información del usuario y viaja en el 'request'
    title: "Ejemplo de Passport JS",
    user: req.user,
  });
});

router.get("/profile", isAuthenticated, (req, res) => {
  // res.sendFile(path.join(__dirname, "../public", "home.html"));

  return res.render("profile", {
    user: req.user,
  });
});

//middleware para ver si el usuario está autenticado.
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/signin");
}

router.get("/datos", (req, res) => {
  res.send(
    `Servidor express <span style="color:blueviolet;">(Nginx)</span> en ${config.PORT} - <b>PID ${
      process.pid
    }</b> - ${new Date().toLocaleString()}`,
  );
});

//navego a la ruta principal Protegida
router.get("/info", (req, res) => {
  const data = {
    arg1: process.argv[2],
    arg2: process.argv[3],
    platform: process.platform,
    nodeVersion: process.version,
    memoryUse: process.memoryUsage(),
    path: process.cwd(),
    processId: process.pid,
    numProcesor: numCPUs | "",
  };

  return res.render("info", {
    data: data,
  });
});

router.get("/randoms", (req, res) => {
  let cantidad = req.query.cant;

  const computo = fork("./serverChild.js");
  computo.send(cantidad || 10000000);

  computo.on("message", function (sum) {
    // Receive results from child process
    res.end(`El array de numeros es  ${JSON.stringify(sum)}`);
  });
});

module.exports = router;
