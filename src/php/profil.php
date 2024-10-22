<?php
session_start();
include 'db.php'; // Inclure le fichier de connexion à la base de données

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Récupérer l'ID de l'utilisateur de la session
    $userId = $_SESSION['user_id'];
    echo "User ID: " . $userId . "<br>"; // Vérifier l'ID de l'utilisateur

    // Vérifier si une nouvelle image de profil a été choisie
    if (isset($_POST['profile_picture'])) {
        $newProfilePicture = $_POST['profile_picture'];
        echo "New Profile Picture: " . $newProfilePicture . "<br>"; // Vérifier la nouvelle image

        // Mettre à jour la base de données avec la nouvelle image de profil
        $stmt = $pdo->prepare("UPDATE Users SET profile_picture = :profile_picture WHERE id = :id");
        $stmt->execute([
            'profile_picture' => $newProfilePicture,
            'id' => $userId
        ]);

        echo "Image mise à jour avec succès.<br>"; // Vérifier que la mise à jour a réussi

        // Rediriger l'utilisateur vers une autre page (par exemple, profil.php)
        header('Location: ../pages/profil.php');
        exit();
    } else {
        echo "Aucune image de profil sélectionnée.<br>";
    }
} else {
    echo "La méthode de requête n'est pas POST.<br>";
    // Rediriger si la méthode de requête n'est pas POST
    header('Location: ../pages/profil.php');
    exit();
}
?>
