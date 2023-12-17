const Client = require('../Models/Client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signinController = async (req, res) => {
  try {
    const { telephone, motdepasse } = req.body;

    // Recherchez l'utilisateur dans la base de données
    const user = await Client.findOne({ telephone });
    if (!user || !(await bcrypt.compare(motdepasse, user.motdepasse))) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }

    // Générez un jeton JWT et renvoyez-le au client
    const token = jwt.sign({ telephone: user.telephone }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la connexion.' });
  }
};
