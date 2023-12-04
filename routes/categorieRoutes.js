const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');

// Catégorie CRUD routes
router.post('/', categorieController.createCategorie);
router.get('/', categorieController.getCategory);
router.get('/categories/:id/quizzes', categorieController.getQuizzesByCategory);
router.post('/:id/quizzes', categorieController.createQuizForCategory);
router.get('/:CategorieID', categorieController.getCategorieById);
router.put('/:CategorieID', categorieController.updateCategorie);
router.delete('/:CategorieID', categorieController.deleteCategorie);

module.exports = router;