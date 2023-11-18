const Categories = require('../Models/Categories');

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
exports.getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve categories.' });
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
    const categorie = await Categories.findByIdAndRemove(req.params.id);
    if (!categorie) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Could not delete category.' });
  }
};
