const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const bcrypt = require("../utils/utils");

//-------- LOGIN PASSPORT -------//
passport.use(
  "local-signin",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      // check in mongo if a user with username exists or not
      User.findOne({ username: username }, function (err, user) {
        // In case of any error, return using the done method
        if (err) return done(err);
        // Username does not exist, log error & redirect back
        if (!user) {
          console.log("User Not Found with username " + username);
          return done(
            null,
            false,
            req.flash("signinMessage", "Usuario no encontrado"),
          );
        }
        // User exists but wrong password, log the error
        if (!bcrypt.isValidPassword(user, password)) {
          console.log("Invalid Password");
          return done(
            null,
            false,
            req.flash("signinMessage", "Algunos campos son incorrectos"),
          );
          // console.log("message", "Invalid Password"),
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user, req.flash("signinMessage", "Bienvenido"));
      });
    },
  ),
);

//-------- REGISTER PASSPORT -------//
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      findOrCreateUser = function () {
        // find a user in Mongo with provided username
        User.findOne({ username: username }, function (err, user) {
          // In case of any error return
          if (err) {
            console.log("Error in SignUp: " + err);
            return done(err);
          }
          // already exists
          if (user) {
            console.log("User already exists");
            return done(
              null,
              false,
              //req.flash('message','User Already Exists'));
              console.log("message", "User Already Exists"),
            );
          } else {
            // if there is no user with that email
            // create the user
            const newUser = new User();
            // set the user's local credentials
            newUser.username = username;
            newUser.password = bcrypt.createHash(password);
            newUser.email = req.body.email;
            newUser.firstName = req.body.firstname;
            newUser.lastName = req.body.lastname;

            // guardo el usuario
            newUser.save((err, user) => {
              if (err) {
                console.log("Error guardando el usuario: " + err);
                throw err;
              }
              console.log("Usuario registrado éxitosamente");
              return done(null, user);
            });
          }
        });
      };
      // Delay the execution of findOrCreateUser and execute
      // the method in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    },
  ),
);

//almaceno el id de usuario en session
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
