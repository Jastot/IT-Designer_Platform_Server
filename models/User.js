const mongoose = require('mongoose');

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
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
  });
};

// Сравнивает введенных пароль к хешем
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
