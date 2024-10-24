const mysql = require('mysql'); // Ensure you have mysql package

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Make sure this is correct
    password: '', // Ensure this is correct
    database: 'rana', // The database you are trying to connect to
});

// Attempt to connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL.');
});
