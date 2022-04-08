

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
    .route('/:id')
    .get(controller.getEmployeById)
    .put(controller.updateEmployeById)
    .delete(controller.deleteEmployeById);


module.exports= router;