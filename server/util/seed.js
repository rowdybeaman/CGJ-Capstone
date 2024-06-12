const { User } = require('../models/user');
const { Product } = require('../models/product');
const { Cart } = require('../models/cart');

const seed = async () => {
  try {
    // Clear existing data
    await User.destroy({ where: {} });
    await Product.destroy({ where: {} });
    await Cart.destroy({ where: {} });

    // Seed Users
    const user1 = await User.create({
      username: 'user1',
      password: 'password1',
      email: 'user1@example.com'
    });

    const user2 = await User.create({
      username: 'user2',
      password: 'password2',
      email: 'user2@example.com'
    });

    // Seed Products
    const product1 = await Product.create({
      name: 'Product 1',
      price: 19.98,
      description: 'Description for product 1',
      imageUrl: 'url_to_product1_image'
    });

    const product2 = await Product.create({
      name: 'Product 2',
      price: 19.98,
      description: 'Description for product 2',
      imageUrl: 'url_to_product2_image'
    });

    const product3 = await Product.create({
      name: 'Product 3',
      price: 19.98,
      description: 'Description for product 3',
      imageUrl: 'url_to_product3_image'
    });

    // Seed Carts
    await Cart.create({
      userId: user1.id,
      productId: product1.id,
      quantity: 1
    });

    await Cart.create({
      userId: user2.id,
      productId: product2.id,
      quantity: 2
    });

    console.log('Seeding successful');
  } catch (error) {
    console.error('Seeding failed', error);
  }
};

module.exports = { seed };
