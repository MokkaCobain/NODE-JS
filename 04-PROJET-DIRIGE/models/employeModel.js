
// Import module mongoose
const mongoose = require('mongoose');

// Import module validator
const validator = require('validator');

// Appel de la class Schéma 
const Schema = mongoose.Schema;

const EmployeSchema = new Schema({
    prenom: String,
    nom: String,
    ddn: Date,
    sexe: String,
    remarque: String,

},{timestamps:true}); // ajoute la date de création ou modification du document

const Employe = mongoose.model('Employe', EmployeSchema);

module.exports = Employe;
