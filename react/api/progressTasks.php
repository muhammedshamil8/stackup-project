<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'db_connect.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch tasks for the given user
    $user_id = $_GET['userId'];
    $getTasksQuery = "SELECT * FROM event WHERE user_id = ? AND task_progress = 1 AND project_id IS NULL ORDER BY priority DESC";
    $getTasksStmt = $conn->prepare($getTasksQuery);
    $getTasksStmt->bind_param('i', $user_id);
    $getTasksStmt->execute();
    $tasksResult = $getTasksStmt->get_result();

    $tasks = array();

    while ($row = $tasksResult->fetch_assoc()) {
        $tasks[] = $row;
    }

    echo json_encode(['status' => 1, 'tasks' => $tasks]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if it's a request to update task progress or delete task
    $requestData = json_decode(file_get_contents('php://input'), true);
    
    if (isset($requestData['taskId']) && isset($requestData['action'])) {
        $task_id = $requestData['taskId'];
        $action = $requestData['action'];

        if ($action === 'updateProgress') {
            // Update task progress
            if (isset($requestData['taskDone'], $requestData['taskProgress'])) {
                $task_done = $requestData['taskDone'];
                $task_progress = $requestData['taskProgress'];

                $updateProgressQuery = "UPDATE event SET task_done = ? , task_progress = ?  WHERE task_id = ? AND project_id IS NULL";
                $updateProgressStmt = $conn->prepare($updateProgressQuery);
                $updateProgressStmt->bind_param('iii', $task_done,$task_progress, $task_id);

                if ($updateProgressStmt->execute()) {
                    echo json_encode(['status' => 1, 'message' => 'Task  updated successfully']);
                } else {
                    echo json_encode(['status' => 0, 'message' => 'Failed to update task progress']);
                }
            } else {
                echo json_encode(['status' => 0, 'message' => 'Task progress is required']);
            }
        } elseif ($action === 'deleteTask') {
            // Delete task
            $deleteTaskQuery = "DELETE FROM event WHERE task_id = ? AND project_id IS NULL";
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
