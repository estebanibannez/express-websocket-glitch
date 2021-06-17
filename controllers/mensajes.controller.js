const fs = require("fs");
const path = require("path");

var moment = require("moment");

class Mensajes {
  constructor() {
    this.init();
  }

  addMessage(message) {
    //agrego fecha hora del mensaje
    message.date = moment(new Date()).format("DD/MM/YYYY h:mm:ss");

    const data = this.readMessages();
    data.push(message);
    const dbpath = path.join(__dirname, "../data/mensajes.json");
    fs.writeFileSync(dbpath, JSON.stringify(data));
  }

  init() {
    this.readMessages();
  }

  readMessages() {
    const data = require("../data/mensajes.json");
    return data;
  }
}

module.exports = new Mensajes();
