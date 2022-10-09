const User = require('../models/user');

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка толпой юзеров' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => (user ? res.send({ data: user }) : res.status(404).send({ message: 'Пользователь не найден' })))
    .catch((err) => (err.name === 'CastError' ? res.status(400).send({ message: 'Id не валиден' }) : res.status(500).send({ message: 'Произошла ошибка c одним юзером' })));
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => (err.name === 'ValidationError' ? res.status(400).send({ message: 'Данные для создания пользователя не валидны' })
      : res.status(500).send({ message: 'Произошла ошибка c созданием юзера' })));
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
    .then((user) => (user ? res.send({ data: user }) : res.status(404).send({ message: 'Пользователь не найден' })))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'фильтрцию не прошел' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'id не валиден' });
      }
      return res.status(500).send({ message: 'Произошла ошибка c созданием юзера' });
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
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'фильтрцию не прошел' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'id не валиден' });
      }
      return res.status(500).send({ message: 'Произошла ошибка c обновлением юзера' });
    });
};

module.exports = {
  getUsers, getUser, postUser, updateUser, updateAvatar,
};
