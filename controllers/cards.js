const Card = require('../models/card');
const { ERRORS, MONGOOSE_ERR } = require('../utils/errors');

const getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERRORS.DEFAULT_ERROR.ERROR_CODE).send({ message: ERRORS.DEFAULT_ERROR.CARDS }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => (card ? res.send({ data: card }) : res.status(ERRORS.NOT_FOUND.ERROR_CODE).send({ message: ERRORS.NOT_FOUND.CARDS })))
    .catch((err) => {
      if (err.name === MONGOOSE_ERR.CASTERR) {
        return res.status(ERRORS.VALIDATION.ERROR_CODE).send({ message: ERRORS.VALIDATION.CARDS });
      }
      return res.status(ERRORS.DEFAULT_ERROR.ERROR_CODE).send({ message: ERRORS.DEFAULT_ERROR.CARDS });
    });
};

const postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => (err.name === MONGOOSE_ERR.VALIDERR
      ? res.status(ERRORS.VALIDATION.ERROR_CODE).send({ message: ERRORS.VALIDATION.CARDS })
      : res.status(ERRORS.DEFAULT_ERROR.ERROR_CODE).send({ message: ERRORS.DEFAULT_ERROR.CARDS })));
};

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => (card ? res.send({ data: card }) : res.status(ERRORS.NOT_FOUND.ERROR_CODE).send({ message: ERRORS.NOT_FOUND.CARDS })))
    .catch((err) => {
      if (err.name === MONGOOSE_ERR.CASTERR) {
        return res.status(ERRORS.VALIDATION.ERROR_CODE).send({ message: ERRORS.VALIDATION.CARDS_LIKE });
      }
      return res.status(ERRORS.DEFAULT_ERROR.ERROR_CODE).send({ message: ERRORS.DEFAULT_ERROR.CARDS });
    });
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => (card ? res.send({ data: card }) : res.status(ERRORS.NOT_FOUND.ERROR_CODE).send({ message: ERRORS.NOT_FOUND.CARDS_LIKE })))
    .catch((err) => {
      if (err.name === MONGOOSE_ERR.CASTERR) {
        return res.status(ERRORS.VALIDATION.ERROR_CODE).send({ message: ERRORS.VALIDATION.CARDS_LIKE });
      }
      return res.status(ERRORS.DEFAULT_ERROR.ERROR_CODE).send({ message: ERRORS.DEFAULT_ERROR.CARDS });
    });
};

module.exports = {
  getCards, deleteCard, postCard, addLike, removeLike,
};
