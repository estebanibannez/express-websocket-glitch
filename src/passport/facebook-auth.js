const FacebookStrategy = require("passport-facebook").Strategy;
const config = require("../config/config");
const passport = require("passport");
const User = require("../models/users");

// completar con sus credenciales
const FACEBOOK_CLIENT_ID = config.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = config.FACEBOOK_CLIENT_SECRET;

// ------- configuramos passport para usar facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "emails"],
      scope: ["email"],
    },
    function (accessToken, refreshToken, profile, done) {
      let userProfile = profile._json;

      User.findOne({ provider_id: profile.id }, function (err, user) {
        if (err) throw err;
        if (!err && user != null) return done(null, user);

        // Al igual que antes, si el usuario ya existe lo devuelve
        // y si no, lo crea y salva en la base de datos
        var user = new User({
          provider_id: profile.id,
          provider: profile.provider,
          firstName: profile.displayName,
          photo: profile.photos[0].value,
        });
        user.save(function (err) {
          if (err) throw err;

          if (err) done(null, user);
        });
      });

      console.log("Perfil de usuario logeado con facebook: ", userProfile);
      return done(null, userProfile);
    },
  ),
);
// Serializa al usuario para almacenarlo en la sesión
passport.serializeUser(function (user, done) {
  done(null, user);
});

// Deserializa el objeto usuario almacenado en la sesión para
// poder utilizarlo
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
