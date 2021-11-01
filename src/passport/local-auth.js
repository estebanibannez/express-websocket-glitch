const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const sendMail = require("../utils/mails");

//-------- LOGIN PASSPORT -------//
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      // check in mongo if a user with username exists or not
      User.findOne({ email }, function (err, user) {
        // In case of any error, return using the done method
        if (err) return done(err);
        // Username does not exist, log error & redirect back
        if (!user) {
          console.log("User Not Found with email " + email);
          return done(
            null,
            false,
            req.flash("signinMessage", "Usuario no encontrado"),
          );
        }
        // Contraseña incorrecta
        const validaContrasena = user.matchPassword(password);

        if (!validaContrasena) {
          console.log("Invalid Password");
          return done(
            null,
            false,
            req.flash("signinMessage", "Algunos campos son incorrectos"),
          );
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(
          null,
          user,
          req.flash("logeadoMessage", `Bienvenido ${user.firstName}`),
        );
      });
    },
  ),
);

//-------- REGISTER PASSPORT -------//

passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const resultado = await User.findOne({ email: email });
      if (resultado) {
        return done(
          null,
          false,
          req.flash("signupMessage", `El correo ya se encuentra en uso`),
          console.log(
            `El usuario ya se encuentra registrado con ese correo: `,
            resultado,
          ),
        );
      }
      const user = new User();
      user.email = email;
      user.password = await user.encryptPassword(password);
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.age = req.body.edad;
      user.phone = req.body.telefono;
      await user.save();
      // envia correo de nuevo usuario registrado

      // const { firstName, email, age, photo, phone } = user;

      //envia correo ethereal
      sendMail.sendMail(
        "Ecommerce nuevo usuario",
        "",
        "LOGIN",
        `<h1>Se ha registrado un nuevo usuario a las ${new Date().toLocaleString()} </h1>\n\n
        Nombre: ${user.firstName} \n
        Email: ${user.email} \n
        Edad: ${user.age} \n
        Foto: ${user.photo} \n
        Teléfono: ${user.phone} \n`,
      );

      done(null, user);
    },
  ),
);

//almaceno el id de usuario en session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  const usuario = await User.findById(user._id);
  done(null, usuario);
});
