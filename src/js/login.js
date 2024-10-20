document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    // Chargement des utilisateurs à partir du fichier JSON
    fetch('../src/json/profil.json')
        .then(response => response.json())
        .then(data => {
            const users = data.users;

            // Gestion de la soumission du formulaire de connexion
            loginForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Empêche l'envoi du formulaire par défaut

                // Récupération des valeurs du formulaire
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                // Validation avec les données JSON
                const user = validateLogin(users, email, password);

                if (user) {
                    // Stocker les informations de l'utilisateur connecté (par ex. en localStorage)
                    localStorage.setItem('loggedInUser', JSON.stringify(user));

                    // Redirection vers la page des index après connexion réussie
                    window.location.href = '../../index.html';
                } else {
                    alert('Email ou mot de passe incorrect');
                }
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des données JSON', error);
        });

    // Fonction de validation
    function validateLogin(users, email, password) {
        // Trouver l'utilisateur correspondant dans le fichier JSON
        return users.find(user => user.email === email && user.password === password);
    }
});
