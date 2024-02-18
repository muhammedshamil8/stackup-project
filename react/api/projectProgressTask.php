<?php
session_start();

echo "Project Progress Task page";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'db_connect.php';

$user_id = intval($_GET['userId']);
$project_id = intval($_GET['projectId']);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['userId']) && isset($_GET['projectId'])) {
        $getTasksQuery = "SELECT * FROM event WHERE user_id = ? AND task_progress = 1 AND task_done = 0 AND project_id = ? ORDER BY priority DESC";
        $getTasksStmt = $conn->prepare($getTasksQuery);
        $getTasksStmt->bind_param('ii', $user_id, $project_id);
        $getTasksStmt->execute();
        $tasksResult = $getTasksStmt->get_result();

        $tasks = array();

        while ($row = $tasksResult->fetch_assoc()) {
            $tasks[] = $row;
        }

        echo json_encode(['status' => 1, 'tasks' => $tasks]);
    } else {
        echo json_encode(['status' => 0, 'message' => 'User ID or Project ID not provided']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);

    if (isset($requestData['taskId']) && isset($_GET['projectId']) && isset($requestData['action'])) {
        $task_id = $requestData['taskId'];
        $action = $requestData['action'];

        if (isset($requestData['taskDone'], $requestData['taskProgress'])) {
            $task_done = $requestData['taskDone'];
            $task_progress = $requestData['taskProgress'];

            $updateProgressQuery = "UPDATE event SET task_done = ? , task_progress = ?  WHERE task_id = ? AND project_id = ?";
            $updateProgressStmt = $conn->prepare($updateProgressQuery);
            $updateProgressStmt->bind_param('iiii', $task_done,$task_progress, $task_id ,$project_id );

            if ($updateProgressStmt->execute()) {
                echo json_encode(['status' => 1, 'message' => 'Task  updated successfully']);
            } else {
                echo json_encode(['status' => 0, 'message' => 'Failed to update task progress']);
            }
       

        } elseif ($action === 'deleteTask') {
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
