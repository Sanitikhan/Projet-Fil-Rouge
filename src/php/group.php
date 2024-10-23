<?php
// Inclure le fichier de connexion à la base de données
include 'db.php';

session_start();
// Vérifiez que l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Utilisateur non connecté.']);
    exit();
}

// Récupérer les données JSON envoyées
$data = json_decode(file_get_contents("php://input"), true);
$groupName = $data['groupName'];
$members = $data['members'];
$userId = $_SESSION['user_id'];

// Insérer le groupe dans la base de données
$stmt = $pdo->prepare("INSERT INTO Groups (name, created_by) VALUES (:name, :created_by)");
$stmt->execute(['name' => $groupName, 'created_by' => $data['created_by']]);

$groupId = $pdo->lastInsertId(); // Obtenir l'ID du nouveau groupe

// Ajouter des membres au groupe
foreach ($members as $memberId) {
    $stmt = $pdo->prepare("INSERT INTO GroupMembers (group_id, user_id) VALUES (:group_id, :user_id)");
    $stmt->execute(['group_id' => $groupId, 'user_id' => $memberId]);
}

// Vérifiez si les données nécessaires sont présentes
if (empty($data['groupName']) || empty($data['members'])) {
    http_response_code(400); // Mauvaise requête
    echo json_encode(['success' => false, 'message' => 'Nom de groupe ou membres manquants']);
    exit();
}

try {
    // Insérer le groupe dans la base de données
    $stmt = $pdo->prepare("INSERT INTO Groups (name, created_by) VALUES (:name, :created_by)");
    $stmt->execute(['name' => $groupName, 'created_by' => $userId]);

    $groupId = $pdo->lastInsertId(); // Obtenir l'ID du nouveau groupe

    // Ajouter des membres au groupe
    foreach ($members as $memberId) {
        $stmt = $pdo->prepare("INSERT INTO GroupMembers (group_id, user_id) VALUES (:group_id, :user_id)");
        $stmt->execute(['group_id' => $groupId, 'user_id' => $memberId]);
    }

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500); // Erreur interne du serveur
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
