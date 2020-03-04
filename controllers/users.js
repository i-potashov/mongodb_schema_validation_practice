const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send({data: user}))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(200).send({data: user}))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {name, about, avatar, email, password} = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      console.log(user, '333');
      res.status(201).send({data: user});
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const {email, password} = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({_id: user._id}, 'super-strong-secret',
        {expiresIn: '7d'});
      res.send({token});
    })
    .catch(next);
};
