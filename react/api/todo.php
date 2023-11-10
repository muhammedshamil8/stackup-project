<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'db_connect.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch tasks for the given user
   // Fetch tasks for the given user
$user_id = $_GET['userId'];
$task_id = $_GET['taskId'];
$getTasksQuery = "SELECT * FROM event WHERE user_id = ? AND task_id = ? ";
$getTasksStmt = $conn->prepare($getTasksQuery);
$getTasksStmt->bind_param('ii', $user_id,$task_id);
$getTasksStmt->execute();
$tasksResult = $getTasksStmt->get_result();

$tasks = array();

while ($row = $tasksResult->fetch_assoc()) {
    $tasks[] = $row;
}

echo json_encode(['status' => 1, 'tasks' => $tasks]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if it's a request to update task progress or delete task
    // Check if it's a request to update task progress or delete task
    $requestData = json_decode(file_get_contents('php://input'), true);
    
    if (isset($requestData['taskId']) && isset($requestData['action'])) {
        $task_id = $requestData['taskId'];
        $action = $requestData['action'];

        if ($action === 'updateTask') {
            // Update task
            $updatedTaskName = $requestData['updatedTaskName'];
            $updatedTaskType = $requestData['updatedTaskType'];
            $updatedDescription = $requestData['updatedDescription'];
            $updatedStartDate = $requestData['updatedStartDate'];
            $updatedEndDate = $requestData['updatedEndDate'];

            $updateTaskQuery = "UPDATE event SET task_name = ?, task_type = ?, description = ?, start_date = ?, end_date = ? WHERE task_id = ?";
            $updateTaskStmt = $conn->prepare($updateTaskQuery);
            $updateTaskStmt->bind_param('sssssi', $updatedTaskName, $updatedTaskType, $updatedDescription, $updatedStartDate, $updatedEndDate, $task_id);

            if ($updateTaskStmt->execute()) {
                echo json_encode(['status' => 1, 'message' => 'Task updated successfully']);
            } else {
                echo json_encode(['status' => 0, 'message' => 'Failed to update task']);
            }
          
        } elseif ($action === 'deleteTask') {
            // Delete task
            $deleteTaskQuery = "DELETE FROM event WHERE task_id = ?";
            $deleteTaskStmt = $conn->prepare($deleteTaskQuery);
            $deleteTaskStmt->bind_param('i', $task_id);

            if ($deleteTaskStmt->execute()) {
                echo json_encode(['status' => 1, 'message' => 'Task deleted successfully']);
            } else {
                echo json_encode(['status' => 0, 'message' => 'Failed to delete task']);
            }
        } else {
            echo json_encode(['status' => 0, 'message' => 'Invalid action']);
        }
    } else {
        echo json_encode(['status' => 0, 'message' => 'Invalid request']);
    }
} else {
    echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
}

mysqli_close($conn);
?>
