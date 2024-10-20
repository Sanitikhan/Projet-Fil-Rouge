document.addEventListener('DOMContentLoaded', function() {
    const profilePictures = document.querySelectorAll('.profile-option');
    const currentProfilePic = document.getElementById('current-profile-pic');
    const saveButton = document.getElementById('saveProfilePicture');

    // Charger l'utilisateur connecté à partir du localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Afficher la photo de profil actuelle (si définie)
    if (loggedInUser && loggedInUser.profilePicture) {
        currentProfilePic.src = loggedInUser.profilePicture;
    } else {
        currentProfilePic.src = '../image/profil.png';  // photo de profil par défaut
    }

    let selectedPicture = loggedInUser.profilePicture;  // Par défaut, la photo actuelle

    // Gestion de la sélection de la photo de profil
    profilePictures.forEach(picture => {
        picture.addEventListener('click', function() {
            selectedPicture = this.dataset.image;  // Mettre à jour l'image sélectionnée
            currentProfilePic.src = selectedPicture;  // Prévisualiser la photo sélectionnée
        });
    });

    // Sauvegarder la photo de profil
    saveButton.addEventListener('click', function() {
        if (loggedInUser) {
            loggedInUser.profilePicture = selectedPicture;

            // Mettre à jour les données dans le localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

            // Émettre un événement personnalisé pour indiquer que la photo de profil a changé
            window.dispatchEvent(new Event('profilePictureChanged'));

            alert('Photo de profil sauvegardée avec succès !');
        } else {
            alert('Erreur : Aucun utilisateur connecté');
        }
    });

});

document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.getElementById('profileImage');

    // Fonction pour mettre à jour l'image de profil
    function updateProfileImage() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser && loggedInUser.profilePicture) {
            profileImage.src = loggedInUser.profilePicture;
        } else {
            profileImage.src = '../image/profil.png';  // photo de profil par défaut
        }
    }

    // Mettre à jour l'image de profil au chargement de la page
    updateProfileImage();

    // Écouter l'événement personnalisé
    window.addEventListener('profilePictureChanged', updateProfileImage);
});

