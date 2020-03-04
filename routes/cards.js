const cards = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');
const { cardRequestCheck } = require('../modules/validations');

cards.get('/cards', cardRequestCheck, getCards);
cards.post('/cards', cardRequestCheck, createCard);
cards.delete('/cards/:cardId', deleteCard);

module.exports = cards;
