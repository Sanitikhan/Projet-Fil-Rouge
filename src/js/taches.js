let groups = [];

// Charger les groupes depuis le fichier JSON
function loadGroups() {
    fetch('../src/json/data.json')
        .then(response => response.json())
        .then(data => {
            groups = data.groups;
            renderGroups();
        })
        .catch(error => console.error('Erreur:', error));
}

// Afficher les groupes
function renderGroups() {
    const zoneCardsTaches = document.getElementById('zoneCardsTaches');
    zoneCardsTaches.innerHTML = ''; // Vider le conteneur

    groups.forEach(group => {
        const groupCard = document.createElement('div');
        groupCard.classList.add('card', 'card-tache1');
        groupCard.id = group.id;

        // Calculer le pourcentage de complétion
        const completionPercentage = calculateCompletionPercentage(group.tasks)

        // Format tasks
        const tasksHTML = group.tasks.map(task => `
            <li>
                <strong>${task.title}</strong>: ${task.description} (Deadline: ${new Date(task.deadline).toLocaleDateString()} - ${task.completed ? 'Complété' : 'Non Complété'})
            </li>
        `).join('');

        // Format members
        const membersHTML = group.members.map(member => `
            <li>${member.name} (${member.role})</li>
        `).join('');

        // Créer le contenu de la carte avec les données du groupe
        groupCard.innerHTML = `
            <div class="modifier-taches">
                <div class="dropdown">
                    <button class="dropbtn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#F15F61">
                            <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/>
                        </svg>
                    </button>
                    <div class="dropdown-content">
                        <a onclick="openAfficherModal('${group.id}')">Afficher</a>
                        <a onclick="openModifierModal('${group.id}')">Modifier</a>
                        <a onclick="deleteCard('${group.id}')">Supprimer</a>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <div class="card-title"><p>${group.name}</p></div>
                <div class="card-deadline"><p>Deadline: ${new Date(group.deadline).toLocaleDateString()}</p></div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${completionPercentage}%;"></div>
                </div>
                <div class="progress-percent">
                    <p>${completionPercentage.toFixed(0)}% Complété</p>
                </div>
                <div class="zone-membres">
                    <p>Membres :</p>
                    <ul>${membersHTML}</ul>
                </div>
            </div>
        `;

        zoneCardsTaches.appendChild(groupCard); // Ajouter la carte au conteneur

        function calculateCompletionPercentage(tasks) {
            if (!tasks || tasks.length === 0) return 0; // Aucune tâche
            const completedTasks = tasks.filter(task => task.completed).length;
            return (completedTasks / tasks.length) * 100; // Retourne le pourcentage
        }
        
    });

    // Ajouter la carte "Ajouter un groupe"
    const addGroupCard = document.createElement('div');
    addGroupCard.classList.add('card', 'card-ajouter');
    addGroupCard.id = 'ajouter-group';
    addGroupCard.innerHTML = `
        <div class="logo-ajouter" onclick="openAddGroupModal()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#F15F61">
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
            </svg>
        </div>
    `;
    zoneCardsTaches.appendChild(addGroupCard); // Ajouter la carte "Ajouter"
}

// Ouvrir le modal pour ajouter un groupe
function openAddGroupModal() {
    document.getElementById('addGroupModal').style.display = 'flex';
}

// Fermer le modal pour ajouter un groupe
function closeAddGroupModal() {
    document.getElementById('addGroupModal').style.display = 'none';
}

// Ajouter un nouveau groupe
function addNewGroup() {
    const name = document.getElementById('newGroupName').value;
    const membersInput = document.getElementById('newGroupMembers').value.split(',').map(name => ({ name: name.trim(), role: '' }));
    
    const newId = `card${Date.now()}`;

    const newGroup = {
        id: newId,
        name: name,
        tasks: [], // Initialiser un tableau vide pour les tâches
        members: membersInput
    };

    // Ajouter le groupe localement
    groups.push(newGroup);
    renderGroups(); // Re-render les groupes

    // Envoyer le groupe au serveur pour l'enregistrer
    fetch('path/to/data.json', { // Remplace par le chemin vers ton fichier JSON
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ group: newGroup })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout du groupe');
        }
        return response.json(); // Optionnel si tu veux obtenir une réponse du serveur
    })
    .then(data => {
        console.log('Groupe ajouté avec succès:', data);
    })
    .catch(error => {
        console.error('Erreur lors de l\'ajout du groupe:', error);
    });

    // Vider les champs d'entrée
    document.getElementById('newGroupName').value = '';
    document.getElementById('newGroupMembers').value = '';
    
    closeAddGroupModal(); // Fermer le modal
}

function saveGroups() {
    fetch('path/to/data.json', {
        method: 'PUT', // Ou 'PATCH' selon ton API
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ groups: groups })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la sauvegarde des groupes');
        }
        return response.json();
    })
    .then(data => {
        console.log('Groupes sauvegardés avec succès:', data);
    })
    .catch(error => {
        console.error('Erreur lors de la sauvegarde des groupes:', error);
    });
}



// Supprimer une carte de groupe
function deleteCard(groupId) {
    groups = groups.filter(group => group.id !== groupId); // Filtrer le groupe à supprimer
    renderGroups(); // Re-render les groupes
    saveGroups(); // Enregistrer les modifications sur le serveur
}

// Fonction pour afficher les données d'un groupe (modal)
function openAfficherModal(groupId) {
    const group = groups.find(g => g.id === groupId);
    if (group) {
        document.getElementById('nomGroup').textContent = group.name;
        document.getElementById('title-group').value = group.name;
        document.getElementById('members-group').value = group.members.join(', ');
        document.getElementById('stats-group').value = group.completed ? 'Complété' : 'Non Complété';
        document.getElementById('afficherModal').style.display = 'block';
    }
}

// Fermer le modal d'affichage
function closeAfficherModal() {
    document.getElementById('afficherModal').style.display = 'none';
}

// Charger les groupes lorsque le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    loadGroups(); // Charger les groupes
});

function openAfficherModal(groupId) {
    const group = groups.find(g => g.id === groupId);
    if (group) {
        // Affichage des données du groupe
        document.getElementById('title-group').textContent = group.name;
        document.getElementById('description-group').textContent = group.description;
        document.getElementById('members-group').textContent = group.members.map(member => `${member.name} (${member.role})`).join(', ');
        document.getElementById('stats-group').textContent = group.completed ? 'Complété' : 'Non Complété';

        // Affichage des tâches
        const taskContainer = document.getElementById('taskContainer');
        taskContainer.innerHTML = ''; // Vider les tâches actuelles

        // Afficher les tâches actuelles avec la fonctionnalité dépliante
        group.tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');

            taskElement.innerHTML = `
                <button class="collapsible">${task.title}</button>
                <div class="dropdown-content">
                    <p>Description: ${task.description}</p>
                    <p>Deadline: ${new Date(task.deadline).toLocaleString()}</p>
                    <p>Status: ${task.completed ? 'Complétée' : 'Non Complétée'}</p>
                </div>
            `;

            taskContainer.appendChild(taskElement);
        });

        // Initialiser les collapsibles pour les tâches
        initializeCollapsible();

        // Lier le bouton "Ajouter tâche" à la fonction d'ajout de tâche
        const addTaskButton = document.getElementById('addTaskButton');
        addTaskButton.onclick = () => addTaskToGroup(groupId);

        // Afficher le modal
        document.getElementById('afficherModal').style.display = 'block';
    }
}


function initializeCollapsible() {
    const collapsibles = document.getElementsByClassName("collapsible");
    
    Array.from(collapsibles).forEach((collapsible) => {
        collapsible.addEventListener("click", function () {
            // Toggle the active class
            this.classList.toggle("active");
            
            // Toggle the display of the content
            const content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
}



// Fonction pour ajouter une tâche à un groupe
function addTaskToGroup(groupId) {
    const group = groups.find(g => g.id === groupId);
    if (group) {
        // Récupérer les valeurs du formulaire
        const taskTitle = document.getElementById('newTaskTitle').value;
        const taskDescription = document.getElementById('newTaskDescription').value;
        const taskDeadline = document.getElementById('newTaskDeadline').value;

        if (!taskTitle || !taskDescription || !taskDeadline) {
            alert("Veuillez remplir tous les champs pour ajouter une tâche.");
            return;
        }

        // Créer une nouvelle tâche
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            deadline: taskDeadline,
            completed: false
        };

        // Ajouter la nouvelle tâche au tableau de tâches du groupe
        group.tasks.push(newTask);

        // Vider les champs du formulaire
        document.getElementById('newTaskTitle').value = '';
        document.getElementById('newTaskDescription').value = '';
        document.getElementById('newTaskDeadline').value = '';

        // Re-render le groupe avec les nouvelles tâches
        openAfficherModal(groupId);

        // Optionnel : Sauvegarder les changements localement ou sur le serveur
        saveGroups();
    }
}