
// Import des models stagiaire
const Stagiaire = require('../models/stagiaireModel');

// LES CONTROLLERS DE MON APPLICATION

/**
 * Permet de récupérer tous les stagiaires en BDD
 * @param req 
 * @param res 
 */
 exports.allStagiaires =  async function (req, res) {
     // On apelle le model
    const tousStagiaires = await Stagiaire.find({});
    if(!tousStagiaires) {
        res
        .status(404)
        .json({msg : "CA MARCHE PAS"})
    }
    res
        .render('stagiaires', {
            listeStagiaires: tousStagiaires,
            url: req.baseURL, 
            titre: "La liste des stagiaires"
        })
};

/** 
 * Permet d'ajouter un stagiaire en BSS
 * @param req 
 * @param res 
 */
exports.addStagiaire = async function (req, res){
    // Instanciation un nouveau model 
    let creerStagiaire = new Stagiaire(req.body);
    // Sauvegarde le model
    creerStagiaire = await creerStagiaire.save();
    res
        .status(200)
        .json(creerStagiaire);
};

/**
 * Permet de récupérer 1 stagiaire à partir de son ID en BDD
 * @param req 
 * @param res 
 */
exports.getStagiaireById = async function (req, res) { 
    //.params = cible les paramètres indiqués dans la route
    let id = req.params.id;
    if(!ObjectId.isValid(id)) {
        res
            .status(200)
            .json({msg : "Invalid id"});
    }

    let unStagiaire = await Stagiaire.findOne({_id : id});
    console.log(unStagiaire);
        res
            .status(200)
            .json(unStagiaire);
};

/**
 * Permet de modifier un stagiaire à partir de son ID en BSS
 * @param req 
 * @param res 
 */
exports.updateStagiaireById = async function (req, res) {
    let id = req.params.id;

    if(!ObjectId.isValid(id)){
        res
            .status(200)
            .json({msg : 'Invalid id'});

    }else {

    let modifierUnStagiaire = await Stagiaire.findOneAndUpdate({_id : id}, req.body);    
    res
        .status(200)
        .json(modifierUnStagiaire);
    }
};

/**
 * Permet de supprimer un Stagiaire à partir de son ID en BDD
 * @param req 
 * @param res 
 */
exports.deleteStagiaireById = async function (req, res) {
    let id = req.params.id;

    if(!ObjectId.isValid(id)){
        res
            .status(200)
            .json({msg : 'Invalid id'});
    }else{

    let suppStagiaire = await Stagiaire.findByIdAndDelete({_id : id});
    res
        .status(200)
        .json(suppStagiaire);
    }
}