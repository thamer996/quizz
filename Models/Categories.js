const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String },
  // D'autres champs pour les informations de la catégorie
});

const Categories = mongoose.model('Categories', categorieSchema);

module.exports = Categories;
