const routerCards = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, postCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');
const { regex } = require('../utils/regex');

routerCards.get('/', getCards);

routerCards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).pattern(new RegExp(regex)),
  }),
}), postCard);

routerCards.delete('/:cardId', celebrate({ params: Joi.object().keys({ cardId: Joi.string().alphanum().hex().length(24) }) }), deleteCard);

routerCards.put('/:cardId/likes', celebrate({ params: Joi.object().keys({ cardId: Joi.string().alphanum().hex().length(24) }) }), addLike);

routerCards.delete('/:cardId/likes', celebrate({ params: Joi.object().keys({ cardId: Joi.string().alphanum().hex().length(24) }) }), removeLike);

module.exports = routerCards;
