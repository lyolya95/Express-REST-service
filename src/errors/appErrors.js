const { NOT_FOUND } = require('http-status-codes');

const reqWrapper = callback => async (req, res, next) => {
  try {
    return await callback(req, res);
  } catch (err) {
    return next(err);
  }
};
class NotFoundError extends Error {
  constructor(entity, params, message) {
    super(
      message || `Couldn't find a(an) ${entity} with: ${JSON.stringify(params)}`
    );
    this.status = NOT_FOUND;
  }
}

module.exports = { NOT_FOUND_ERROR: NotFoundError, reqWrapper };
