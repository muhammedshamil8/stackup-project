<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Include your database connection code here
include 'db_connect.php'; // Assuming you have a file named db_connect.php

// Retrieve the user ID from the query parameter
$user_id = $_GET['userId'];
// $user_id = 10;

if ($_SESSION['id'] = $user_id) {
    $Query = "SELECT id, username FROM users WHERE id = ?";
    $Stmt = $conn->prepare($Query);
    $Stmt->bind_param('s', $user_id);
    $Stmt->execute();
    $Result = $Stmt->get_result();

    if ($Result->num_rows > 0) {
        $userData = $Result->fetch_assoc();
        $username = $userData['username'];
        echo json_encode(['username' => $username, 'user_id' => $user_id]);
    } else {
        http_response_code(404); // User not found
        echo json_encode(['error' => 'User not found']);
    }
} else {
    http_response_code(401); // Unauthorized
    echo json_encode(['error' => 'Unauthorized']);
}
?>
