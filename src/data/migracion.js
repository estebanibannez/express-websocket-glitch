const { sqlite3Producto } = require("../config/config");
const { sqlite3Mensajes } = require("../config/config");
const knex = require("knex")(sqlite3Producto);
const knexMsg = require("knex")(sqlite3Mensajes);

knex.schema.hasTable("productos").then((exists) => {
  if (!exists) {
    return knex.schema.createTable("productos", (table) => {
      table.increments("id").primary();
      table.string("nombre").notNullable();
      table.string("timestamp");
      table.string("descripcion");
      table.string("codigo");
      table.string("thumbnail");
      table.integer("precio");
      table.integer("stock");
    });
  }
});

knexMsg.schema.hasTable("mensajes").then((exists) => {
  if (!exists) {
    return knex.schema.createTable("mensajes", (table) => {
      table.increments("id").primary();
      table.string("mensaje");
      table.string("timestamp");
      table.string("autor");
      table.string("email");
    });
  }
});
