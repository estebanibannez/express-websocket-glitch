const { Router } = require("express");
const router = Router();

const productosController = require("../controllers/productos.controller");

router.get("/productos/listar", async (req, res) => {
  try {
    let resultado = await productosController.buscar();
    return res.json({ status: 200, message: "OK", data: resultado });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Ocurrió un error inesperado",
      data: error.message,
    });
  }
});

router.get("/productos/listar/:id", async (req, res) => {
  try {
    let resultado = await productosController.buscarPorId(req.params.id);
    console.log(resultado);
    if (!resultado) {
      return res.json({
        status: 200,
        message: "Producto no encontrado",
      });
    }
    return res.json({ status: 200, message: "OK", data: resultado });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Ocurrió un error inesperado",
      data: error.message,
    });
  }
});

router.post("/productos/guardar", async (req, res) => {
  try {
    const producto = req.body;
    let resultado = await productosController.guardar(producto);
    return res.json({ status: 200, message: "OK Producto creado", data: resultado });
    // return res.redirect("/home");
  } catch (error) {
    return res.json({
      status: 500,
      message: "Ocurrió un error inesperado",
      data: error.message,
    });
  }
});

router.put("/productos/actualizar/:id", async (req, res) => {
  try {
    let idproductoactualizar = req.params.id;
    let productonuevo = req.body;
    let resultado = await productosController.actualizar(
      idproductoactualizar,
      productonuevo,
    );
    return res.json({ status: 200, message: "OK", data: resultado });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Ocurrió un error inesperado",
      data: error.message,
    });
  }
});

router.delete("/productos/borrar/:id", async (req, res) => {
  try {
    let idproductoborrar = req.params.id;
    let resultado = await productosController.eliminar(idproductoborrar);
    return res.json({ status: 200, message: "OK", data: resultado });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Ocurrió un error inesperado",
      data: error.message,
    });
  }
});

router.get("/productos/vista", async (req, res) => {
  try {
    let resultado = await productosController.buscar();
    return res.render(`tabla`, {
      hayProductos: true,
      productos: resultado,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Ocurrió un error inesperado",
      data: error.message,
    });
  }
});

router.get("/productos/formulario", async (req, res) => {
  try {
    return res.render("formulario");
  } catch (error) {
    return res.json({
      status: 500,
      message: "Ocurrió un error inesperado",
      data: error.message,
    });
  }
});

module.exports = router;
