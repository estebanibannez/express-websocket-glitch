const FacebookStrategy = require("passport-facebook").Strategy;
const config = require("../config/config");
const passport = require("passport");

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
