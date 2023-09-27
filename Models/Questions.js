const mongoose = require('mongoose');

const QuestionsSchema = mongoose.Schema({
  text: { type: String, required: true }, // Le texte de la question
  options: [
    { type: String, required: true }, // Option 1
    { type: String, required: true }, // Option 2
    { type: String, required: true }, // Option 3
    { type: String, required: true }, // Option 4
  ], // Les options de réponse
  correctAnswer: { type: String, required: true }, // La réponse correcte parmi les options
});

const Questions = mongoose.model('Questions', QuestionsSchema);

module.exports = Questions;
