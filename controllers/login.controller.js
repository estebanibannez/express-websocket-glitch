class Login {
  constructor() {}

  async logeo(req) {
    try {
      if (req.session.contador) {
        req.session.contador++;
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces.`);
      } else {
        req.session.contador = 1;
        res.send("Bienvenido a su primera visita al sitio!");
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Login();
