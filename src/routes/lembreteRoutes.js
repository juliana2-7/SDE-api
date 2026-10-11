const express = require('express');
const router = express.Router();
const lembreteController = require('../controllers/lembreteController');

router.post('/', lembreteController.criar);
router.get('/atividade/:id_atividade', lembreteController.listar);
router.put('/:id', lembreteController.editar);
router.delete('/:id', lembreteController.excluir);

module.exports = router;