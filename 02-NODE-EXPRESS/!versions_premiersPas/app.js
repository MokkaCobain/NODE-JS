
//On importe le module express
const express = require('express');

// Création d'une instance de serveur (node = .createServeur)
const app = express();

//On définit le port d'écoute
const port = 9740;

// EXEMPLE DE MIDDLEWARE
const exempleMiddleware = function (req, res, next) {
    console.log('LOGGED')
    next()
}

// FACTORISER LES CONSTANCES DE REQUETES
const tousLesStagiaires = (req, res) => {
    res
        .status(200)
        .json({
            "msg": "Get OK !"
        });
};
const ajouterUnStagiaire = (req, res) => {
    res
        .status(200)
        .json({
            "msg": "POST OK !"
        });
};
const rechercherUnStagiaire = (req, res) => {
    res
        .status(200)
        .json({
            "msg": `METHODE GET de parametre ${req.params.id} OK !`
        });
};
const modifierUnStagiaire = (req, res) => {
    res
        .status(200)
        .json({
            "msg": `METHODE PUT de parametre ${req.params.id} OK !`
        });
};
const supprimerUnStagiaire = (req, res) => {
    res
        .status(200)
        .json({
            "msg": `METHODE DELETE de parametre ${req.params.id} OK !`
        });
};

// // FACTORISER LES ROUTES
// app.get('/api/stagiaires', tousLesStagiaires);
// app.post('/api/stagiaires', ajouterUnStagiaire);
// app.get('/api/stagiaires/:id', rechercherUnStagiaire);
// app.put('/api/stagiaires/:id', modifierUnStagiaire);
// app.delete('/api/stagiaires/:id', supprimerUnStagiaire);


// METHODE 2 : CHAINAGE DES ROUTES avec la méthodes .route()
app.route('/api/stagiaires')
    .get(tousLesStagiaires)
    .post(ajouterUnStagiaire);

app.route('/api/stagiaires/:id')
    .get(rechercherUnStagiaire)
    .put(modifierUnStagiaire)
    .delete(supprimerUnStagiaire);

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Application dispo )à l'adresse http://localhost:${port}`);
});
