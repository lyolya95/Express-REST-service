const jsonWebToken = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { Unauthorized } = require('http-errors');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization');

    const [type, token] = tokenString.split(' ');
    if (type === 'Bearer' && jsonWebToken.verify(token, JWT_SECRET_KEY)) {
      return next();
    }
  }
  throw new Unauthorized();
};
