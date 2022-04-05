
//On importe le module express
const express = require('express');

// Création d'une instance de serveur (node = .createServeur)
const app = express();

//On définit le port d'écoute
const port = 9740;


//Création de la route GET
app.get('/api/stagiaire', (req, res) => {

    //Gestion de la route ci-dessus est dans cette fonction
    res
    .status(200)
    .json( { 
        "msg" : "Get OK !"
    });

});

//Création de la route POST
app.post('/api/stagiaires', (req, res) => {

    res
    .status(200)
    .json( { 
        "msg" : "POST OK !"
    });

});

// Creation de la route parametrée GET
app.get('/api/stagiaires/:id', (req, res) => {

    // console.log(req.params);
    res
        .status(200)
        .json({
            "msg": `METHODE GET de parametre ${req.params.id} OK !`
        });
});

// Creation de la route parametrée PUT
app.put('/api/stagiaires/:id', (req, res) => {
    res
        .status(200)
        .json({
            "msg": `METHODE PUT de parametre ${req.params.id} OK !`
        });
});

// Creation de la route parametrée PUT
app.delete('/api/stagiaires/:id', (req, res) => {
    res
        .status(200)
        .json({
            "msg": `METHODE DELETE de parametre ${req.params.id} OK !`
        });
});



// Démarrage du serveur
app.listen(port, () => {
    console.log(`Application dispo )à l'adresse http://localhost:${port}`);
});