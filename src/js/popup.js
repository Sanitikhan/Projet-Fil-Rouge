// Récupérer le modal
var modal = document.getElementById("myModal");

// Récupérer le bouton qui ouvre le modal
var btn = document.getElementById("openModalBtn");

// Récupérer l'élément <span> qui ferme le modal
var span = document.getElementsByClassName("close")[0];

// Quand l'utilisateur clique sur le bouton, ouvrir le modal
btn.onclick = function() {
    modal.style.display = "block";
}

// Quand l'utilisateur clique sur <span> (x), fermer le modal
span.onclick = function() {
    modal.style.display = "none";
}

// Quand l'utilisateur clique en dehors du modal, le fermer
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Soumettre le formulaire
document.getElementById("createGroupForm").onsubmit = function(e) {
    e.preventDefault(); // Empêcher le rechargement de la page
    // Logique pour créer le groupe ici

    // Fermer le modal après soumission
    modal.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
  loadUsers(); // Charge les utilisateurs après le chargement du DOM
});

function loadUsers() {
  fetch('../php/get_members.php')
  .then(response => response.json())
  .then(data => {
      if (Array.isArray(data)) {
          const membersSelect = document.getElementById('members');
          membersSelect.innerHTML = ''; // Réinitialiser le contenu

          data.forEach(user => {
              const option = document.createElement('option');
              option.value = user.id; // ID de l'utilisateur
              option.textContent = user.name; // Nom de l'utilisateur
              membersSelect.appendChild(option);
          });
      } else {
          console.error('Expected an array, but got:', data);
      }
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}



document.addEventListener('DOMContentLoaded', function() {
  loadUsers();
});


// Quand l'utilisateur clique sur le bouton, ouvrir le modal et charger les utilisateurs
btn.onclick = function() {
  loadUsers(); // Charger les utilisateurs
  modal.style.display = "block";
}




// Gérer la soumission du formulaire
document.getElementById('createGroupForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Empêcher le comportement par défaut du formulaire

  const groupName = document.getElementById('groupName').value;
  const membersSelect = document.getElementById('members');
  const members = Array.from(membersSelect.selectedOptions).map(option => option.value);

  const data = {
      groupName: groupName,
      members: members,
      created_by: userId,/* ID de l'utilisateur connecté */
  };

  fetch('../pages/taches.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
      if (result.success) {
          alert('Groupe créé avec succès');
          // Ferme le modal ou fais autre chose ici
      } else {
          alert('Erreur lors de la création du groupe : ' + result.message);
      }
  })
  .catch(error => {
      console.error('Erreur:', error);
  });
});

