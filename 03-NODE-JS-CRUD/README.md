/******************************************* ETAPES DU PROJET *******************************************/

/********************* I. INITIALISATION *********************/
1. Création du répertoire de projet 
2. On se déplace à l'intérieur du répo
3. On initialise notre projet à nodejs avec : npm init (pour création du fichier package json)

4. Création du fichier app.js
5. Modification du script package json = ajout clé "start" avec valeur "node app" + Modification de la clé "main" = "app.js"
6. Test du script avec la commande npm start

7. Installation de node express avec la commande = npm i express (le dossier node_modules apparait + package-lock-js + la clé "dependencies" dans le fichier package.json)

8. Installation uniquement en mode développement de l'outil (watcher) nodemon avec la commande = npm i nodemon --save-dev 
8bis. Modifier la clé "start" du script dans package json la valeur de start devient "nodemon app" (on démarre toujours avec npm start)

9. Création du serveur app avec module express dans app.js comme ci-suit :

////////////////////////////////////
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
}))
////////////////////////////////////////

10. Modification de la route par défaut GET et ajout d'un code de statut de sa réponse (source : https://developer.mozilla.org/fr/docs/Web/HTTP/Status) comme ci-suit : 

////////////////////////////////////////
app.get('/dwwm/stagiaires', function (req, res) {
    res.status(200).send('Hello World : I\'ll love JS one day...');
})
////////////////////////////////////////

11. Convertir la réponse du serveur en objet JSON comme ci-suit : 

////////////////////////////////////////
app.get('/dwwm/stagiaires', function (req, res) {
    res
    .status(200)
    .json({
        status : res.statusCode,
        message: 'Hello World : I\'ll love JS one day...!',
        heure : Date.now()
    });
});
////////////////////////////////////////

12. Ajout de la route POST pour modification base de donnée comme ci-suit : 

//////////////////////////////////////////
app.post('/dwwm/stagiaires', (req, res) => {
    res
    .status(200).json({
        status : res.statusCode,
        message : 'Route POST OK'
    });
});
////////////////////////////////////////

12bis. Test des routes sur l'outil Rest Client

13. Ajout de la route GET BY ID pour récupérer 1 stagiaire à partir de son identifiant comme ci-suit :

/////////////////////////////////////////////////
//Le parametre :id est indiqué dans la route
app.get('/dwwm/stagiaires/:id', function (req, res) {
    //.params = cible les paramètres indiqués dans la route
    console.log(req.params);
        res
            .status(200)
            .json({
                status : res.statusCode, 
                message : 'Route GET BY ID OK'
            });
});
/////////////////////////////////////////////////

14. Ajout de la route PUT BY ID pour modifier 1 stagiaire en base de donnée à partir de son ID (voir app.js)


15. Ajout de la route DELETE BY ID pour supprimer 1 stagiaire en base de donnée à partir de son ID (voir app.js)

/********************* II. ORGANISATION MVC *********************/

1. Les Routes 
(source : https://expressjs.com/fr/guide/routing.html)
a. Création d'un dossier routes
b. Création d'un fichier stagiaireRoute.js
c. Importer express + appeler la class Router pour utiliser express comme un middleware 

//////////////////////////////////
const express = require('express');
const router = express.Router();
//////////////////////////////////

d. Copier/Coller les routes du app.js au nouveau fichier js de routes 
e. Replacer la const app par la const router créée ci-dessus :

//////////////////////////////////
router
    .route('/')
    .get(function (req, res) {
            res
                .json({
                    statut: res.statusCode,
                    msg: 'Route GET is ok !'
                });

    })
//////////////////////////////////

f. Ajout de la ligne à la fin pour exporter les routes : 

//////////////////////////////////
module.exports = router;
//////////////////////////////////

=> Création du middleware terminé !

2. Appel du middleware des routes dans le app.js 
a. On importe le fichier des routes comme un module au début du fichier : 

//////////////////////////////////
const stagiaireRoutes = require('./routes/stagiaireRoutes')
//////////////////////////////////

b. On appelle le middleware des routes après instanciation du serveur (const app=express()) : 

//////////////////////////////////
app.use('/', stagiaireRouter)
//////////////////////////////////


3. Les controllers. 
Ils vont stocker les fonctions (elles sont dans les routes à ce stade, on va les transférer aux controllers). 
a. création du dossier controllers
b. création du fichier stagiaireControllers.js 
c. on crée un controller par route. Exemple avec le controller allStagiaires qui récupère la fonction de router.get:

/////////////////////////////////////////////////
const allStagiaires = function (req, res) {
    res
        .status(200)
        .json({
            status : res.statusCode,
            message: 'Route GET ALL OK',
        });
};

b. pour pourvoir exporter le controller, on remplace const par exports.
Exemple : 

//////////////////////////////////
exports.allStagiaires = function (req, res) {
    res
        .status(200)
        .json({
            status : res.statusCode,
            message: 'Route GET ALL OK',
        });
};
//////////////////////////////////

c. On importe maitenant le fichier controller dans le fichier des routes, avec le fameux :  

/////////////////////////////////////////////////
const controller = require('../controllers/stagiaireControllers');
/////////////////////////////////////////////////


d. La route get appellera la fonction du controller avec le nom de la const qui stock le fichier + le nom de la fonction : 
/////////////////////////////////////////////////
router 
    .get(controller.allStagiaires)
/////////////////////////////////////////////////

SUPER ! Les controllers sont reliés aux routes.

4. Factorisation des routes (source : https://expressjs.com/fr/guide/routing.html). Après avoir rédiger tous les controllers, on les appelle dans les route. Exemple comme ci-suit :

/////////////////////////////////////////////////
router
    .route('/dwwm/stagiaires')
    .get(controller.allStagiaires)
    .post(controller.addStagiaire);

// ET :
router
    .route('/dwwm/stagiaires/:id')
    .get(controller.getStagiaireById)
    .put(controller.updateStagiaireById)
    .delete(controller.deleteStagiaireById);
/////////////////////////////////////////////////

5. On peut aller plus loin dans la factorisation. Sur le fichier app.js = on modifie l'appel du middleware des routes avec la racines de l'url : 

/////////////////////////////////////////////////
app.use('/dwwm/stagiaires', stagiaireRouter);
/////////////////////////////////////////////////

ET les routes deviennent : 

/////////////////////////////////////////////////
router
    .route('/')
    .get(controller.allStagiaires)
    .post(controller.addStagiaire);

// ET :
router
    .route('/:id')
    .get(controller.getStagiaireById)
    .put(controller.updateStagiaireById)
    .delete(controller.deleteStagiaireById);
/////////////////////////////////////////////////

6. Le fichier d'exécution serveur : www.js
a. Créer un dossier bin 
b. Créer à l'intérieur un fichier www.js
c. D'ABORD il faut  exporter app.js avec : avec

/////////////////////////////////////////////////
module.exports = app;
/////////////////////////////////////////////////

PUIS importer le fichier app.js dans www.js comme ci-suit :

//////////////////////////////////
const app = require('../app');
//////////////////////////////////

d. On coupe/colle les ligne de démarrage du serveur de app.js à www.js

//////////////////////////////////
app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});
//////////////////////////////////

ATTENTION, il faut maintenant modifier le script du package.json !
Le start n'est plus sur le app. Il devient = "start": "nodemon bin/www"


/********************* III. Base de donnée *********************/

I) Confirguration

1. Installation de MonGoDB avec la commande : npm i mongoose (source : https://www.npmjs.com/package/mongoose). La clé apparait dans package.json 

2. Connexion à la database avec organisation mvc 
a. création du dossier config à la racine
b. création du ficher database.js à l'intérieur du dossier
c. import du module mongoose dans le fichier database.js comme ci-suit :

//////////////////////////////////
const mongoose = require('mongoose');
//////////////////////////////////


d. dans database.js = ecrire la fonction pour établir la connexion à mongodb (elle doit pouvoir être exportée ensuite) : 

//////////////////////////////////
exports.mongoConnexion = async () => {
    await mongoose 
        .connect('mongodb+srv://MokkaCobain2:<password>@cluster0.o3zbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        .then(()=>{
            console.log('Connexion au serveur mongogo ok !');
        })
        .catch(erreur => {
            console.log('Connexion au serveur mongogo failed', erreur.message);
        })
}
//////////////////////////////////

IMPORTANT : le lien dans .connect() on le récupère sur son compte https://www.mongodb.com/ comme cela : 
-> Cliquer sur le bouton Connect de son cluster 
-> Choisir l'option Connect your application
-> Copier le lien
-> Remplacer <password> par son mot de passe (on enlève aussi les chevrons)

OU ALORS EN LOCAL on utilise le lien : 

'mongodb://localhost/my_database'
-> En remplaçant my_database par le nom de la db.

e. importer la fonction de connexion à la database dans le fichier principal app.js 

//////////////////////////////////
require('./config/database.js');
//////////////////////////////////

f. pour que la fonction de connexion à la database s'exécute automatiquement il faut la transformer en fonction auto-appelante (IEF) c'est-à-dire l'entourer de parenthèse et rajouter () sans argument à la fin. Comme ci-suit : 

//////////////////////////////////
exports.mongoConnexion = (async () => {
    await mongoose 
        .connect('mongodb+srv://MokkaCobain2:<password>@cluster0.o3zbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        .then(()=>{
            console.log('Connexion au serveur mongogo ok !');
        })
        .catch(erreur => {
            console.log('Connexion au serveur mongogo failed', erreur.message);
        })
})()
//////////////////////////////////

||Pour rappel, "await" permet d'exécuter une fonction asynchrone entièrement avant d'exécuter la suite du code||

II) Construction Database

1. Organisation mvc 
a. création du dossier models
b. création du fichier stagiaireModel.js


2. Création du model Stagiaire (la table stagiaire de la database)
(source : https://mongoosejs.com/docs/guide.html#definition)
Le langage MonGoDB est le BSON. Pour pouvoir écrire en JSON et le traduire à la database, on utilise mongoose...

a. Donc d'abord, on importe le module mongoose comme ci-suit :

//////////////////////////////////
const mongoose = require('mongoose');
//////////////////////////////////

b. Pour construire un model (une table) avec mongoose, tout commence par un schema. On importe la classe Schema avec : 
(source : https://mongoosejs.com/docs/api.html#mongoose_Mongoose-Schema)

//////////////////////////////////
const Schema = mongoose.Schema;
//////////////////////////////////

c. On peut maintenant instancier un objet à partir de la class Schema, lui attribuer les clés et le type des valeurs pour chaque clé. Cela donne :

//////////////////////////////////
StagiaireSchema = new Schema({
    prenom: String
});
//////////////////////////////////

d. On crée le model (la table). On la stock dans une constante avec la methode mongoose.model(). Il faut passer en argument son nom et le nom du schéma. C'est-à-dire : 

//////////////////////////////////
const Stagiaire = mongoose.model('Stagiaires', StagiaireSchema);
//////////////////////////////////

e. On exporte le model avec :

//////////////////////////////////
module.exports = Stagiaire;
//////////////////////////////////

|| Le model (la table) "Stagiaire" aura 1 document (une ligne) "prenom" dont les valeurs seront des chaine de caractère||

3. Le controller COMMUNIQUE avec le model

a. Etablir la connexion entre les controllers et les models. 
Importer le fichier model dans le fichier stagiaireControllers : 

//////////////////////////////////
const Stagiaire = require('../models/stagiaireModel');
//////////////////////////////////

b. Appeler les modèles dans les fonctions des controllers. Pour ce faire, on utilise les QUERIES dédiées 
(sources : https://mongoosejs.com/docs/queries.html)

Exemple ci-dessous avec le controller de lecture "allStagiaire" (appelé avec la rotue get) qui permet de récupérer la liste de tous documents de la db stagiaire_db. 
On appelle le model avec la methode .find() puis on rend la fonction du controler asynchrone, comme ci-suit : 

//////////////////////////////////
exports.allStagiaires =  async function (req, res) {
     // On apelle le model
    const tousStagiaires = await Stagiaire.find({});

    res
        // On renvoie le model dans la reponse
        .json(tousStagiaires);
};
//////////////////////////////////

ATTENTION : pour les controllers de type écriture (post) on va devoir créé le middleware de traduction en format json. On ajoute donc dans app.js :

app.use(express.json());

4. Les fonctions mongoose pour communiquer avec la base de données en JSON 
(source : https://mongoosejs.com/docs/queries.html)


/******************* IV. LE FICHIER ENVIRONNEMENT *******************/

1. Création du fichier : ".env" à la racine du projet. 
(Source : https://www.npmjs.com/package/dotenv)

Ce fichier regroupe les clés valeurs des infos confidentielles. Exemple : 
DB_PASSWORD_REMOTE=1234

2. Import du fichier .env dans app.js avec la commande : 
//////////////////////////////////
require('dotenv').config();
//////////////////////////////////

/********************* IV. LE MOTEUR DE VIEW *********************/

On utilise TWIG : 

1. Installer twig avec la commande npm i twig

(source : https://www.npmjs.com/package/twig)

(configuration de moteur de vue : https://expressjs.com/en/guide/using-template-engines.html)

(la documentation : https://twig.symfony.com/doc/3.x/)

2. Il faut ensuite configurer le moteur de vue dans app.js avec le chemin vers les fichiers twig (dans le dossier views) :

//////////////////////////////////
app.set('views', './views')

app.set('view engine', 'twig')
//////////////////////////////////

3. 
