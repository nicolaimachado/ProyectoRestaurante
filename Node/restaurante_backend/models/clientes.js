const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('platos', {
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
      allowNull: false
    },
    telefonoCliente: {
      type: DataTypes.STRING(100),
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
    ]
  });
};
