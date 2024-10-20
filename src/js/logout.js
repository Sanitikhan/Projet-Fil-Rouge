document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function() {
        // Supprimer l'utilisateur connecté du localStorage
        localStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('loggedInUser'); // Si vous avez utilisé sessionStorage

        // Rediriger vers la page de connexion
        window.location.href = 'login.html'; // Remplacez par le chemin de votre page de connexion
    });
});
