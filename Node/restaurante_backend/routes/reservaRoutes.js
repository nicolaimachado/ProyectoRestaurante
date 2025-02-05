// reservaRoutes.js
const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.get('/', reservaController.getAllReserva);
router.get('/:idReserva', reservaController.getReservaById);
router.post('/', reservaController.createReserva);
router.delete('/:idReserva', reservaController.deleteReserva);
router.put('/:idReserva', reservaController.updateReserva);
router.get('/listadoenfecha/:fechareserva', reservaController.getReservasEnFecha);

module.exports = router;
