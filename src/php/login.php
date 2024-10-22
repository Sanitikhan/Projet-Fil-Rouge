<?php

// Inclure le fichier de connexion à la base de données
include 'db.php';

session_start(); // Démarrer la session

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Récupérer les données du formulaire
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    // Préparer la requête pour trouver l'utilisateur par email
    $stmt = $pdo->prepare("SELECT * FROM Users WHERE email = :email");
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Vérifier si l'utilisateur existe et si le mot de passe correspond
    if ($user && password_verify($password, $user['password'])) {
        // Stocker les informations dans la session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_role'] = $user['role'];
        $_SESSION['user_profile_picture'] = $user['profile_picture'];
        
        // Rediriger l'utilisateur vers la page d'accueil ou une autre page
        header('Location: ../pages/moodboard.php');
        exit();
    } else {
        // Si l'authentification échoue
        echo "Email ou mot de passe incorrect.";
    }
} else {
    echo "Méthode non autorisée.";
}

// Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
if (!isset($_SESSION['user_id'])) {
    header('Location: ../../index.php');
    exit();
}

$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$stmt = $pdo->prepare("INSERT INTO Users (email, password, name) VALUES (:email, :password, :name)");
$stmt->execute([
    'email' => $_POST['email'],
    'password' => $password,
]);

?>
