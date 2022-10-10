const User = require('../models/user');
const {ERRORS, MONGOOSE_ERR} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERRORS.DEFAULT_ERROR.ERROR_CODE).send({ message: ERRORS.DEFAULT_ERROR.USER}));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => (user ? res.send({ data: user }) : res.status(ERRORS.NOT_FOUND.ERROR_CODE).send({ message: ERRORS.NOT_FOUND.USER })))
    .catch((err) => (err.name === MONGOOSE_ERR.CASTERR ? res.status(ERRORS.VALIDATION.ERROR_CODE).send({ message: ERRORS.VALIDATION.USER }) : res.status(ERRORS.DEFAULT_ERROR.ERROR_CODE).send({ message: ERRORS.DEFAULT_ERROR.USER })));
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => (err.name === MONGOOSE_ERR.VALIDERR ? res.status(ERRORS.VALIDATION.ERROR_CODE).send({ message: ERRORS.VALIDATION.USER })
      : res.status(ERRORS.DEFAULT_ERROR.ERROR_CODE).send({ message: ERRORS.DEFAULT_ERROR.USER })));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => (user ? res.send({ data: user }) : res.status(ERRORS.NOT_FOUND.ERROR_CODE).send({ message: ERRORS.NOT_FOUND.USER })))
    .catch((err) => {
      if (err.name === MONGOOSE_ERR.VALIDERR) {
        return res.status(ERRORS.VALIDATION.ERROR_CODE).send({ message: ERRORS.VALIDATION.USER });
      }
      if (err.name === MONGOOSE_ERR.CASTERR) {
        return res.status(ERRORS.VALIDATION.ERROR_CODE).send({ message: ERRORS.VALIDATION.USER_ME });
      }
      return res.status(ERRORS.DEFAULT_ERROR.ERROR_CODE).send({ message: ERRORS.DEFAULT_ERROR.USER });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => (user ? res.send({ data: user }) : res.status(404).send({ message: 'Пользователь не найден' })))
    .catch((err) => {
      if (err.name === MONGOOSE_ERR.VALIDERR) {
        return res.status(ERRORS.VALIDATION.ERROR_CODE).send({ message: ERRORS.VALIDATION.USER });
      }
      if (err.name === MONGOOSE_ERR.CASTERR) {
        return res.status(ERRORS.VALIDATION.ERROR_CODE).send({ message: ERRORS.VALIDATION.USER_ME });
      }
      return res.status(ERRORS.DEFAULT_ERROR.ERROR_CODE).send({ message: ERRORS.DEFAULT_ERROR.USER });
    });
};

module.exports = {
  getUsers, getUser, postUser, updateUser, updateAvatar,
};
