const Categories = require('../Models/Categories');
const Quizzes = require('../Models/Quizzes');
// Créer une nouvelle catégorie
exports.createCategorie = async (req, res) => {
  try {
    const categorie = new Categories(req.body);
    await categorie.save();
    res.status(201).json(categorie);
  } catch (error) {
    res.status(500).json({ error: 'Could not create category.' });
  }
};

// Récupérer toutes les catégories
exports.getCategory = async (req, res) => {
  try {
    const categories = await Categories.find().populate('quizzes');
    res.json(categories);
  } catch (error) {
    console.error('Error retrieving category:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
exports.createQuizForCategory = async (req, res) => {
  try {
    const categoryId = req.params.id; // Assuming you are passing the category ID as a parameter
    const category = await Categories.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    const quiz = new Quizzes(req.body);
    await quiz.save();

    // Add the newly created quiz to the quizzes array in the category
    category.quizzes.push(quiz._id);
    await category.save();

    res.status(201).json(quiz);
  } catch (error) {
    console.error('Error creating quiz for category:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Récupérer une catégorie par ID
exports.getCategorieById = async (req, res) => {
  try {
    const categorie = await Categories.findById(req.params.id);
    if (!categorie) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    res.status(200).json(categorie);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve category.' });
  }
};
exports.getQuizzesByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id; // Assuming you are passing the category ID as a parameter
    const category = await Categories.findById(categoryId).populate('quizzes');
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.status(200).json(category.quizzes);
  } catch (error) {
    console.error('Error retrieving quizzes by category:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Mettre à jour une catégorie par ID
exports.updateCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categorie) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    res.status(200).json(categorie);
  } catch (error) {
    res.status(500).json({ error: 'Could not update category.' });
  }
};

// Supprimer une catégorie par ID
exports.deleteCategorie = async (req, res) => {
  try {
    // Récupérer l'ID de la catégorie à supprimer
    const categorieId = req.params.id;

    // Récupérer tous les quizzes associés à la catégorie
    const quizzesToDelete = await Quizzes.find({ categorie: categorieId });

    // Supprimer chaque quiz associé à la catégorie
    const deleteQuizPromises = quizzesToDelete.map(async (quiz) => {
      await Quizzes.findByIdAndRemove(quiz._id);
    });

    // Attendre la suppression de tous les quizzes
    await Promise.all(deleteQuizPromises);

    // Supprimer la catégorie elle-même
    const categorie = await Categories.findByIdAndRemove(categorieId);

    if (!categorie) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.status(200).json({ message: 'Category and associated quizzes deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not delete category and associated quizzes.' });
  }
};
