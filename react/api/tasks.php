<?php
session_start();

echo "Tasks page";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch tasks for the given user
    $user_id = $_GET['userId'];
    
    // Check if a search term is provided
    $searchTerm = isset($_GET['searchTerm']) ? $_GET['searchTerm'] : '';

    // Use a prepared statement for better security
    $getTasksQuery = "SELECT * FROM event WHERE user_id = ? AND task_name LIKE ? ORDER BY priority DESC";
    $getTasksStmt = $conn->prepare($getTasksQuery);

    // Add a wildcard to the search term for a basic search
    $searchTermWithWildcard = "%{$searchTerm}%";

    $getTasksStmt->bind_param('is', $user_id, $searchTermWithWildcard);
    $getTasksStmt->execute();
    $tasksResult = $getTasksStmt->get_result();

    $tasks = array();

    while ($row = $tasksResult->fetch_assoc()) {
        $tasks[] = $row;
    }

    echo json_encode(['status' => 1, 'tasks' => $tasks]);
} else {
    echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
}

mysqli_close($conn);
?>
