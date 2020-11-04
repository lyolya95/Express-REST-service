const jsonWebToken = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { Unauthorized } = require('http-errors');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const [type, token] = authHeader.split(' ');
    if (type === 'Bearer') {
      jsonWebToken.verify(token, JWT_SECRET_KEY, err => {
        if (err) {
          return next(err);
        }
      });
      return next();
    }
  }
  next(new Unauthorized());
};
