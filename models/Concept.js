const mongoose = require('mongoose');

const ConceptSchema = new mongoose.Schema({
  // Локация
  creator: {
    type: String,
    required: [true, 'Локация'],
  },
  // Теги
  tags: String,
});

module.exports = mongoose.model('Concept', ConceptSchema);
