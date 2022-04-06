
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

    res
        .status(200)
        // On renvoie le model dans la reponse
        .json(tousStagiaires);
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
    // console.log(req.params)

    let unStagiaire = await Stagiaire.findOne({prenom : 'morgane'}).exec();
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
   let prenom = { prenom: 'fabien'};
   let update = { email : 'monNEWnouveau@email.com'};
   let modifierUnStagiaire = await Stagiaire.findOneAndUpdate(prenom, update);    
    res
        .status(200)
        .json(modifierUnStagiaire);
};

/**
 * Permet de supprimer un Stagiaire à partir de son ID en BDD
 * @param req 
 * @param res 
 */
exports.deleteStagiaireById = async function (req, res) {
    let suppStagiaire = await Stagiaire.deleteOne({ prenom: 'jean-claude'})
    res
        .status(200)
        .json(suppStagiaire);
};