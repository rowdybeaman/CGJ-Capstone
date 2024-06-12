require('dotenv').config();
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

module.exports = {
  isAuthenticated: (req, res, next) => {
    const headerToken = req.get('Authorization');

    if (!headerToken) {
      console.log('ERROR IN auth middleware');
      return res.sendStatus(401);
    }

    let token;

    try {
      token = jwt.verify(headerToken, SECRET);
      req.user = token; // Assuming token contains user information
    } catch (err) {
      err.statusCode = 500;
      return next(err);
    }

    if (!token) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      return next(error);
    }

    next();
  }
};
