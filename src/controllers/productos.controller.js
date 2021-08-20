const fs = require('fs');
const json_productos = fs.readFileSync('./src/data/productos.json', 'utf-8');
let productos = JSON.parse(json_productos);


//recibe un objeto producto y lo guarda
const postProduct = (req, res) => {

  try {

    const {
      title,
      price,
      thumbnail
    } = req.body;

    const id = productos.length + 1;

    debugger

    let newProducto = {
      id: id,
      title: title,
      price: price,
      thumbnail: thumbnail
    };

    // add a new product to the array
    productos.push(newProducto);

    // saving the array in a file
    const json_productos = JSON.stringify(productos);
    console.log(json_productos);

    fs.writeFileSync('./data/productos.json', json_productos, 'utf-8');

    console.log("producto agregado ");

    res.redirect("/api/productos/formulario");
    // return res.json({
    //   mensaje: `Producto agregado con éxito!`,
    // });
  } catch (err) {
    return res.json({
      error: err.message,
    });
  }
};

//actualiza un producto
const updateProduct = (req, res) => {
  let {
    id
  } = req.params;
  let producto = req.body;

  let index = products.findIndex((p) => p.id === id);

  productos.splice(index, 1, producto);

  return res.json({
    mensaje: `El producto con el id: ${id} se actualizó.`,
  });
};


//elimina 1 producto
const deleteProduct = (req, res) => {
  let {
    id
  } = req.params;

  let index = productos.findIndex((p) => p.id === id);
  productos.splice(index, 1);

  return res.json({
    mensaje: `El producto con el id: ${req.params.id} se elimino correctamente.`,
  });
};

//obtiene todos los productos por id
const getProductoById = (req, res) => {
  let producto = productos.filter((res) => res.id == req.params.id);

  try {
    if (producto.length == 0) {
      res.json({
        mensaje: `El producto con el id: ${req.params.id} no existe.`,
      });
    } else {
      res.json({
        producto,
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
};


//obtiene todos los productos
const getProductos = (req, res) => {
  try {
    return res.json({
      productos: productos,
    });
  } catch (error) {
    console.log(`Ocurrió un error ${error}`);
    return res.json({
      error: error,
    });
  }
};

const getProductosView = (req, res) => {
  try {
    return res.render(`tabla`, {
      hayProductos: true,
      productos: productos
    });
  } catch (error) {
    console.log(`Ocurrió un error ${error}`);
    return res.json({
      error: error,
    });
  }
};

const postProductosForm = (req, res) => {
  res.render("formulario");
};

const listar = (req, res) => {
  return productos
}

module.exports = {
  postProduct,
  updateProduct,
  deleteProduct,
  getProductos,
  getProductoById,
  getProductosView,
  postProductosForm,
  listar
}