const path = require("path");

exports.getSignin = (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "signin.html"));
};

exports.postSignin = (req, res) => {
  try {
    const { username, password } = req.body;
    res.redirect("/home");

    // res.sendFile(path.join(__dirname, "../public", "login-error.html"));
  } catch (error) {}
};

exports.getSignup = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../public", "signup.html"));
  } catch (error) {
    console.log(error);
  }
};
exports.postSignup = (req, res) => {
  const user = req.user;
  //     //console.log(user);
  //     return res.status(200).json({
  //       status: "ok",
  //       message: "Usuario creado éxitosamente",
  //       body: user,
  //     });
  res.send("Usuario creado.!");
};

exports.getFaillogin = (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "login-error.html"));
};

exports.getFailsignup = (req, res) => {};

exports.getLogout = (req, res) => {
  req.logout();
  // res.json({ status: 200, message: "session closed" });
  res.redirect("/signin");
};
