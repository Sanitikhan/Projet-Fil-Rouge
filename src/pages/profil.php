<?php
session_start();

include '../php/db.php'; // Inclure le fichier de connexion à la base de données

// Récupérer les informations de l'utilisateur
$userId = $_SESSION['user_id'];
$stmt = $pdo->prepare("SELECT profile_picture FROM Users WHERE id = :id");
$stmt->execute(['id' => $userId]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

$profilePicture = $user['profile_picture'] ?: '../../image/profil.png';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>R☆NA</title>
    <link rel="icon" href="../../image/logo.png" type="image/png">
    <link rel="stylesheet" href="../../index.css">
    <link rel="stylesheet" href="../css/profil.css">
</head>
<body>
    <div class="container">
        <div class="row fond-page">
        <navbar>
                <div class="logo">
                    <h1 class="texte-logo">R☆NA</h1>
                </div>
                <div class="pages">
                    <div class="page1">
                        <a href="moodboard.php" class="pages">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                            <p>Moodboard</p>
                        </a>
                    </div>
                    <div class="page2">
                        <img src="">
                        <a href="taches.php" class="pages">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                            <p>Mes tâches</p>
                        </a>
                    </div>
                </div>

                <div class="footer-navbar">
                    <div class="profil">
                        <a href="profil.php" class="active">
                        <img id="profileImage" src="<?php echo $profilePicture; ?>" alt="Profile Picture" class="profile-pic">
                        </a>
                    </div>
                        <a href="parametres.php">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
                        </a>
                        <a href="../php/logout.php" class="logout">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 224c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"/></svg>
                        </a>
                    <div class="fermer-sidebar">
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
                        </a>
                    </div>
                </div>
            </navbar>

            <div class="row">
                <div class="col">
                    <div class="zone-profil">
                        <div class="title-profil">
                            <h2>Mon profil</h2>
                        </div>
                            <h3>Choisissez une photo de profil</h3>

                            <div id="profile-options">
                                <form method="POST" action="../php/profil.php">
                                    <label>
                                    <input type="radio" name="profile_picture" value="../../image/profiles/h2.png">
                                        <img src="../../image/profiles/h2.png" alt="Profile 1" class="profile-option" data-image="../../image/profiles/h2.png">
                                    </label>
                                    <label>
                                        <input type="radio" name="profile_picture" value="../../image/profiles/f5.png">
                                        <img src="../../image/profiles/f5.png" alt="Profile 2" class="profile-option" data-image="../../image/profiles/f5.png">
                                    </label>
                                    <label>
                                        <input type="radio" name="profile_picture" value="../../image/profiles/h1.png">
                                        <img src="../../image/profiles/h1.png" alt="Profile 3" class="profile-option" data-image="../../image/profiles/h1.png">
                                    </label>
                                    <label>
                                        <input type="radio" name="profile_picture" value="../../image/profiles/f2.png">
                                        <img src="../../image/profiles/f2.png" alt="Profile 4" class="profile-option" data-image="../../image/profiles/f2.png">
                                    </label>    
                                    <label>
                                        <input type="radio" name="profile_picture" value="../../image/profiles/f3.png">
                                        <img src="../../image/profiles/f3.png" alt="Profile 5" class="profile-option" data-image="../../image/profiles/f3.png">
                                    </label>
                                    <label>
                                        <input type="radio" name="profile_picture" value="../../image/profiles/f4.png">
                                        <img src="../../image/profiles/f4.png" alt="Profile 6" class="profile-option" data-image="../../image/profiles/f4.png">
                                    </label>
                                    <label>
                                        <input type="radio" name="profile_picture" value="../../image/profiles/h4.png">
                                        <img src="../../image/profiles/h4.png" alt="Profile 7" class="profile-option" data-image="../../image/profiles/h4.png">
                                    </label>
                                    <label>
                                        <input type="radio" name="profile_picture" value="../../image/profiles/h3.png">
                                        <img src="../../image/profiles/h3.png" alt="Profile 8" class="profile-option" data-image="../../image/profiles/h3.png">
                                    </label>
                                    <label>
                                        <input type="radio" name="profile_picture" value="../../image/profiles/h5.png">
                                        <img src="../../image/profiles/h5.png" alt="Profile 9" class="profile-option" data-image="../../image/profiles/h5.png">
                                    </label>
                                    <label>
                                        <input type="radio" name="profile_picture" value="../../image/profiles/f1.png">
                                        <img src="../../image/profiles/f1.png" alt="Profile 10" class="profile-option" data-image="../../image/profiles/f1.png">
                                    </label>

                                    <h3>Photo actuelle</h3>
                                    <img id="current-profile-pic" src="<?php echo $profilePicture; ?>" alt="Votre photo de profil actuelle">
                                    
                                    <div class="zone-boutons">
                                        <button type="submit">Sauvegarder</button>
                                    </div>

                                </form>
                            </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    
    <script src="../js/profil.js"></script>
    <script src="../js/navbar.js"></script>
</body>
</html>