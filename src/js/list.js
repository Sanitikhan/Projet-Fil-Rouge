document.querySelectorAll('.depliant-titre').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling; // Trouve l'élément suivant (le contenu)

        // Bascule l'affichage du contenu
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});
