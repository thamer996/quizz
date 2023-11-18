const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  texte: { type: String, required: true },
  options: [{ text: String, isCorrect: Boolean }],
  // D'autres champs pour les informations de la question
});

const Questions = mongoose.model('Questions', questionSchema);

module.exports = Questions;
