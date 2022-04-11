
// Import du modele pour communication avec la database 
const Employe = require('../models/employeModel');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.allEmployes = async function(req, res) {

    const employes = await Employe.find();
    console.log(employes); // appelés dans %la boucle for% employes.twig

    res
        // nom du fichier twig en 1er parametre
        .render('employes', {
            titrePage: 'La liste des employés', 
            emp: employes,
            urlModifier: '/modifier',
            url: '/supprimer'
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
exports.formModifier  = async (req, res) => {
    const employeParId = await Employe.findOne({_id: req.params.id});
    res
        .render('modifier', { 
            data : employeParId,
            titrePage: 'Veuillez remplir le formulaire de modification'
        });

};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.updateEmploye = async function (req, res) {
   await Employe.findOneAndUpdate(req.params.id, req.body);
    res
        .redirect('/')
};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteEmploye = async (req, res) => {
    await Stagiaire.findByIdAndDelete(req.params.id);
    res
        .redirect('/')

};



