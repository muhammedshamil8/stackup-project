<?php
session_start();

echo "Logout page";

// Allow from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
// $_SESSION['id'] = 10;
if (isset($_SESSION['id'])) {
    // Destroy the session
    session_destroy();
    echo json_encode(['message' => 'Logout successful']);
} else {
    // If the user is not logged in, still provide a success response
    echo json_encode(['message' => 'Logout successful']);
}

?>
