const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    logger.error(err.message);
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
};

module.exports = errorHandler;
