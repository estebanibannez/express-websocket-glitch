const bCrypt = require("bcrypt");

//-------  genera un hash usando bCrypt
const createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

//------- valida la password
const isValidPassword = function (user, password) {
  return bCrypt.compareSync(password, user.password);
};

module.exports = {
  createHash,
  isValidPassword,
};
