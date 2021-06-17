class Productos {
  productos = [
    {
      title: "Escuadra",
      price: 345.67,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      id: 1,
    },
    {
      title: "Calculadora",
      price: 234.56,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
      id: 2,
    },
  ];

  constructor() {}

  //metodo que agrega 1 producto al array
  guardar(title, price, thumbnail, id) {
    this.productos.push({
      title: title,
      price: price,
      thumbnail: thumbnail,
      id: id,
    });
    return this.productos[this.productos.length - 1];
  }

  //recibe un objeto producto y lo guarda
  postProduct = (req, res) => {
    try {
      const { title, price, thumbnail } = req.body;
      const id = this.productos.length + 1;

      let productoAgregado = this.guardar(title, price, thumbnail, id);

      console.log("producto agregado ");

      // res.redirect("/api/productos/formulario");
      return res.json({
        mensaje: `Producto agregado con éxito!`,
        producto: productoAgregado,
      });
    } catch (err) {
      return res.json({
        error: err.message,
      });
    }
  };
  //actualiza un producto
  updateProduct = (req, res) => {
    let { id } = req.params;
    let producto = req.body;

    producto.id = Number(id);
    let index = this.productos.findIndex((p) => p.id === id);
    this.productos.splice(index, 1, producto);
    res.json({
      mensaje: `El producto con el id: ${id} se actualizó.`,
    });
  };
  //elimina 1 producto
  deleteProduct = (req, res) => {
    let { id } = req.params;

    let index = this.productos.findIndex((p) => p.id === id);
    this.productos.splice(index, 1);
    res.json({
      mensaje: `El producto con el id: ${req.params.id} se elimino correctamente.`,
    });
  };

  //obtiene todos los productos por id
  getProductoById = (req, res) => {
    let producto = this.productos.filter((res) => res.id == req.params.id);
    console.log(producto);
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
  getProductos = (req, res) => {
    console.log(this.productos);
    try {
      res.json({
        productos: this.productos,
      });
    } catch (error) {
      console.log(`Ocurrió un error ${error}`);
      res.json({
        error: error,
      });
    }
  };

  getProductosView = (req, res) => {
    console.log(this.productos);
    try {
      res.render(`tabla`, { hayProductos: true, productos: this.productos });
    } catch (error) {
      console.log(`Ocurrió un error ${error}`);
      res.json({
        error: error,
      });
    }
  };

  postProductosForm = (req, res) => {
    res.render("formulario");
  };

  //retorna los productos actuales
  listar() {
    return this.productos;
  }
}

module.exports = new Productos();
