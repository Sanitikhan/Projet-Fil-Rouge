const express = require('express');
const app = express();
const port = 3000; // http://localhost:3000

app.get('/', (req, res) => {
  res.send('Bienvenue sur notre API Express.js !');
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

// Analyser les requêtes avec un corps en JSON
app.use(express.json());