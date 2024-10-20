function updateProfilePictureInJSON(email, newProfilePicture) {
    fetch('../src/json/connexion.json', {
        method: 'PATCH', // ou POST, selon votre backend
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, profilePicture: newProfilePicture })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de la photo de profil');
        }
        return response.json();
    })
    .then(data => {
        console.log('Photo de profil mise à jour:', data);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const profilePictures = document.querySelectorAll('.profile-option');
    const currentProfilePic = document.getElementById('current-profile-pic');
    const saveButton = document.getElementById('saveProfilePicture');
    const cancelButton = document.getElementById('cancelProfilePicture');

    // Charger l'utilisateur connecté à partir du localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Afficher la photo de profil actuelle (si définie)
    if (loggedInUser && loggedInUser.profilePicture) {
        currentProfilePic.src = loggedInUser.profilePicture;
    } else {
        currentProfilePic.src = '../image/profiles/profil.png';  // photo de profil par défaut
    }

    let selectedPicture = loggedInUser.profilePicture;  // Par défaut, la photo actuelle

    // Gestion de la sélection de la photo de profil
    profilePictures.forEach(picture => {
        picture.addEventListener('click', function() {
            selectedPicture = this.dataset.image;  // Mettre à jour l'image sélectionnée
            currentProfilePic.src = selectedPicture;  // Prévisualiser la photo sélectionnée
        });

        
    // Annuler le choix de la photo de profil
    cancelButton.addEventListener('click', function() {
        selectedPicture = loggedInUser?.profilePicture || 'image/profiles/profil.png';  // Revenir à la photo actuelle
        currentProfilePic.src = selectedPicture;  // Mettre à jour l'affichage
    });
    });

    // Sauvegarder la photo de profil
    saveButton.addEventListener('click', function() {
        if (loggedInUser) {
            loggedInUser.profilePicture = selectedPicture;

            // Mettre à jour les données dans le localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

            // Mettre à jour la photo de profil dans le fichier JSON
            updateProfilePictureInJSON(loggedInUser.email, selectedPicture);

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
            profileImage.src = '../image/profiles/profil.png';  // photo de profil par défaut
        }
    }

    // Charger l'utilisateur connecté à partir du localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Afficher la photo de profil actuelle (si définie)
    if (loggedInUser && loggedInUser.profilePicture) {
        profileImage.src = loggedInUser.profilePicture; // Mettre à jour la source de l'image
    } else {
        profileImage.src = '../image/profiles/profil.png'; // photo de profil par défaut
    }

    // Mettre à jour l'image de profil au chargement de la page
    updateProfileImage();

    // Écouter l'événement personnalisé
    window.addEventListener('profilePictureChanged', updateProfileImage);
});

