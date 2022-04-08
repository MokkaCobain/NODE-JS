
// Import des modules
const express = require('express');
// Import de la classe Router
const router = express.Router();

// Import du fichier des controllers
const controller = require('../controllers/stagiaireControllers');

// LES ROUTES PAR DEFAUT ==> get - post - put - delete (factorisées)

router
    .route('/')
    .get(controller.allStagiaires)
    .post(controller.addStagiaire);


router
    .route('/:id')
    .get(controller.getStagiaireById)
    .put(controller.updateStagiaireById)
    .delete(controller.deleteStagiaireById);

// EXPORT DES ROUTES
module.exports = router;