const { ERRORS } = require('../utils/errors');

class AuntificationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERRORS.AUNTIFICATION_ERROR.ERROR_CODE;
  }
}

module.exports = AuntificationError;
