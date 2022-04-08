
// Import du modele pour communication avec la database 
const Employe = require('../models/employeModel');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.allEmployes = async function(req, res) {

    const employes = await Employe.find();
    console.log(employes);

    res
        // nom du fichier twig en 1er parametre
        .render('employes', {
            titrePage: 'La liste des employés', 
            emp: employes
        });

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.formAjouter = (req, res) => {
    res
        .render('ajouter', {
            titrePage: 'Veuillez remplir le formulaire', 
        });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.addEmploye = async(req, res) => {

    let nouveauEmploye = new Employe(req.body);
    await nouveauEmploye.save();

    res.redirect('/')
        
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getEmployeById = function (req, res) {

    res
        .json({
            statut: res.statusCode,
            msg:'Route GET BY ID is ok'
        });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.updateEmployeById = function (req, res) {
    res
    .json({
        statut: res.statusCode,
        msg:'Route PUT BY ID is ok'
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteEmployeById = (req, res) => {
    res
    .json({
        statut: res.statusCode,
        msg:'Route DELETE BY ID is ok'
    });
};



