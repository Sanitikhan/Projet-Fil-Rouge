<?php
// getUsers.php
include 'db.php'; // Assurez-vous que le chemin vers votre fichier de connexion à la base de données est correct

// Vérifier si la connexion à la base de données a réussi
if (!$pdo) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id, name FROM Users"); // Remplacez "Users" par le nom de votre table
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Vérifier si des utilisateurs ont été trouvés
    if ($users) {
        header('Content-Type: application/json');
        echo json_encode($users); // Renvoie le tableau des utilisateurs
    } else {
        echo json_encode(['success' => false, 'message' => 'No users found']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
