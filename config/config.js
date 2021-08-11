require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 8080,
  MONGO_DB: {
    URI:
      process.env.MONGO_URL ||
      "mongodb+srv://root:root@cluster0.jdgnu.mongodb.net/sessiones?retryWrites=true&w=majority",
  },
  TIPODB: process.env.TIPODB || "MONGO",
  MONGO_URL_TYPE: process.env.MONGO_URL_TYPE || "LOCAL", //mongo - firebase
  TIEMPO_EXPIRACION: process.env.TIEMPO_EXPIRACION || 10000,
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID || 1494463314240715,
  FACEBOOK_CLIENT_SECRET:
    process.env.FACEBOOK_CLIENT_SECRET || "2d29723e8310ae5b5f94021399d743fd",
};
