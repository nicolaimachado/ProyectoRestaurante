var DataTypes = require("sequelize").DataTypes;
var _cliente = require("./cliente");
var _reserva = require("./reserva");

function initModels(sequelize) {
  var cliente = _cliente(sequelize, DataTypes);
  var reserva = _reserva(sequelize, DataTypes);

  reserva.belongsTo(cliente, { as: "idCliente_Cliente", foreignKey: "idCliente"});
  cliente.hasMany(reserva, { as: "Reservas", foreignKey: "idCliente"});

  return {
    cliente,
    reserva,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
