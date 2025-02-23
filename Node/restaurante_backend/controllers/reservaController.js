// Importar libreria para respuestas
const Respuesta = require("../utils/respuesta.js");
const { logMensaje } = require("../utils/logger.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo plato
const Reserva = models.reserva;
const Cliente = models.cliente;

class ReservaController {

  async getGraficaReserva(req, res) {
    try {
      const reservas = await Reserva.findAll({
        attributes: [
          "fechaReserva",
          [sequelize.fn("COUNT", sequelize.col("idReserva")), "reservas"],
        ],
        group: ["fechaReserva"],
        raw: true,
      });
  
      const formattedData = reservas.map((reserva) => ({
        name: reserva.fechaReserva,
        value: parseInt(reserva.reservas, 10),
      }));
  
      res.json(Respuesta.exito(formattedData, "Datos de reservas recuperados"));
    } catch (err) {
      logMensaje("Error al recuperar los datos de las reservas: " + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos de las reservas: ${req.originalUrl}`
          )
        );
    }
  }

  async getAllReserva(req, res) {
    try {
      const data = await Reserva.findAll({
        include: [{
          model: Cliente,
          as: 'idCliente_Cliente'
        }]
      }); // Recuperar todos los 
      
      res.json(Respuesta.exito(data, "Datos de reservas recuperadas"));
    } catch (err) {
      // Handle errors during the model call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos de las reservas: ${req.originalUrl}`
          )
        );
    }
  }

  async createReserva(req, res) {
    const reserva = req.body;

    try {
      const reservaNueva = await Reserva.create(reserva);

      res.status(201).json(Respuesta.exito(reservaNueva, "Reserva insertada"));
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al crear una reserva nueva: ${reserva}`));
    }
  }

  

  async deleteReserva(req, res) {
    const idReserva = req.params.idReserva;
    try {
      const numFilas = await Reserva.destroy({
        where: {
          idReserva: idReserva,
        },
      });
      if (numFilas == 0) {
        // No se ha encontrado lo que se quería borrar
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado: " + idReserva));
      } else {
        res.status(204).json(Respuesta.exito(null, "Reserva eliminada"));
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al eliminar los datos: ${req.originalUrl}`
          )
        );
    }
  }


  async getReservaById(req, res) {
    const idReserva = req.params.idReserva;
    try {
      const fila = await Reserva.findByPk(idReserva); 
      if(fila){
        res.json(Respuesta.exito(fila, "Reserva recuperada"));
      } else {
        res.status(404).json(Respuesta.error(null, "Reserva no encontrada"));
      }

    } catch (err) {
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }
  
async updateReserva(req, res) {
    const reserva = req.body; // Recuperamos datos para actualizar
    const idReserva = req.params.idReserva; // dato de la ruta

    // Petición errónea, no coincide el id del plato de la ruta con el del objeto a actualizar
    if (idReserva != reserva.idReserva) {
      return res
        .status(400)
        .json(Respuesta.error(null, "El id de la reserva no coincide"));
    }

    try {
      const numFilas = await Reserva.update({ ...reserva }, { where: { idReserva } });

      if (numFilas == 0) {
        // No se ha encontrado lo que se quería actualizar o no hay nada que cambiar
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado o no modificado: " + idReserva));
      } else {
        // Al dar status 204 no se devuelva nada
        // res.status(204).json(Respuesta.exito(null, "Plato actualizado"));
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al actualizar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  async getReservasEnFecha(req, res) {
    const fecha = req.params.fechareserva;
    try {
      const filas = await Reserva.findAll({
        where: {
          fechaReserva: fecha
        },
        include: [{
          model: Cliente,
          as: 'idCliente_Cliente'
        }]
      });
  
      if (filas) {
        res.json(Respuesta.exito(filas, "Reservas recuperadas"));
      } else {
        res.status(404).json(Respuesta.error(null, "No se encontraron reservas para la fecha especificada"));
      }
  
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }

}

module.exports = new ReservaController();

// Structure of result (MySQL)
// {
//   fieldCount: 0,
//   affectedRows: 1, // Number of rows affected by the query
//   insertId: 1,     // ID generated by the insertion operation
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0   // Number of rows changed by the query
// }
