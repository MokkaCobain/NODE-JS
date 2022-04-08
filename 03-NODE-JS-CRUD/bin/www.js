


// Import du module app.js
const app = require('../app');

/////////////////////////////////////////////////
// DEMARRAGE DU SERVEUR

// Import du paramètre dans le fichier environnement
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

