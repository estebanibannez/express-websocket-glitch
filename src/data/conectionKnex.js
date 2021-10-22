const { sqlite3 } = require("../config/config");
const knex = require('knex')(sqlite3);

// exporto el objeto para usarlo en otros modulos
module.exports = knex;