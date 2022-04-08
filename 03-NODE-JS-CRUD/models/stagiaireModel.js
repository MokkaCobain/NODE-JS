
// Import module mongoose
const mongoose = require('mongoose');
// Import de la classe Schéma
const Schema = mongoose.Schema;
const validator = require('validator');
const {capitalCase} = require('capital-case');

// Création du schema (objet JS)
const StagiaireSchema = new Schema({
    prenom: {
        type: String, 
        // required: [true, 'le champ prénom est obligatoire'], 
        trim: true,
    },
    ddn: {
        type: Date,
        required: [true, 'le champ date de naissance est obligatoire'], 
    }, 
    email: {
        type: String, 
        unique: [true, 'l\'adresse mail doit être unique'],
        lowercase: true,
        // validate: [validator.isEmail]
    },
    mdp: String,
});


// Fonction de rappel 
StagiaireSchema.pre('save', function (next) {
    this.prenom=capitalCase(this.prenom);
    next();
});

// Création du model (table) "Stagiaires" basé sur l'objet "StagiaireSchema"
const Stagiaire = mongoose.model('Stagiaire', StagiaireSchema);

// Export du model Stagiaire
module.exports = Stagiaire;
