const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ERRORS } = require('../utils/errors');
const NotFoundError = require('../errors/NotFoundError');
const NotCorrectData = require('../errors/NotCorrectData');
const AuntificationError = require('../errors/AuntificationError');
const IsUser = require('../errors/IsUser');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      if (!users) {
        throw new NotFoundError(ERRORS.DEFAULT_ERROR.USER);
      }
      res.send({ data: users });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError(ERRORS.NOT_FOUND.USER))
    .then((user) => res.send(user))
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(ERRORS.NOT_FOUND.USER))
    .then((user) => res.send(user))
    .catch(next);
};

const postUser = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new IsUser(ERRORS.IS_USER.USER_ERROR);
      }
      bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            email, password: hash,
          })
            .then((userData) => {
              if (!userData) {
                throw new NotCorrectData(ERRORS.VALIDATION.USER);
              }
              res.send({
                email: userData.email, name: userData.name, about: userData.about, avatar: userData.avatar,
              });
            });
        });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(ERRORS.NOT_FOUND.USER))
    .then((user) => {
      if (!user) {
        throw new NotCorrectData(ERRORS.VALIDATION.USER);
      }
      res.send({ data: user });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(ERRORS.NOT_FOUND.USER))
    .then((user) => {
      if (!user) {
        throw new NotCorrectData(ERRORS.VALIDATION.USER);
      }
      res.send({ data: user });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(new AuntificationError(ERRORS.AUNTIFICATION_ERROR.USER_ERROR))
    .then((user) => bcrypt.compare(password, user.password)
      .then((result) => {
        if (!result) {
          throw new AuntificationError(ERRORS.AUNTIFICATION_ERROR.USER_ERROR);
        }
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );
        res.cookie('token', token, { httpOnly: true });
        res.send({ message: 'Всё верно!' });
      })
      .catch(next))
    .catch(next);
};

module.exports = {
  getUsers, getUser, getMe, postUser, updateUser, updateAvatar, login,
};
