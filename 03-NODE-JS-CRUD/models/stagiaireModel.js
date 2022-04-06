
// Import module mongoose
const mongoose = require('mongoose');
// Import de la classe Schéma
const Schema = mongoose.Schema;


// Création du schema (objet JS)
StagiaireSchema = new Schema({
    prenom: String, 
    ddn: Date, 
    email: String, 
    mdp: String,
});


// Création du model (table) "Stagiaires" basé sur l'objet "StagiaireSchema"
const Stagiaire = mongoose.model('Stagiaire', StagiaireSchema);

// Export du model Stagiaire
module.exports = Stagiaire;
