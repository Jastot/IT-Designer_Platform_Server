const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  // мир
  world: {
    type: String,
    required: [true, 'Мир'],
  },
  // Теги
  tags: String,
});

module.exports = mongoose.model('Location', LocationSchema);
