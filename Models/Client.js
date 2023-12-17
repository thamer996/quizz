const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  motdepasse: { type: String, required: true },
  pseudo: { type: String, required: true },
  adresse: { type: String, required: true },
  mail: { type: String, required: true },
  telephone: { type: String, required: true, unique: true },
  profession: { type: String, enum: ['pharmacien', 'etudiant'], required: true },
  annee: { type: Number },
  domaine: { type: String, enum: ['officine', 'industrie', 'biologie', 'hopital', 'université', 'autres'] },
}); 

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
