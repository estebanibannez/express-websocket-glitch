const config = require("../config/config");
const daoFactory = require("../dao/DAOFactory");

class ProductosController {
  constructor() {
    this.productosDao = daoFactory.getPersistence(
      "productos",
      config.TIPOPERSISTENCIA,
    );
  }

  async buscar() {
    try {
      return await this.productosDao.find();
    } catch (error) {
      throw error;
    }
  }

  async buscarPorId(id) {
    try {
      return await this.productosDao.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async guardar(producto) {
    try {
      return await this.productosDao.create(producto);
    } catch (error) {
      throw error;
    }
  }

  async actualizar(indx, producto) {
    try {
      return await this.productosDao.findByIdAndUpdate(indx, producto, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async eliminar(id) {
    try {
      return await this.productosDao.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductosController();
