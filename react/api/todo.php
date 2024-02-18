<?php
session_start();

echo "Todo page";
 echo $_SESSION['id'];
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch tasks for the given user
    $user_id = $_GET['userId'];
    $task_id = $_GET['taskId'];
    $getTasksQuery = "SELECT * FROM event WHERE user_id = ? AND task_id = ?";
    $getTasksStmt = $conn->prepare($getTasksQuery);
    $getTasksStmt->bind_param('ii', $user_id, $task_id);
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

        if ($action === 'updateTask') {
            // Update task
            $updatedTaskName = $requestData['updatedTaskName'];
            $updatedTaskType = $requestData['updatedTaskType'];
            $updatedDescription = $requestData['updatedDescription'];
            $updatedPriority = $requestData['updatedPriority']; // Include updated priority
            $updatedStartDate = $requestData['updatedStartDate'];
            $updatedEndDate = $requestData['updatedEndDate'];

            $updateTaskQuery = "UPDATE event SET task_name = ?, task_type = ?, description = ?, start_date = ?, end_date = ?, priority = ? WHERE task_id = ?";
            $updateTaskStmt = $conn->prepare($updateTaskQuery);
            $updateTaskStmt->bind_param('sssssii', $updatedTaskName, $updatedTaskType, $updatedDescription, $updatedStartDate, $updatedEndDate, $updatedPriority, $task_id);

            // error_log("SQL Query: " . $updateTaskQuery);
            // error_log("Parameters: " . json_encode([$updatedTaskName, $updatedTaskType, $updatedDescription, $updatedStartDate, $updatedEndDate, $updatedPriority, $task_id]));

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
/*
-- Database: `task_managment_app`

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `pronounce` int NOT NULL DEFAULT '0',
  `phonenumber` int DEFAULT NULL,
  `profession` varchar(50) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `task_name` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `task_type` varchar(100) NOT NULL,
  `priority` int NOT NULL,
  `description` text NOT NULL,
  `task_progress` int NOT NULL DEFAULT '0',
  `task_done` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `project_id` int DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `fk_project_userid` (`user_id`),
  KEY `fk_event_project` (`project_id`),
  CONSTRAINT `fk_event_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  CONSTRAINT `fk_project_userid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_user_event` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `user_id` int NOT NULL,
  `project_id` int NOT NULL AUTO_INCREMENT,
  `project_name` varchar(50) NOT NULL,
  `project_description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

--
-- Table structure for table `project_user_association`
--

CREATE TABLE `project_user_association` (
  `association_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `role` int DEFAULT '0',
  `other_association_details` text,
  PRIMARY KEY (`association_id`),
  KEY `project_id` (`project_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `project_user_association_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  CONSTRAINT `project_user_association_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);




*/
?>
