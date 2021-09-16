const ProductosModel = require("../models/productos");

class ProductosController {
  constructor() {}

  async buscar() {
    try {
      return await ProductosModel.find({}).sort({ date: "desc" }).lean();
    } catch (error) {
      throw error;
    }
  }

  async buscarPorId(id) {
    try {
      return await ProductosModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async guardar(producto) {
    try {
      return await ProductosModel.create(producto);
    } catch (error) {
      throw error;
    }
  }

  async actualizar(indx, producto) {
    try {
      return await ProductosModel.findByIdAndUpdate(indx, producto, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async eliminar(id) {
    try {
      return await ProductosModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductosController();
