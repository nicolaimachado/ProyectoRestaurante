// reservaRoutes.js
const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.get('/', reservaController.getAllReserva);
router.get('/:idReserva', reservaController.getReservaById);
router.post('/', reservaController.createReserva);
router.delete('/:idReserva', reservaController.deleteReserva);



module.exports = router;
