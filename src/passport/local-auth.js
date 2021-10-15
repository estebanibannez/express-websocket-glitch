const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const bcrypt = require("../utils/utils");

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
        if (!user.matchPassword(password)) {
          console.log("Invalid Password");
          return done(
            null,
            false,
            req.flash("signinMessage", "Algunos campos son incorrectos"),
          );
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user, req.flash("logeadoMessage", `Bienvenido ${user.firstName}`));
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
          req.flash(
            "signupMessage",
            `El correo ya se encuentra en uso`,
          ),
          console.log(`El usuario ya se encuentra registrado con ese correo: `, resultado)
        );
      }
      const user = new User();
      user.email = email;
      user.password = await user.encryptPassword(password);
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      await user.save();
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
  console.log("deserialización", usuario);
  done(null, usuario);
});
