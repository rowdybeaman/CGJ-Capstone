const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  material: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  Product,
};



// In another file, you can import the Product model using the require function:

// const { Product } = require('./path/to/models/product');

// Product.create({
//     name: 'Example Product',
//     price: 19.99,
//     description: 'This is an example product',
//     material: 'Cotton',
//     size: 'M'
//   });
  