<?php
session_start(); // Démarrer la session

// Détruire toutes les données de session
$_SESSION = array(); // Efface toutes les variables de session

// Si vous souhaitez détruire complètement la session, effacez également le cookie de session.
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"], $params["secure"], $params["httponly"]
    );
}

// Détruire la session
session_destroy();

// Rediriger vers la page de connexion ou une autre page
header('Location: ../../index.php'); // Remplacez par la page vers laquelle vous voulez rediriger
exit();
?>
