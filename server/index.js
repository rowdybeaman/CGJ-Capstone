const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4005;
const { sequelize } = require('./util/database');

const { register, login } = require('./controllers/auth');
const { isAuthenticated } = require('./middleware/isAuthenticated');
const { Cart } = require('./models/cart');
const { User } = require('./models/user');
const { Product } = require('./models/product');

app.use(express.json());
app.use(cors());

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

app.post('/register', register);
app.post('/login', login);

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
