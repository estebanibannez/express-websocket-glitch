const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const User = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: String,
    firstName: String,
    lastName: String,
  },
  {
    timestamps: true,
  },
);

User.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

User.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", User);
