


// LES CONTROLLERS DE MON APPLICATION

/**
 * Permet de récupérer tous les stagiaires en BDD
 * @param req 
 * @param res 
 */
 exports.allStagiaires = function (req, res) {
    res
        .status(200)
        .json({
            status : res.statusCode,
            message: 'Route GET ALL OK',
        });
};

/** 
 * Permet d'ajouter un stagiaire en BSS
 * @param req 
 * @param res 
 */
exports.addStagiaire = (req, res) => {
    res
        .status(200)
        .json({
            status : res.statusCode,
            message : 'Route POST OK', 
          
        });
};

/**
 * Permet de récupérer 1 stagiaire à partir de son ID en BDD
 * @param req 
 * @param res 
 */
exports.getStagiaireById = function (req, res) { 
    //.params = cible les paramètres indiqués dans la route
    console.log(req.params); 
        res
            .status(200)
            .json({
                status : res.statusCode, 
                message : 'Route GET BY ID OK'
            });
};

/**
 * Permet de modifier un stagiaire à partir de son ID en BSS
 * @param req 
 * @param res 
 */
exports.updateStagiaireById = function (req, res) {
    res
        .status(200)
        .json({
            status : res.statusCode, 
            message : 'Route PUT BY ID OK'
        });
};

/**
 * Permet de supprimer un Stagiaire à partir de son ID en BDD
 * @param req 
 * @param res 
 */
exports.deleteStagiaireById = function (req, res) {
    res
        .status(200)
        .json({
            status : res.statusCode, 
            message : 'Route DELETE BY ID OK'
        });
};