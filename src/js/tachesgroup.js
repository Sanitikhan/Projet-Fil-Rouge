// Fonction pour afficher les groupes et leurs tâches avec deadlines dans le DOM
function renderGroups() {
    const zoneCardsTaches = document.getElementById('zoneCardsTaches');
    
    // Vider toutes les cartes sauf la carte "ajouter"
    zoneCardsTaches.innerHTML = '';
    
    groupsData.groups.forEach((group, groupIndex) => {
        const groupCard = document.createElement('div');
        groupCard.classList.add('card', 'card-tache1');

        let tasksHTML = '';
        group.tasks.forEach((task) => {
            tasksHTML += `
                <div class="task">
                    <p><strong>Tâche :</strong> ${task.title}</p>
                    <p><strong>Description :</strong> ${task.description}</p>
                    <p><strong>Deadline :</strong> ${task.deadline}</p>
                    <p><strong>Complétée :</strong> ${task.completed ? "Oui" : "Non"}</p>
                </div>
            `;
        });

        groupCard.innerHTML = `
            <div class="card-content">
                <div class="card-title"><p>${group.name}</p></div>
                <div class="tasks-container">
                    ${tasksHTML}
                </div>
                <div class="zone-membres">
                    <p>Membres :</p>
                    <ul>
                        ${group.members.map(member => `<li>${member.name} (${member.role})</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        zoneCardsTaches.appendChild(groupCard);
    });

    // Réajouter la carte "ajouter"
    const cardAjouter = document.getElementById('ajouter-group');
    zoneCardsTaches.appendChild(cardAjouter);
}

// Appel d'exemple pour ajouter une tâche avec deadline et afficher
addTaskToGroupWithDeadline(0); // Ajoute une tâche au groupe 0 avec deadline
renderGroups(); // Affiche les groupes et tâches
