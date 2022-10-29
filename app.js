const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { ERRORS } = require('./utils/errors');
const { handleErrors } = require('./middlewares/errors');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { routerMain } = require('./routes');

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://mestoatmalive.nomoredomains.icu', 'https://mestoatmalive.nomoredomains.icu'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'x-access-token', 'Authorization'],
  credentials: true,
};

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('*', cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.use('', routerMain);

app.use('*', () => {
  throw new NotFoundError(ERRORS.NOT_FOUND.BAD_WAY);
});
app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
