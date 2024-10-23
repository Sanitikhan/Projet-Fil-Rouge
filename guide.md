**ETAPE 1 : Création de groupe avec sélection de plusieurs membres**

Dans ton fichier HTML, ajoute un bouton pour ouvrir le modal et un modal pour la création de groupe avec un champ de nom et une liste de sélection multiple pour les membres.

```html
<!-- Bouton pour ouvrir le modal -->
<button id="openGroupModal">Créer un groupe</button>

<!-- Modal de création de groupe -->
<div id="groupModal" class="modal">
  <div class="modal-content">
    <span id="closeGroupModal" class="close">&times;</span>
    <h2>Créer un groupe</h2>
    <form id="groupForm">
      <label for="groupName">Nom du groupe:</label>
      <input type="text" id="groupName" name="groupName" required>

      <label for="members">Ajouter des membres :</label>
      <select id="members" name="members[]" multiple required>
        <!-- Options seront ajoutées dynamiquement depuis la base de données -->
      </select>

      <button type="submit">Créer le groupe</button>
    </form>
  </div>
</div>
```
```css
.modal {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  margin: 10% auto;
  padding: 20px;
  width: 50%;
  border-radius: 8px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 18px;
  cursor: pointer;
}
```
```js
// Ouvrir le modal
document.getElementById('openGroupModal').onclick = function() {
  document.getElementById('groupModal').style.display = 'block';
};

// Fermer le modal
document.getElementById('closeGroupModal').onclick = function() {
  document.getElementById('groupModal').style.display = 'none';
};

// Charger les membres disponibles depuis la base de données
function loadMembers() {
  fetch('getMembers.php') // Un fichier PHP qui renverra les membres en JSON
    .then(response => response.json())
    .then(data => {
      const membersSelect = document.getElementById('members');
      membersSelect.innerHTML = '';
      data.forEach(member => {
        const option = document.createElement('option');
        option.value = member.id;
        option.text = member.name;
        membersSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Erreur lors du chargement des membres:', error));
}

// Appel pour charger les membres quand la page est chargée
window.onload = loadMembers;

// Gestion de la soumission du formulaire
document.getElementById('groupForm').onsubmit = function(event) {
  event.preventDefault();
  const groupName = document.getElementById('groupName').value;
  const selectedMembers = Array.from(document.getElementById('members').selectedOptions).map(option => option.value);

  fetch('createGroup.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ groupName: groupName, members: selectedMembers })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Groupe créé avec succès');
        document.getElementById('groupModal').style.display = 'none';
        loadGroups(); // Recharge les groupes après la création
      } else {
        alert('Erreur: ' + data.message);
      }
    })
    .catch(error => console.error('Erreur lors de la création du groupe:', error));
};
```
```php
<?php
include 'db.php'; // Connexion à la base de données

$data = json_decode(file_get_contents("php://input"), true);

$groupName = $data['groupName'];
$members = $data['members'];

try {
    // Insérer le groupe dans la base de données
    $stmt = $pdo->prepare("INSERT INTO Groups (name, created_by) VALUES (:name, :created_by)");
    $stmt->execute(['name' => $groupName, 'created_by' => $_SESSION['user_id']]); // On prend l'ID de l'utilisateur connecté
    $groupId = $pdo->lastInsertId();

    // Insérer les membres dans le groupe
    foreach ($members as $memberId) {
        $stmt = $pdo->prepare("INSERT INTO GroupMembers (group_id, user_id) VALUES (:group_id, :user_id)");
        $stmt->execute(['group_id' => $groupId, 'user_id' => $memberId]);
    }

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
```

**Création du getMembers.php**
```php
<?php
// Inclure la connexion à la base de données
include 'db.php';

try {
    // Préparer une requête pour récupérer tous les membres (les utilisateurs dans ce cas)
    $stmt = $pdo->prepare("SELECT id, name FROM Users"); // Adapte le nom de la table et des colonnes selon ta base de données
    $stmt->execute();
    
    // Récupérer les résultats sous forme de tableau associatif
    $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retourner les membres en JSON
    echo json_encode($members);
} catch (PDOException $e) {
    // En cas d'erreur, renvoyer un message d'erreur en JSON
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
```

**ETAPE 2 : Affichage du groupe dans une card**

```html
<div id="groupsContainer"></div>
```
```js
function loadGroups() {
  fetch('getGroups.php') // Fichier PHP pour obtenir les groupes
    .then(response => response.json())
    .then(groups => {
      const container = document.getElementById('groupsContainer');
      container.innerHTML = '';

      groups.forEach(group => {
        const card = document.createElement('div');
        card.className = 'group-card';
        card.innerHTML = `
          <h3>${group.name}</h3>
          <button onclick="openTaskModal(${group.id})">Ajouter une tâche</button>
          <button onclick="showGroupDetails(${group.id})">Détails</button>
          <button onclick="editGroup(${group.id})">Modifier</button>
          <button onclick="deleteGroup(${group.id})">Supprimer</button>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => console.error('Erreur lors du chargement des groupes:', error));
}

// Charger les groupes quand la page est chargée
window.onload = loadGroups;
```
```php
<?php
include 'db.php'; // Connexion à la base de données

$stmt = $pdo->prepare("SELECT * FROM Groups WHERE created_by = :user_id");
$stmt->execute(['user_id' => $_SESSION['user_id']]);
$groups = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($groups);
?>
```