// Test du script start
console.log("TEST");

///////////////////////////////////////////////////////

// Import du module express
const express = require('express');

// Import du fichier des routes
const stagiaireRouter = require('./routes/stagiaireRoutes');
// Import de la config database
require('./config/database.js');

///////////////////////////////////////////////////////

// INSTANCE DE SERVEUR (=app)
const app = express();

///////////////////////////////////////////////////////

// LES MIDDLEWARES (exécution AVANT toutes les autres fonctions appelées)

// Interprêter toutes les requetes au format JSON
app.use(express.json());

// Middleware des routes
app.use(stagiaireRouter);

// // Middleware de l'objet personne
// function mesPersonnes (req, res, next) {
//     // on crée un objet personne
//     let personne = {};
//     // on passe 2 clés et 2 valeurs
//     personne.prenom = "Joachim";
//     personne.age = 53;
//     // on appelle l'objet lors de la requete
//     req.personne = personne;
//     // fonction obligatoire pour "passer la main" à la route
//     next();
// };

// // //Appel du middelware
// app.use(mesPersonnes);

///////////////////////////////////////////////////////

// DEMARRAGE DU SERVEUR
app.listen(3000, () => {
    console.log('http://localhost:3000');
});