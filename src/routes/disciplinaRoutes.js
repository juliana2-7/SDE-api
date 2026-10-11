const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplinaController');

router.post('/', disciplinaController.criar);
router.get('/:id_usuario', disciplinaController.listar);
router.put('/:id', disciplinaController.editar);
router.delete('/:id', disciplinaController.excluir);

module.exports = router;