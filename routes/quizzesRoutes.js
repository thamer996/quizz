const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/', quizController.createQuiz);
router.get('/', quizController.getAllQuiz);
router.get('/:QuizID', quizController.getQuiz);
router.get('/quiz/:id/questions',quizController.getQuestionsByQuiz)
router.post('/:id/questions',quizController.createQuestionForQuiz)
router.put('/:QuizID', quizController.updateQuiz);

router.delete('/:QuizID', quizController.deleteQuiz);

module.exports = router;
