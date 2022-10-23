const { ERRORS } = require('../utils/errors');

class IsUser extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERRORS.IS_USER.ERROR_CODE;
  }
}

module.exports = IsUser;
