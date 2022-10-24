const Card = require('../models/card');
const { ERRORS } = require('../utils/errors');
const NotFoundError = require('../errors/NotFoundError');
const NoRight = require('../errors/NoRight');
const NotCorrectData = require('../errors/NotCorrectData');

const getCards = (req, res, next) => {
  Card.find()
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError(ERRORS.DEFAULT_ERROR.CARDS);
      }
      res.send({ data: cards });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError(ERRORS.DEFAULT_ERROR.CARDS))
    .then((card) => {
      if (card.owner !== req.user._id) {
        throw new NoRight(ERRORS.NO_RIGHT.USER_ERROR);
      }
      Card.deleteOne(card)
        .then(() => res.send({ message: 'карточка удалена' }));
    })
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw new NotCorrectData(ERRORS.VALIDATION.CARDS);
      }
      res.send({ data: card });
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new NotFoundError(ERRORS.NOT_FOUND.CARDS))
    .then((card) => (res.send({ data: card })))
    .catch(next);
};

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFoundError(ERRORS.NOT_FOUND.CARDS_LIKE))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports = {
  getCards, deleteCard, postCard, addLike, removeLike,
};
