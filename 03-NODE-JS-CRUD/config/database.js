
// Import du module mongoose
const mongoose = require('mongoose');

// Fonction BDD locale
const LOCAL_SERVER = process.env.DB_HOST_LOCAL
.replace('<DATABASE>', process.env.DB_NAME_LOCAL);


const REMOTE_SERVER = process.env.DB_HOST_REMOTE
    .replace('<USER>', process.env.DB_USER_REMOTE)
    .replace('<PASSWORD>', process.env.DB_PASSWORD_REMOTE)
    .replace('<DATABASE>', process.env.DB_NAME_REMOTE);

const DB_SERVER = process.env.NODE_ENV === 'prod' ? REMOTE_SERVER : LOCAL_SERVER;

// Etablir la connexion et la vérifier
exports.mongoConnexion = (async () => {
    await mongoose // await appelle une fonction asynchrone et attend la fin de son exécution avant d'exécuter la suite du code
        .connect(DB_SERVER)
        .then( () => {
            console.log(DB_SERVER);
            console.log('Connexion au serveur mongogo ok !');
        })
        .catch(erreur => {
            console.log('Connexion au serveur mongogo failed...', erreur.message);
        })
})();


