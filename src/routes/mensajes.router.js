const express = require('express');
const router = express.Router();
const controller = require('../controllers/mensajes.controller');

router.get('/mensajes', async (req, res) => {
    try {
        let result = await controller.findAll();
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.get('/mensajes/:id', async (req, res) => {
    try {
        let result = await controller.findById(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.post('/mensajes', async (req, res) => {
    try {
        let result = await controller.create(req.body);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.put('/mensajes/:id', async (req, res) => {
    try {
        let result = await controller.update(req.params.id, req.body);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.delete('/mensajes/:id', async (req, res) => {
    try {
        let result = await controller.delete(req.params.id);
        if (result != null) {
            return res.json({
              mensaje: "Registro eliminado éxitosamente",
              status: 200,
              data: result,
            });
          } else {
            return res.json({
              mensaje: "No éxisten datos para eliminar.",
              status: 404,
              data: result,
            });
          }
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

module.exports = router;