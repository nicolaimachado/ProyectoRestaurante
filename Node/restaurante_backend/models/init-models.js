var DataTypes = require("sequelize").DataTypes;
var _clientes = require("./clientes");
var _reservas = require("./reservas");

function initModels(sequelize) {
  var clientes = _clientes(sequelize, DataTypes);
  var reservas = _reservas(sequelize, DataTypes);

  clientes.belongsTo(clientes, { as: "idCliente_cliente", foreignKey: "idCliente"});
  reservas.hasMany(reservas, { as: "reservas", foreignKey: "idCliente"});

  return {
    clientes,
    reservas,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
