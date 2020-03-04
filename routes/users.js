const users = require('express').Router();
const { userRequestCheck } = require('../modules/validations');
const {
  getUser,
  getUsers,
} = require('../controllers/users');

users.get('/users/:userId', userRequestCheck, getUser);
users.get('/users', getUsers);

module.exports = users;
