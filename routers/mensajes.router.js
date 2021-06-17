const Router = require("express");
const router = Router();
const { getMessages } = require("../controllers/mensajes.controller");

router.get("/mensajes/obtener-mensajes", getMessages);

module.exports = router;
