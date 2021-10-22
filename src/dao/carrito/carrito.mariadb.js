require("../../data/migracion");
const { sqlite3Mensajes } = require("../../config/config");
const knex = require("knex")(sqlite3Mensajes);

module.exports = {
  async find() {
    return new Promise((resolve, reject) => {
      const resultado = knex("mensajes").select();
      return resolve(resultado);
    });
  },

  async findById(id) {
    return new Promise((resolve, reject) => {
      const resultado = knex
        .from("mensajes")
        .where("id", id)
        .select()
        .then(() => {
          console.log("consulta mensajes");
          return resolve(resultado);
        })
        .catch((error) => {
          console.log("error:", error);
          return reject(error);
        });
    });
  },

  async create(data) {
    const mensaje = {
      mensaje: data.mensaje,
      timestamp: Date.now(),
      autor: data.autor,
      email: data.email,
    };

    return new Promise((resolve, reject) => {
      const resultado = knex("mensajes")
        .insert(mensaje)

        .then(() => {
          console.log("mensajes agregados a la tabla");
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

  async findByIdAndUpdate(id, { mensaje, autor, email }) {
    const update = { mensaje, autor, email };

    return new Promise((resolve, reject) => {
      const resultado = knex
        .from("mensajes")
        .where("id", id)
        .update(update)
        .then(() => {
          console.log("mensaje actualizado");
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
        .from("mensajes")
        .where("id", "=", id)
        .del()
        .then(() => {
          console.log("mensaje eliminado");
          return resolve(resultado);
         
        })
        .catch((error) => {
          console.log("error:", error);
          return reject(error);
        });
    });
  },
};
