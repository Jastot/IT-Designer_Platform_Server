const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({path: './config/config.env'});

const UserSchema = new mongoose.Schema({
  // почта пользователя
  login: {
    type: String,
    required: [true, 'Логин, обязательное поле'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email не валиден',
    ],
  },
  // тут пароль
  password: {
    type: String,
    required: [true, 'Пароль, обязательное поле'],
    validate: {
          validator: (data) => {
            if (data.length >= 8) {
              return true;
            } else {
              return false;
            }
          },
          message: 'Пароль должен содержать хотя бы 8 символов.',
        },
  },
});

// Генерирует JWT
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
};

module.exports = mongoose.model('User', UserSchema);
