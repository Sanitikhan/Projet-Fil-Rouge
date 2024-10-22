<?php
session_start(); // Assurez-vous que la session est démarrée
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>R☆NA</title>
    <link rel="stylesheet" href="src/css/login.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="icon" href="images/logo.png">

</head>
    <body>
        
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
 
        <div class="card-login">
            <h1 class="big-txt">Heureux de te revoir sur R☆NA!</h1>
            <form method="POST" action="src/php/login.php" class="formulaire">
                <div class="mb-3">
                    <label for="email" class="form-label">Email address
                    <input type="email" name="email" class="form-control" id="email" placeholder="name@example.com" required></label>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Mot de passe
                    <input type="password" name="password" class="form-control" id="password" placeholder="mot de passe" required></label>
                </div>
                <a class="mdp">Mot de passe oublié</a>
                <button type="submit" class="login-button">Connexion</button>
            </form>
        </div>

    </body>
</html>