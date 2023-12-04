const Quizzes = require('../Models/Quizzes');
const Questions = require('../Models/Questions');

// POST
exports.createQuiz = async (req, res) => {
  try {
    const quiz = new Quizzes(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Could not create quiz.' });
  }
};
exports.createQuestionForQuiz = async (req, res) => {
  try {
    const quizId = req.params.id; // Assuming you are passing the quiz ID as a parameter
    const quiz = await Quizzes.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found.' });
    }

    const question = new Questions(req.body); // Assuming you have a Questions model
    await question.save();

    // Add the newly created question to the questions array in the quiz
    quiz.questions.push(question._id);
    await quiz.save();

    res.status(201).json(question);
  } catch (error) {
    console.error('Error creating question for quiz:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
exports.getQuestionsByQuiz = async (req, res) => {
  try {
    const quizId = req.params.id; // Assuming you are passing the quiz ID as a parameter
    const quiz = await Quizzes.findById(quizId).populate('questions');

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found.' });
    }

    res.status(200).json(quiz.questions);
  } catch (error) {
    console.error('Error retrieving questions by quiz:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


exports.getAllQuiz = async (req, res) => {
  try {
    const quiz = await Quizzes.find().populate('questions')
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving quizzs.' });
  }
};
// GET
exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quizzes.findOne({ QuizID: req.params.QuizID }).populate('CreatedBy', 'Username');
    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ error: 'Quiz not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving quiz.' });
  }
};

// UPDATE
exports.updateQuiz = async (req, res) => {
  try {
    const quizID = req.params.QuizID;
    const updatedQuiz = await Quizzes.findOneAndUpdate(
      { QuizID: quizID },
      req.body,
      { new: true }
    );
    if (updatedQuiz) {
      res.json(updatedQuiz);
    } else {
      res.status(404).json({ error: 'Quiz not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating quiz.' });
  }
};

// DELETE
exports.deleteQuiz = async (req, res) => {
  try {
    const quizID = req.params.QuizID;
    const deletedQuiz = await Quizzes.findOneAndDelete({ QuizID: quizID });
    if (deletedQuiz) {
      res.json({ message: 'Quiz deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Quiz not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting quiz.' });
  }
};
