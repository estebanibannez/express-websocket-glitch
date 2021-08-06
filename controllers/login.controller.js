const path = require("path");
/**
 * Clase autenticación
 * @author <Esteban Ibanez>
 */
class Login {
  constructor() {}
  /**
   * Método para Registrarsse recibe 2 parametros (correo / contraseña)
   * @author Esteban Ibanez <e.ibannez.p@gmail.com>
   * Manages the login of users.
   * @param {String} username
   * @param {String} password
   * @returns modelUser
   */
  async postSignup(req, res) {
    const user = req.user;
    //console.log(user);
    return res.status(200).json({
      status: "ok",
      message: "Usuario creado éxitosamente",
      body: user,
    });
  }

  /**
   * Método para login recibe 2 parametros (correo / contraseña)
   * @author Esteban Ibanez <e.ibannez.p@gmail.com>
   * Manages the login of users.
   * @param {String} username
   * @param {String} password
   */

  getSignin(req, res, next) {
    res.render("signin");
  }

  getSignup(req, res, next) {
    const rq = req;
    res.render("signin");
    // res.sendFile(__dirname + "/public/signup.html");
  }

  //---- renderizo pantalla de error
  getFaillogin(req, res) {
    res.render("login-error");
  }

  //---- renderizo pantalla de error
  getFailsignup(req, res) {
    res.render("signup-error");
  }

  getLogout(req, res) {
    req.logout();
    res.redirect("/signin");
  }
}

module.exports = new Login();
