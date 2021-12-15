const mongoose = require('mongoose');

const WorldSchema = new mongoose.Schema({
  // Создатель
  creator: {
    type: String,
    required: [true, 'Создатель'],
  },
  // Редакторы
  editors: [],
  // Подписчики
  followers: [],
  // Теги
  tags: String,
});

module.exports = mongoose.model('World', WorldSchema);
