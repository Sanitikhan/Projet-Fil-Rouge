// Configuration de la connexion à la bdd
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rana',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Utilisation des promesses
const promisePool = pool.promise();