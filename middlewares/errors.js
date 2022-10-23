const { ERRORS } = require('../utils/errors');

const handleErrors = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.message === 'Validation failed') {
    res.status(ERRORS.VALIDATION.ERROR_CODE).send({ message: ERRORS.VALIDATION.GENERAL });
  }

  res.status(statusCode).send({ message });
  next();
};

module.exports = {
  handleErrors,
};
