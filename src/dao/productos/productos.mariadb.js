require("../../data/migracion");
const { sqlite3Producto } = require("../../config/config");
const knex = require("knex")(sqlite3Producto);

module.exports = {
  async find() {
    return new Promise((resolve, reject) => {
      const resultado = knex("productos").select();
      return resolve(resultado);
    });
  },

  async findById(id) {
    return new Promise((resolve, reject) => {
      const resultado = knex
        .from("productos")
        .where("id", id)
        .select()
        .then(() => {
          console.log("consulta productos");
          return resolve(resultado);
        })
        .catch((error) => {
          console.log("error:", error);
          return reject(error);
        });
    });
  },

  async create(data) {
    const producto = {
      nombre: data.nombre,
      timestamp: Date.now(),
      descripcion: data.descripcion,
      codigo: data.codigo,
      thumbnail: data.thumbnail,
      precio: data.precio,
      stock: data.stock,
    };

    return new Promise((resolve, reject) => {
      const resultado = knex("productos")
        .insert(producto)

        .then(() => {
          console.log("productos agregados a la tabla");
          return resolve(resultado);
        })
        .catch((error) => {
          console.log("error:", error);
          return reject(error);
        });
      // .finally(() => {
      //   console.log("cerrando conexion...");
      //   knex.destroy();
      // });
    });
  },

  async findByIdAndUpdate(id, { nombre, precio, stock, thumbnail }) {
    const update = { nombre, precio, stock, thumbnail };

    return new Promise((resolve, reject) => {
      const resultado = knex
        .from("productos")
        .where("id", id)
        .update(update)
        .then(() => {
          console.log("productos actualizados");
          return resolve(resultado);
        })
        .catch((error) => {
          console.log("error:", error);
          return reject(error);
        });
    });
  },

  async findByIdAndDelete(id) {
    return new Promise((resolve, reject) => {
      const resultado = knex
        .from("productos")
        .where("id", "=", id)
        .del()
        .then(() => {
          console.log("producto eliminado");
          return resolve(resultado);
         
        })
        .catch((error) => {
          console.log("error:", error);
          return reject(error);
        });
    });
  },
};
