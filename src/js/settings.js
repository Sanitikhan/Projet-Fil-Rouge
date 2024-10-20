document.addEventListener('DOMContentLoaded', function() {
    const profilePicForm = document.getElementById('profilePicForm');
    const fileInput = document.getElementById('newProfilePic');
    const previewImage = document.getElementById('previewImage');

    // Prévisualiser l'image sélectionnée
    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block'; // Affiche l'image
            };

            reader.readAsDataURL(file);
        }
    });

    // Gestion de l'upload de l'image
    profilePicForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const file = fileInput.files[0];

        if (file) {
            // Ici, tu peux faire un appel à ton serveur pour sauvegarder l'image
            console.log('Image prête à être envoyée au serveur');
        } else {
            alert('Veuillez sélectionner une image.');
        }
    });
});
