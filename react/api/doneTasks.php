<?php
session_start();
echo "Done Tasks page";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'db_connect.php'; // Include your database connection file

$user_id = $_GET['userId'];

try {
    if ($conn) {
        // Fetch tasks for the given user
        $getTasksQuery = "SELECT * FROM event WHERE user_id = ? AND task_done = 1";
        $getTasksStmt = $conn->prepare($getTasksQuery);
        $getTasksStmt->bind_param('i', $user_id);
        $getTasksStmt->execute();
        $tasksResult = $getTasksStmt->get_result();

        $tasks = array();

        // while ($row = $tasksResult->fetch_assoc()) {
        //     $tasks[$row['task_id']] = $row;
        // }
 while ($row = $tasksResult->fetch_assoc()) {
            $tasks[] = $row;
        }
        echo json_encode(['status' => 1, 'tasks' => $tasks]);
    } else {
        echo json_encode(['status' => 0, 'message' => 'Failed to connect to the database']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
}

mysqli_close($conn);
?>
