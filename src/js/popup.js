// Ouvrir le modal
document.getElementById('openGroupModal').onclick = function() {
    document.getElementById('groupModal').style.display = 'block';
};
  
// Fermer le modal
document.getElementById('closeGroupModal').onclick = function() {
    document.getElementById('groupModal').style.display = 'none';
};

// Stockage des groupes
let groups = [];

// Fonction pour afficher les groupes et leurs tâches
function renderGroups() {
    const groupsContainer = document.getElementById('groupsContainer');
    groupsContainer.innerHTML = ''; // Clear the container

    groups.forEach((group, groupIndex) => {
        const groupElement = document.createElement('div');
        groupElement.classList.add('group');

        // Nom du groupe
        const groupTitle = document.createElement('h2');
        groupTitle.textContent = group.name;
        groupElement.appendChild(groupTitle);

        // Bouton pour supprimer le groupe
        const deleteGroupButton = document.createElement('button');
        deleteGroupButton.textContent = 'Supprimer le Groupe';
        deleteGroupButton.onclick = () => deleteGroup(groupIndex);
        groupElement.appendChild(deleteGroupButton);

        // Tâches dans le groupe
        group.tasks.forEach((task, taskIndex) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            if (task.completed) taskElement.classList.add('completed');

            // Checkbox pour cocher/décocher la tâche
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.onchange = () => toggleTaskCompletion(groupIndex, taskIndex);
            taskElement.appendChild(checkbox);

            // Titre de la tâche
            const taskTitle = document.createElement('span');
            taskTitle.textContent = task.title;
            taskElement.appendChild(taskTitle);

            // Bouton pour supprimer la tâche
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.onclick = () => deleteTask(groupIndex, taskIndex);
            taskElement.appendChild(deleteButton);

            // Ajouter un commentaire
            const commentBox = document.createElement('div');
            commentBox.classList.add('comment-box');

            const commentInput = document.createElement('input');
            commentInput.type = 'text';
            commentInput.placeholder = 'Ajouter un commentaire';
            commentInput.value = task.comment || '';

            commentInput.onblur = () => updateComment(groupIndex, taskIndex, commentInput.value);
            commentBox.appendChild(commentInput);

            taskElement.appendChild(commentBox);
            groupElement.appendChild(taskElement);
        });

        // Ajouter une nouvelle tâche dans le groupe
        const newTaskInput = document.createElement('input');
        newTaskInput.type = 'text';
        newTaskInput.placeholder = 'Nouvelle tâche';
        groupElement.appendChild(newTaskInput);

        const addTaskButton = document.createElement('button');
        addTaskButton.textContent = 'Ajouter tâche';
        addTaskButton.onclick = () => addTask(groupIndex, newTaskInput.value);
        groupElement.appendChild(addTaskButton);

        // Affichage du groupe
        groupsContainer.appendChild(groupElement);
    });
}

// Ajouter un nouveau groupe
function addGroup() {
    const groupNameInput = document.getElementById('groupName');
    const groupName = groupNameInput.value.trim();

    if (groupName !== '') {
        groups.push({ name: groupName, tasks: [] });
        groupNameInput.value = '';
        renderGroups();
    }
}

// Supprimer un groupe
function deleteGroup(groupIndex) {
    groups.splice(groupIndex, 1);  // Retirer le groupe du tableau
    renderGroups();  // Rafraîchir l'affichage
}

// Ajouter une tâche dans un groupe spécifique
function addTask(groupIndex, taskTitle) {
    if (taskTitle.trim() !== '') {
        groups[groupIndex].tasks.push({ title: taskTitle, completed: false, comment: '' });
        renderGroups();
    }
}

// Supprimer une tâche dans un groupe
function deleteTask(groupIndex, taskIndex) {
    groups[groupIndex].tasks.splice(taskIndex, 1);
    renderGroups();
}

// Marquer ou dé-marquer une tâche comme complétée
function toggleTaskCompletion(groupIndex, taskIndex) {
    const task = groups[groupIndex].tasks[taskIndex];
    task.completed = !task.completed;
    renderGroups();
}

// Mettre à jour le commentaire d'une tâche
function updateComment(groupIndex, taskIndex, comment) {
    groups[groupIndex].tasks[taskIndex].comment = comment;
}

// Initialisation
renderGroups();

// Nav Barre
function pagebar()
{
  var links=document.getElementById('navbar').getElementsByTagName("a");
  var current = location.href;
  for (var i=0; i < links.length; i++)
  {
   if(links[i].href == current)
   {
      links[i].href = "";
      links[i].className='grayStyle';
   }
 }
} 