const router = require("express").Router();
const config = require("../config/config");
const numCPUs = require("os").cpus().length;
const { fork } = require("child_process");
const log4js = require("log4js");
const logger = log4js.getLogger("consola");
const sendMail = require("../utils/mails");

//navego a la ruta principal Protegida
router.get("/", isAuthenticated, (req, res) => {
  return res.redirect("/signin");
});

//navego a la ruta principal Protegida
router.get("/home", isAuthenticated, (req, res) => {
  debugger;
  let userProfile = "??";
  // res.sendFile(path.join(__dirname, "../public", "home.html"));

  //envia correo ethereal
  sendMail.sendMail(
    "Servidor Node.js test",
    "hank.fay91@ethereal.email",
    "LOGIN",
    `Nombre ${
      req.user.name
      // userProfile._json.name
    } hora de log ${new Date()} foto de perfil ${
      req.user.picture["data"].url
      // userProfile._json.picture.data.url
    }`,
  );

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
  logger.trace("llamada a Profile");
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
  logger.trace("llamada a Datos");
  // loggerError.error("error test");
  res.send(
    `Servidor express <span style="color:blueviolet;">(Nginx)</span> en ${
      config.PORT
    } - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`,
  );
});

//navego a la ruta principal Protegida
router.get("/info", (req, res) => {
  logger.trace("llamada a Info");
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
  const logger = log4js.getLogger();

  return res.render("info", {
    data: data,
  });
});

router.get("/randoms", (req, res) => {
  logger.trace("llamada a Randoms");
  let cantidad = req.query.cant;

  const computo = fork("./serverChild.js");
  computo.send(cantidad || 10000000);

  computo.on("message", function (sum) {
    // Receive results from child process
    res.end(`El array de numeros es  ${JSON.stringify(sum)}`);
  });
});

module.exports = router;
