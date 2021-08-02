// config.js
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 8080,
  // MONGO_URL: "mongodb://localhost:27017/chat",
  MONGO_URL: "  mongodb+srv://root:root@cluster0.jdgnu.mongodb.net/sessiones?retryWrites=true&w=majority",
  TIPODB: "mongo", //mongo - firebase
};
