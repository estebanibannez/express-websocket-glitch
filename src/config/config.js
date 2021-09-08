require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || parseInt(process.argv[2]) || 8080,
  MONGO_DB: {
    URI:
      process.env.MONGO_URL ||
      "mongodb+srv://root:root@cluster0.jdgnu.mongodb.net/sessiones?retryWrites=true&w=majority",
  },
  TIPODB: process.env.TIPODB || "MONGO",
  MONGO_URL_TYPE: process.env.MONGO_URL_TYPE || "LOCAL", //mongo - firebase
  TIEMPO_EXPIRACION: process.env.TIEMPO_EXPIRACION || 10000,
  FACEBOOK_CLIENT_ID: process.argv[2] || process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.argv[3] || process.env.FACEBOOK_CLIENT_SECRET,
  GMAIL_USER: process.env.GMAIL_USER || "hank.fay91@ethereal.email",
  GMAIL_PASS: process.env.GMAIL_PASS || "mtC5C4YrtpjTYRZKPB",
  ACCOUNT_SID: process.env.ACCOUNT_SID || "AC88750c917a154293f1d60ac9abf26267",
  AUTH_TOKEN: process.env.AUTH_TOKEN || "d9f75b2c53a2ecaa1d3c8d3e661049c4",

  // FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID || 354346826187484,
  // FACEBOOK_CLIENT_SECRET:
  // process.env.FACEBOOK_CLIENT_SECRET || "0a1170c94406b2378183b175af5f29c8",
};
