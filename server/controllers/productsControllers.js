const { Product } = require('../models/product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

const addProduct = async (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  try {
    const newProduct = await Product.create({ name, price, description, imageUrl });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, imageUrl } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    product.name = name;
    product.price = price;
    product.description = description;
    product.imageUrl = imageUrl;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    await product.destroy();
    res.status(200).send('Product deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
