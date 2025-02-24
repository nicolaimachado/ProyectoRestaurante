const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.get('/', reservaController.getAllReserva);
router.get('/grafica', reservaController.getGraficaReserva); 
router.get('/listadoenfecha/:fechareserva', reservaController.getReservasEnFecha);
router.get('/:idReserva', reservaController.getReservaById);
router.post('/', reservaController.createReserva);
router.delete('/:idReserva', reservaController.deleteReserva);
router.put('/:idReserva', reservaController.updateReserva);


module.exports = router;