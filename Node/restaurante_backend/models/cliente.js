const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cliente', {
    idCliente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombreCliente: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellidoCliente: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    emailCliente: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "emailCliente"
    },
    telefonoCliente: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Cliente',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCliente" },
        ]
      },
      {
        name: "emailCliente",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "emailCliente" },
        ]
      },
    ]
  });
};
