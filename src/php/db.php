<?php
// Connexion à la base de données
$host = 'localhost';
$db = 'rana';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    // Créer une instance PDO pour se connecter à la base de données
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    // Gérer les erreurs de connexion
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données : ' . $e->getMessage()]);
    exit();  // Arrêter l'exécution du script en cas d'échec de la connexion
}