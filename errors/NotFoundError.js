const { ERRORS } = require('../utils/errors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERRORS.NOT_FOUND.ERROR_CODE;
  }
}

module.exports = NotFoundError;
