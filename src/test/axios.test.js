const axios = require("axios");

const URL = "http://localhost:8080";

const productonuevo = {
  nombre: "Producto 2",
  descripcion: "test producto 2",
  codigo: "12345CODa",
  foto: "",
  precio: "20000",
  stock: "12",
  permisos: {
    administrador: true,
    usuario: false,
  },
};

axios
  .get(URL + "/productos/listar")
  .then((response) => {
    // console.log(response.data);
  })
  .catch(console.log);

// axios
//   .post(URL + "/productos/guardar", productonuevo)
//   .then((response) => {
//     console.log("Producto guardado-->", response.data);
//   })
//   .catch(console.log);
