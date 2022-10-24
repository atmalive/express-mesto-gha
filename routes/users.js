const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, getMe, updateUser, updateAvatar,
} = require('../controllers/users');
const { regex } = require('../utils/regex');

routerUsers.get('/', getUsers);

routerUsers.get('/me', getMe);

routerUsers.get('/:userId', celebrate({ params: Joi.object().keys({ userId: Joi.string().alphanum().length(24) }) }), getUser);

routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({ name: Joi.string().required().min(2).max(30), about: Joi.string().required().min(2).max(30) }),
}), updateUser);

routerUsers.patch('/me/avatar', celebrate({ body: Joi.object().keys({ avatar: Joi.string().required().pattern(new RegExp(regex)) }) }), updateAvatar);

module.exports = routerUsers;
