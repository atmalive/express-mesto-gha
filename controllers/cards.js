const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send({data: cards}))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка толпой cards' }));
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => card ? res.send({data: card}) : res.status(404).send({ message: 'Карточка с указанным _id не найдена' }))
    .catch(err => {
      if (err.name === "CastError") {
        return res.status(400).send({message: 'id не валиден'});
      }
      return res.status(500).send({message: 'Произошла ошибка c удалением карточки'})
    });
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
    .catch(err => {
      if (err.name === "ValidationError") {
        return res.status(400).send({message: 'Переданы некорректные данные для постановки лайка'});
      }
      if (err.name === "CastError") {
        return res.status(400).send({message: 'id не валиден'});
      }
      return res.status(500).send({message: 'Произошла ошибка c постановкой лайка'})
    });
}

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    .then((card) => card ? res.send({data: card}) : res.status(404).send({ message: 'Карточка с указанным _id не найдена' }))
    .catch(err => {
      if (err.name === "ValidationError") {
        return res.status(400).send({message: 'Переданы некорректные данные для удаления лайка'});
      }
      if (err.name === "CastError") {
        return res.status(400).send({message: 'id не валиден'});
      }
      return res.status(500).send({message: 'Произошла ошибка c удаления лайка'})
    });
}

module.exports = { getCards, deleteCard, postCard, addLike, removeLike }