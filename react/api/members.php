<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['searchTerm'])) {
        $searchTerm = $_GET['searchTerm'];

        // Adjust the SQL query to match your database structure
        $searchQuery = "SELECT * FROM your_table WHERE team_name LIKE ?";
        $searchStmt = $conn->prepare($searchQuery);
        $searchStmt->bind_param('s', $searchTerm);
        $searchStmt->execute();
        $searchResult = $searchStmt->get_result();

        $teamSuggestions = array();
        while ($row = $searchResult->fetch_assoc()) {
            $teamSuggestions[] = $row;
        }

        echo json_encode(['status' => 1, 'teams' => $teamSuggestions]);
    } else {
        echo json_encode(['status' => 0, 'message' => 'Invalid GET request parameters']);
    }
} else {
    echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
}

mysqli_close($conn);
?>
