const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // тут логин
  login: {
    type: String,
    required: [true, 'Логин, обязательное поле'],
    trim: true,
    maxlength: [100, 'Максимальная длина логина - 100 символов'],
  },
  // тут пароль
  password: {
    type: String,
    required: [true, 'Пароль, обязательное поле'],
    trim: true,
    maxlength: [100, 'Максимальная длина фамилии - 100 символов'],
  },
  // почта пользователя
  email: {
    type: String,
    required: false,
    trim: true,
    maxlength: [100, 'Максимальная длина отчества - 100 символов'],
  },
  // фото пользователя
  photo: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
