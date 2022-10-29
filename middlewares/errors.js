const handleErrors = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  const showMessage = statusCode === 500 ? 'На сервере произошла ошибка' : message;

  res.status(statusCode).send({ showMessage });
  next();
};

module.exports = {
  handleErrors,
};
