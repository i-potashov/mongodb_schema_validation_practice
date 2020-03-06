const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const { INVALID_LINK } = require('../configuration/constants');

const urlValidator = [
  validate({
    validator: 'isURL',
    message: INVALID_LINK
  })
];

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// cardSchema.path('link').validate(validator.isURL, INVALID_LINK);

module.exports = mongoose.model('card', cardSchema);
