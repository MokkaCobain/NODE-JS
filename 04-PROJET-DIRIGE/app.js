// Import module express
const express = require('express');
// Import du module 
const methodOverride = require('method-override');
// Import des ROUTES
const employeRoutes = require('./routes/employeRoutes');

// Import module debug
const log = require('morgan');

// Import du module twig 
const twig = require('twig');

// Import de la connexion à la base de données
require('./config/database');

//Instance de serveur
const app = express();

// Appel de la méthode delete 
app.use(methodOverride('_method'));

// Configuration du moteur de vue
app.set('view engine', 'twig');
app.set('views', './views');

// Appel du module debug
app.use(log('dev'));

// Interpreter toutes les requetes au format JSON
app.use(express.json());

// Interpreter les datas venant du navigateur en JSON
app.use(express.urlencoded({extended:false}));

// Appel des routes
app.use('/', employeRoutes);

module.exports = app;

