const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');

// Catégorie CRUD routes
router.post('/', categorieController.createCategorie);
router.get('/', categorieController.getCategory);
router.get('/:CategorieID', categorieController.getCategorieById);
router.put('/:CategorieID', categorieController.updateCategorie);
router.delete('/:CategorieID', categorieController.deleteCategorie);

module.exports = router;