const FacebookStrategy = require("passport-facebook").Strategy;

// completar con sus credenciales
// const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
// const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;


// ------- configuramos passport para usar facebook
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_CLIENT_ID,
//       clientSecret: FACEBOOK_CLIENT_SECRET,
//       callbackURL: "/api/auth/facebook/callback",
//       profileFields: ["id", "displayName", "photos", "emails"],
//       scope: ["email"],
//     },
//     function (accessToken, refreshToken, profile, done) {
//       let userProfile = profile._json;

//       console.log("Perfil de usuario logeado : ", userProfile);
//       return done(null, userProfile);
//     },
//   ),
// );
