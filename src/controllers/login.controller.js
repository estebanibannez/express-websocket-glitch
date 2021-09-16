const path = require("path");
const sendMail = require("../utils/mails");
const userModel = require("../models/users");

exports.getLogout = (req, res) => {
  //envia correo ethereal
  sendMail.sendMail(
    "Servidor Node.js test",
    "hank.fay91@ethereal.email",
    "LOGOUT",
    `hora de logout ${new Date()}`,
  );
  req.logout();
  res.redirect("/");
  // res.json({ status: 200, message: "session closed" });
};
