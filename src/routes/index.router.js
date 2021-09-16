const router = require("express").Router();
const config = require("../config/config");
const numCPUs = require("os").cpus().length;
const { fork } = require("child_process");
const log4js = require("log4js");
const logger = log4js.getLogger("consola");
const path = require("path");
const sendMail = require("../utils/mails");
const controllerProductos = require("../controllers/productos.controller");

//navego a la ruta principal Protegida
// router.get("/", isAuthenticated, (req, res) => {
//   return res.redirect("/signin");
// });

router.get("/", (req, res) => {
  return res.render("signin");
});

//navego a la ruta principal Protegida
router.get("/home", isAuthenticated, async (req, res) => {
  const firstName = req.user.firstName;
  //envia correo ethereal
  // sendMail.sendMail(
  //   "Servidor Node.js test",
  //   "hank.fay91@ethereal.email",
  //   "LOGIN",
  //   `Nombre ${
  //     req.user.firstName
  //     // userProfile._json.name
  //   } hora de log ${new Date()} foto de perfil ${
  //     req.user.photo["data"].url ? req.user.photo["data"].url : ""
  //     // userProfile._json.picture.data.url
  //   }`,
  // );

  return res.sendFile(path.join(__dirname, "../public", "home.html"));
  // return res.render("home", {
  //   title: "Ejemplo de Passport JS",
  //   user: req.user,
  //   firstName: firstName,
  //   productos: productos,
  // });
});

router.get("/profile", isAuthenticated, (req, res) => {
  logger.trace("llamada a Profile");
  return res.render("profile", {
    user: req.user,
  });
});

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
    arg1: process.argv[2] || config.FACEBOOK_CLIENT_ID,
    arg2: process.argv[3] || config.FACEBOOK_CLIENT_SECRET,
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
  logger.trace("llamada a Randoms");
  let cantidad = req.query.cant;

  const computo = fork("./serverChild.js");
  computo.send(cantidad || 10000000);

  computo.on("message", function (sum) {
    // Receive results from child process
    res.end(`El array de numeros es  ${JSON.stringify(sum)}`);
  });
});

//middleware para ver si el usuario está autenticado.
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = router;
