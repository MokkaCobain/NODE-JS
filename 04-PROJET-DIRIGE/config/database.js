
const mongoose = require('mongoose');

exports.connexionMonGo = (async () => {
    
   await mongoose
   .connect('mongodb://localhost/employe_db')
   
    .then( () => {

        console.log('Connexion BDD est good !');
    })
    .catch( (err) => {
        console.error('Connexion BDD failed', err.message);
    })

})();