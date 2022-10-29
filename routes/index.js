const routerMain = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { login, postUser } = require('../controllers/users');
const { regex } = require('../utils/regex');
const auth = require('../middlewares/auth');
const routerCards = require('./cards');
const routerUsers = require('./users');

routerMain.post('/signin', celebrate({
  body: Joi.object().keys({ email: Joi.string().required().min(2).email(), password: Joi.string().required() }),
}), login);

routerMain.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(regex)),
  }),
}), postUser);

routerMain.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

routerMain.use(auth);

routerMain.use('/cards', routerCards);
routerMain.use('/users', routerUsers);

module.exports = {
  routerMain,
};
