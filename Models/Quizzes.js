const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Questions' }],
  // D'autres champs pour les informations du quiz
});

const Quizzes = mongoose.model('Quizzes', quizSchema);

module.exports = Quizzes;