/****************************************************************
 * *** PREMIERS PAS 
 * **************************************************************/

// let prenom = `joachim`;
// console.log(prenom);

// const http = require("http");

// const server = http.createServer(function(req, res) {
// console.log("je vous reçois, et vous?");
// console.log(req.url);
// res.end("<h1>je vous reçois, et vous?</h1>")
// });


// server.listen(5500, "127.0.0.1", () => {
//     console.log("Allô ? Le serveur est à votre écoute à l'adresse http://127.0.0.1:5500");
// });



////////////////////////////////////////////////////////////////////////////////////////////////

console.log("Bonjour bienvenus dans la découverte de NODE JS");

const fs = require("fs");

//Comportement Synchrone
console.log(fs.readFileSync("text/entree.txt", "uft-8"));
console.log("Fin de la lecture du fichier");

// //Comportement Asynchrone
fs.readFile("text/entree.txt", "utf-8", (err, data) => {

        console.log(data);
});
console.log("Fin de la lecture du fichier");

///////////////////////////////////////////////////////////////////////////////////////////////


const http = require("http");

// Créer une instance du serveur node 
const server = http.createServer( (request, response) => {

    //On déclare les éléments du header de la réponse
    response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8", // permets d'interpreter les caractères spéciaux
    "mon-header-perso" : "Bonjour à tous" 
    });

    // La root de l'url : affichage alternatif
    let pathName = request.url;
    // console.log(pathName);

    if(pathName === '/stagiaires'){

        response.end('<h1>Pages liste des stagiaires</h1>');

    }else if(pathName === '/stagiaire'){

        response.end(`<h1>Page de detail d'un stagiaire</h1>`);

    }else if(pathName==='/'){

        response.end(`<h1>Page d'accueil du site</h1>`);

    }else{
        response.writeHead(200, {

            'Content-Type': 'text/html; charset=utf-8'
        });

        response.end(`<h1 style="color: red">Page introuvable sur le serveur</h1>`);
    }

}); // On sort de la fonction createServer


// On démarre l'instance du serveur
server.listen(9740, "localhost", () => {

    console.log("Serveur disponible à l'adresse http://localhost:9740");

});

// Autre manière de lancer l'instance du serveur
server.listen(9740);


