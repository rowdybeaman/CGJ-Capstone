const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4005;
const { sequelize } = require('./util/database');
const { User } = require('./models/user');
const { Product } = require('./models/product');
const { Cart } = require('./models/cart');
const { register, login } = require('./controllers/auth');
const { isAuthenticated } = require('./middleware/isAuthenticated');
const productsController = require('./controllers/productsControllers');
const { seed } = require('./util/seed.js');

app.use(express.json());
app.use(cors());

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

app.post('/register', register);
app.post('/login', login);

app.get('/api/products', productsController.getAllProducts);
app.get('/api/products/:id', productsController.getProductById);
app.post('/api/products', isAuthenticated, productsController.addProduct);
app.put('/api/products/:id', isAuthenticated, productsController.updateProduct);
app.delete('/api/products/:id', isAuthenticated, productsController.deleteProduct);

app.get('/api/cart', isAuthenticated, async (req, res) => {
  try {
    const cartItems = await Cart.findAll({ where: { userId: req.user.id }, include: Product });
    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0);
    res.status(200).json({ items: cartItems, totalPrice });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/api/cart', isAuthenticated, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
console.log(req.user.id)
    const cartItem = await Cart.create({
      userId: req.user.id,
      productId,
      quantity,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

sequelize.sync()
  // .then(() => {
  //   return seed();
  // })
  .then(() => {
    app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
