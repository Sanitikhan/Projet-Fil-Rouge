fetch('../php/taches.php')
    .then(response => response.json())
    .then(data => {
        let taskContainer = document.getElementById('task-container');
        data.forEach(task => {
            let taskItem = document.createElement('div');
            taskItem.innerHTML = `<p>${task.name}</p><p>${task.description}</p><button onclick="deleteTask(${task.id})">Supprimer</button>`;
            taskContainer.appendChild(taskItem);
        });
    });

    function deleteTask(taskId) {
        fetch(`delete_task.php?id=${taskId}`, { method: 'DELETE' })
            .then(response => response.text())
            .then(result => {
                // Met à jour l'interface après suppression
                location.reload();
            });
    }
    