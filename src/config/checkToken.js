const jsonWebToken = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { Unauthorized } = require('http-errors');
const { UNAUTHORIZED } = require('http-status-codes');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const [type, token] = authHeader.split(' ');
    if (type === 'Bearer') {
      try {
        jsonWebToken.verify(token, JWT_SECRET_KEY);
      } catch (err) {
        res.status(UNAUTHORIZED).send(`${err.name}: ${err.message}`);
        return;
      }
      return next();
    }
  }
  next(new Unauthorized());
};
