const router = require("express").Router();

router.get("/sin-session", (req, res) => {
  let contador = 0;
  res.send({ contador: ++contador });
});

router.get("/con-session", (req, res) => {
  if (req.session.contador) {
    req.session.contador++;
    res.send(`Ud ha visitado el sitio ${req.session.contador} veces.`);
  } else {
    req.session.contador = 1;
    res.send("Bienvenido a su primera visita al sitio!");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.send("Logout ok!");
    else res.send({ status: "Logout ERROR", body: err });
  });
});

router.post("/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.send("login fallo");
  } else if (req.body.username == "admin" || req.body.password == "1234") {
    req.session.user = "admin";
    req.session.admin = true;
   
    let date = new Date();
    date.setTime(date.getTime() + (60 * 10000));

    req.session.cookie.expires = date;
    res.send({User: req.session});
  }
});

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

router.get("/info", (req, res) => {
  console.log("------------ req.session -------------");
  console.log(req.session);
  console.log("--------------------------------------");

  console.log("----------- req.sessionID ------------");
  console.log(req.sessionID);
  console.log("--------------------------------------");

  console.log("----------- req.cookies ------------");
  console.log(req.cookies);
  console.log("--------------------------------------");

  console.log("---------- req.sessionStore ----------");
  console.log(req.sessionStore);
  console.log("--------------------------------------");

  res.send("Send info ok!");
});

module.exports = router;
