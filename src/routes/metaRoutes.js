const express = require('express');
const router = express.Router();
const metaController = require('../controllers/metaController');

router.post('/', metaController.criar);
router.get('/:id_usuario', metaController.listar);
router.put('/:id', metaController.editar);
router.delete('/:id', metaController.excluir);

module.exports = router;