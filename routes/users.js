const routerUsers = require('express').Router();
const {
  getUsers, getUser, postUser, updateUser, updateAvatar,
} = require('../controllers/users');

routerUsers.get('/', getUsers);

routerUsers.get('/:userId', getUser);

routerUsers.post('/', postUser);

routerUsers.patch('/me', updateUser);

routerUsers.patch('/me/avatar', updateAvatar);

module.exports = routerUsers;
