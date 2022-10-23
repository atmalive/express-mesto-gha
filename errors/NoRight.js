const { ERRORS } = require('../utils/errors');

class NoRight extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERRORS.NO_RIGHT.ERROR_CODE;
  }
}

module.exports = NoRight;
