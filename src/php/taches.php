<?php
// Démarrer la session
session_start();

// Inclure la connexion à la base de données
include 'db.php';

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    echo "Erreur : utilisateur non connecté.";
    exit();
}

// Récupérer les utilisateurs
$userStmt = $pdo->query("SELECT id, email FROM users");
$users = $userStmt->fetchAll(PDO::FETCH_ASSOC);

// Récupérer les groupes
$groupStmt = $pdo->query("SELECT id, name FROM groups");
$groups = $groupStmt->fetchAll(PDO::FETCH_ASSOC);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $deadline = $_POST['deadline'];
    $assigned_to = $_POST['assigned_to'];
    $group_id = $_POST['group_id'];

    $stmt = $pdo->prepare("INSERT INTO tasks (name, description, deadline, assigned_to, group_id) VALUES (:name, :description, :deadline, :assigned_to, :group_id)");
    $stmt->execute([
        'name' => $name,
        'description' => $description,
        'deadline' => $deadline,
        'assigned_to' => $assigned_to,
        'group_id' => $group_id
    ]);

    echo "Tâche ajoutée avec succès!";
}


?>


<form method="POST" action="taches.php">
    <label for="name">Nom de la tâche</label>
    <input type="text" name="name" required>

    <label for="description">Description</label>
    <textarea name="description" required></textarea>

    <label for="deadline">Deadline</label>
    <input type="date" name="deadline" required>

    <label for="assigned_to">Assigner à l'utilisateur</label>
    <select name="assigned_to" required>
        <option value="" disabled selected>Sélectionnez un utilisateur</option>
        <?php foreach ($users as $user): ?>
            <option value="<?= $user['id'] ?>"><?= $user['email'] ?></option>
        <?php endforeach; ?>
    </select>

    <label for="group_id">Groupe</label>
    <select name="group_id" required>
        <option value="" disabled selected>Sélectionnez un groupe</option>
        <?php foreach ($groups as $group): ?>
            <option value="<?= $group['id'] ?>"><?= $group['name'] ?></option>
        <?php endforeach; ?>
    </select>

    <button type="submit">Ajouter la tâche</button>
</form>


