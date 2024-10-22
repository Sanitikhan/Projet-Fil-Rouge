
<?php
// Inclure le fichier de connexion à la base de données
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Récupérer les données du formulaire
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Image par défaut
    $defaultImage = '../../image/profiles/profil.png'; // Chemin vers votre image par défaut

     // Préparer la requête d'insertion
     $stmt = $pdo->prepare("INSERT INTO Users (email, password, profile_picture) VALUES (:email, :password, :profile_picture)");
     $stmt->execute([
         'email' => $email,
         'password' => $password,
         'profile_picture' => $defaultImage
     ]);

    // Vérifier si l'email existe déjà
    $stmt = $pdo->prepare("SELECT * FROM Users WHERE email = :email");
    $stmt->execute(['email' => $email]);
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingUser) {
        echo "Cet email est déjà utilisé. Veuillez en choisir un autre.";
    } else {
        // Hacher le mot de passe
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Gérer le téléchargement de la photo de profil
        $profilePicturePath = null;
        if (isset($_FILES['profile_picture']) && $_FILES['profile_picture']['error'] == 0) {
            $uploadDir = 'uploads/profile_pictures/'; // Répertoire où stocker les images
            $fileName = basename($_FILES['profile_picture']['name']);
            $targetFilePath = $uploadDir . uniqid() . '_' . $fileName; // Renommer le fichier pour éviter les collisions

            // Déplacer le fichier téléchargé
            if (move_uploaded_file($_FILES['profile_picture']['tmp_name'], $targetFilePath)) {
                $profilePicturePath = $targetFilePath; // Stocker le chemin si le téléchargement a réussi
            }
        }

        // Insérer l'utilisateur dans la base de données
        $stmt = $pdo->prepare("INSERT INTO Users (email, password, profile_picture, role) VALUES (:email, :password, :profile_picture, 'user')");
        $stmt->execute([
            'email' => $email,
            'password' => $hashedPassword,
            'profile_picture' => $profilePicturePath,
        ]);

        // Rediriger vers la page de connexion après l'inscription
        header('Location: ../../login.html');
        exit();
    }

}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription - R☆NA</title>
    <link rel="stylesheet" href="src/css/register.css">
</head>
<body>
    <div class="card-register">
        <h1>Inscription</h1>
        <form method="POST" action="register.php" enctype="multipart/form-data">
    <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" name="email" class="form-control" id="email" required>
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input type="password" name="password" class="form-control" id="password" required>
    </div>
    <div class="mb-3">
        <label for="profile_picture" class="form-label">Photo de profil</label>
        <input type="file" name="profile_picture" class="form-control" id="profile_picture" accept="image/*">
    </div>
    <button type="submit" class="register-button">S'inscrire</button>
</form>

    </div>
</body>
</html>
