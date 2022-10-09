const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send({data: cards}))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка толпой cards' }));
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => card ? res.send({data: card}) : res.status(404).send({ message: 'Карточка с указанным _id не найдена' }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка c одним card' }));
}

const postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({data: card}))
    .catch(err => err.name === "ValidationError" ? res.status(400).send({ message: 'Переданы некорректные данные при создании' }) : res.status(500).send({ message: 'Произошла ошибка c созданием card' }));
}

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => card ? res.send({data: card}) : res.status(404).send({ message: 'Карточка с указанным _id не найдена' }))
    .catch(err => err.name === "ValidationError" ? res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' }) : res.status(500).send({ message: 'Произошла ошибка c созданием card' }));
}

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    .then((card) => card ? res.send({data: card}) : res.status(404).send({ message: 'Карточка с указанным _id не найдена' }))
    .catch(err => err.name === "ValidationError" ? res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка' }) : res.status(500).send({ message: 'Произошла ошибка c созданием card' }));
}

module.exports = { getCards, deleteCard, postCard, addLike, removeLike }