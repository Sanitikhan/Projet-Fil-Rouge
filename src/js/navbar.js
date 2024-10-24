document.querySelector('.fermer-sidebar a').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('navbar').classList.toggle('reduced');
});
