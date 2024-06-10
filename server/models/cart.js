const { DataTypes } = require("sequelize");

const { sequelize } = require("../util/database");

module.exports = {
  Cart: sequelize.define("Cart", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER
  }),
};




