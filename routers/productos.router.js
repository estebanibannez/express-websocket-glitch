const {
  Router
} = require("express");

const router = Router();

const {
  getProductos,
  getProductosView,
  getProductoById,
  postProduct,
  deleteProduct,
  updateProduct,
  postProductosForm,
} = require("../controllers/productos.controller");

router.get("/productos/listar", getProductos);
router.get("/productos/listar/:id", getProductoById);
router.post("/productos/guardar", postProduct);
router.put("/productos/actualizar/:id", updateProduct);
router.delete("/productos/borrar/:id", deleteProduct);
router.get("/productos/vista", getProductosView);
router.get("/productos/formulario", postProductosForm);

module.exports = router;