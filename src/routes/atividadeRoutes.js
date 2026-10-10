const express = require('express');
const router = express.Router();
const atividadeController = require('../controllers/atividadeController');

router.post('/', atividadeController.criar);
router.get('/disciplina/:id_disciplina', atividadeController.listar);
router.put('/:id', atividadeController.editar);
router.delete('/:id', atividadeController.excluir);

module.exports = router;