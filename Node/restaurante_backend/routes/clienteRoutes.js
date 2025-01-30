const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.getAllCliente);
router.get('/:idCliente', clienteController.getClienteById);
router.post('/', clienteController.createCliente);
router.delete('/:idCliente', clienteController.deleteCliente);


// router.put('/:idtipo', tipoController.updateTipo);


module.exports = router;
