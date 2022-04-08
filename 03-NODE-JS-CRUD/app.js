
// Import du module express
const express = require('express');
// Module de view
const twig = require('twig');
const path = require('path');
// Import du module des routes
const stagiaireRouter = require('./routes/stagiaireRoutes');
// Import de dotenv
require('dotenv').config();
// Import du module de ma database
require('./config/database.js');

///////////////////////////////////////////////////////

// INSTANCE DE SERVEUR (=app)
const app = express();

// DECLARATION DU MOTEUR DE VUE
app.set ('view engine', 'twig');

// Chemin vers les vue
app.set('views', path.join(__dirname, 'views'));


///////////////////////////////////////////////////////

// LES MIDDLEWARES (exécution AVANT toutes les autres fonctions appelées)

// Interprêter toutes les requetes au format JSON
app.use(express.json());

// Middleware des routes avec la racine + le fichier routes
app.use('/dwwm/stagiaires', stagiaireRouter);

// Test du moteur de vue
app.get('/', (req, res) => {

    res.render('layout', {
        titre:"Je compile du JS en HTML",
    });

});

///////////////////////////////////////////////////////

// Exporter l'instance de serveur vers le bin !
module.exports = app;

