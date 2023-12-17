const Client = require('../Models/Client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signupController = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      motdepasse,
      pseudo,
      adresse,
      mail,
      telephone,
      profession,
      annee,
      domaine
      
    } = req.body;

    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await Client.findOne({ telephone });
    if (existingUser) {
      return res.status(409).json({ message: 'L\'utilisateur existe déjà.' });
    }

    // Hash du mot de passe avant de le stocker
    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    // Créez un nouvel utilisateur dans la base de données
    const newClient = new Client({
      nom,
      prenom,
      pseudo,
      adresse,
      mail,
      telephone,
      profession,
      annee,
      domaine,
      motdepasse: hashedPassword
    });

    await newClient.save();

    res.status(201).json({ message: 'Inscription réussie.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
  }
};
