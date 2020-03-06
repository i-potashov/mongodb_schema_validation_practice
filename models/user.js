const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
const LoginError = require('../errors/LoginError');
const { INVALID_LINK, INVALID_EMAIL} = require('../configuration/constants');


const urlValidator = [
  validate({
    validator: 'isURL',
    message: INVALID_LINK,
    httpStatus: 400,
  })
];

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: INVALID_EMAIL,
    httpStatus: 400,
  })
];



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    uniqueCaseInsensitive: true,
    validate: emailValidator,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.plugin(uniqueValidator);
// userSchema.pre('validate', function (next) {
// //   console.log("Pre validate hook called");
// //
// //   next();
// // });

// userSchema.pre('findOneAndUpdate', function (next) {
//   this.options.runValidators = true;
//   next();
// });

// userSchema.pre('validate', function(next) {
//   const err = new Error('something went wrong');
//   // If you call `next()` with an argument, that argument is assumed to be
//   // an error.
//   return next(err);
// });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};


module.exports = mongoose.model('user', userSchema);
