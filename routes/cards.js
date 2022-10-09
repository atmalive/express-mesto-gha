const routerCards = require('express').Router();
const { getCards, postCard, deleteCard, addLike, removeLike } = require('../controllers/cards')

routerCards.get('/', getCards);

routerCards.post('/', postCard);

routerCards.delete('/:cardId', deleteCard);

routerCards.put('/:cardId/likes', addLike);

routerCards.delete('/:cardId/likes', removeLike);

module.exports = routerCards;