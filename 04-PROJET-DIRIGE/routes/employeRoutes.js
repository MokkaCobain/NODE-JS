

const express = require('express');

const router = express.Router();

const controller = require('../controllers/employeController')

router
    .route('/')
    .get(controller.allEmployes);

router
    .route('/ajouter')
    .get(controller.formAjouter)
    .post(controller.addEmploye);

router
    .route('/modifier/:id')
    .get(controller.formModifier)
    .put(controller.updateEmploye)

router
    .route('/supprimer/:id')
    .delete(controller.deleteEmploye);


module.exports= router;