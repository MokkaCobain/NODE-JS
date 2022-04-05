// Test du script start
console.log("TEST");

// Création du serveur app 
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
})