
// Import du module mongoose
const mongoose = require('mongoose');


// Etablir la connexion et la vérifier
exports.mongoConnexion = (async () => {
    await mongoose // await appelle une fonction asynchrone et attend la fin de son exécution avant d'exécuter la suite du code
        .connect('mongodb://localhost:27017/stagiaire_db')
        .then(()=>{
            console.log('Connexion au serveur mongogo ok !');
        })
        .catch(erreur => {
            console.log('Connexion au serveur mongogo failed...', erreur.message);
        })
})();


