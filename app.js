const express = require('express');
const mongoose = require('mongoose')
// const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, errors, Joi } = require('celebrate');
const routerUsers = require('./routes/users'); // импортируем роутер
const routerCards = require('./routes/cards');
const { ERRORS } = require('./utils/errors');
const { login, postUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { handleErrors } = require('./middlewares/errors');
const { regex } = require('./utils/regex');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
// const corsOptions = { origin: ['http://localhost:3000', 'http://mestoatmalive.nomoredomains.icu','https://mestoatmalive.nomoredomains.icu', ],
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], preflightContinue: false,
//   optionsSuccessStatus: 204, allowedHeaders: [ 'Content-Type', 'origin', 'x-access-token', 'Authorization', ],
//   credentials: true,};

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(cors);
// app.use('*',cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({ email: Joi.string().required().min(2).email(), password: Joi.string().required() }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(regex)),
  }),
}), postUser);

app.use(auth);

app.use('/cards', routerCards);
app.use('/users', routerUsers);

app.use('*', () => {
  throw new NotFoundError(ERRORS.NOT_FOUND.BAD_WAY);
});
app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
