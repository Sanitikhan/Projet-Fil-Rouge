// Get the modal
var afficherModal = document.getElementById("afficherModal");
var modifierModal = document.getElementById("modifierModal");

// Récupérer les éléments <span> qui ferment les modals
var closeBtns = document.getElementsByClassName("close");


// Ouvrir le deuxième modal (par exemple au clic d'un autre bouton)
function openModifierModal() {
    modifierModal.style.display = "flex";
}

// Fermer les modals lorsque l'utilisateur clique sur <span> (x)
for (var i = 0; i < closeBtns.length; i++) {
    closeBtns[i].onclick = function() {
        this.parentElement.parentElement.style.display = "none";
    };
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == afficherModal) {
    afficherModal.style.display = "none";
  }
}
window.onclick = function(event) {
    if (event.target == modifierModal) {
      modifierModal.style.display = "none";
    }
}

function deleteCard(cardId) {
    const card = document.getElementById(cardId);
    if (card) {
        card.remove();
    }
}