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
  login(req, res) {
    const user = req.body;
    if (user) {
      res.redirect("/");
      // res.sendFile(__dirname + "/views/index.html");
    }
  }

  getLogin(req, res) {
    if (req.isAuthenticated()) {
      var user = req.user;
      console.log("user logueado");
      res.json({
        status: 200,
        message: "Usuario Logueado",
        body: {
          usuario: user.username,
          nombre: user.firstName,
          apellido: user.lastName,
          email: user.email,
        },
      });
    } else {
      console.log("user NO logueado");
      // res.render("login");
      res.json({
        status: 200,
        message: "Usuario no Logueado",
        body: {},
      });
    }
  }

  getSignup(req, res) {
    res.sendFile(__dirname + "/public/signup.html");
  }

  //---- renderizo pantalla de error
  getFaillogin(req, res) {
    console.log("error en login");
    res.render("login-error");
  }

  //---- renderizo pantalla de error
  getFailsignup(req, res) {
    const user = req.user;
    console.log("error en signup");

    if (user) {
      res
        .status(200)
        .json({ status: "ok", message: "Usuario ya se encuentra registrado" });
    } else {
      // res.send({ status: "Logout ERROR", body: err });
      res.render("signup-error");
    }
  }

  getLogout(req, res) {
    req.session.destroy((err) => {
      if (!err)
        res.status(200).json({ status: "ok", message: "Sesión destruida" });
      else res.send({ status: "Logout ERROR", body: err });
    });
    req.logout();
  }

  // rutaProtegida(req, res){
  //   res.sendFile(path.join(__dirname, '../public', 'ruta-protegida.html'));
  // }
}

module.exports = new Login();
