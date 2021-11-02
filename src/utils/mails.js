const nodemailer = require("nodemailer");
const log4js = require("log4js");
const logger = log4js.getLogger("consola");

require('dotenv').config();

// ------------------------------ config ETHREAL
const transporterEthereal = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.NODEMAIL_USER.toString(),
    pass: process.env.NODEMAIL_PASS.toString(),
  },
});

// ------------------------------ config GMAIL
const transporterGmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});


const sendMail = (from, to, subject, text, html) => {
  const mailOptionsGmail = {
    from: from || "Servidor Node.js",
    to: process.env.NODEMAIL_USER.toString(),
    subject: subject,
    text: text ,
    html: `<h1 style='color: blue;'>Nuevo Registro <span style='color: green;'>Ecommerce Nodemailer</span></h1><br/> <hr> ${text}`,
  };

  transporterEthereal.sendMail(mailOptionsGmail, (err, info) => {
    if (err) {
      console.log(err);
      return err;
    }
    logger.trace("Correo enviado desde ethereal", info);
  });
};

module.exports = {
  sendMail: sendMail,
};
