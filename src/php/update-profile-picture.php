<?php
session_start();
include 'db.php'; // Inclure le fichier de connexion à la base de données

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Récupérer l'ID de l'utilisateur
    $userId = $_SESSION['user_id'];
    
    // Récupérer le chemin de l'image de profil choisie
    $profilePicture = $_POST['profile_picture'];

    // Préparer la requête pour mettre à jour l'image de profil
    $stmt = $pdo->prepare("UPDATE Users SET profile_picture = :profile_picture WHERE id = :id");
    $stmt->execute([
        'profile_picture' => $profilePicture,
        'id' => $userId
    ]);
    
    // Rediriger vers la page de profil ou une autre page
    header('Location: ../html/profil.html');
    exit();
}
?>
