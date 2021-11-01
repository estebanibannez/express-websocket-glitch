const config = require("../config/config");
const daoFactory = require("../dao/DAOFactory");

class MessageController {
  constructor() {
    //super(Message);
    console.log('persistencia actual de mensajes',config.TIPOPERSISTENCIA)
    this.mensajesDao = daoFactory.getPersistence(
      "mensajes",
      config.TIPOPERSISTENCIA,
    );
  }

  async findAll() {
    return await this.mensajesDao.find();
  }

  async findById(id) {
    return await this.mensajesDao.findById(id);
  }

  async create(data) {
    return await this.mensajesDao.create(data);
  }

  async update(id, data) {
    return await this.mensajesDao.findByIdAndUpdate(id, data);
  }

  async delete(id) {
    return await this.mensajesDao.findByIdAndDelete(id);
  }
}

module.exports = new MessageController();
