const { ERRORS } = require('../utils/errors');

class NotCorrectData extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERRORS.VALIDATION.ERROR_CODE;
  }
}

module.exports = NotCorrectData;
