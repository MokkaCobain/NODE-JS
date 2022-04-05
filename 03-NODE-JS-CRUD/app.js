// Test du script start
console.log("TEST");

///////////////////////////////////////////////////////

// IMPORT DES MODULES DE L'APP
const express = require('express');

// Appel du fichier des routes
const stagiaireRouter = require('./routes/stagiaireRoutes')

///////////////////////////////////////////////////////

// INSTANCE DE SERVEUR (=app)
const app = express();

// EXECUTION DU MIDDLEWARE POUR LES ROUTES
app.use(stagiaireRouter);

///////////////////////////////////////////////////////

// LES MIDDLEWARES
function monMiddleWare (req, res, next) {
    // on crée un objet personne
    let personne = {};
    // on passe 2 clés et 2 valeurs
    personne.prenom = "Joachim";
    personne.age = 53;
    // on appelle l'objet lors de la requete
    req.personne = personne;
    // fonction obligatoire pour "passer la main" à la route
    next();
};
// //Appel du middelware (exécution AVANT toutes les routes ci-dessous)
app.use(monMiddleWare);

///////////////////////////////////////////////////////

// DEMARRAGE DU SERVEUR
app.listen(3000, () => {
    console.log('http://localhost:3000');
});