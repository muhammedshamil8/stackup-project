<?php
session_start();
echo "getprojectTasks page";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['userId']) && isset($_GET['projectId'])) {
        // Fetch project details
        $user_id = $_GET['userId'];
        $project_id = $_GET['projectId'];
        $getprojectsQuery = "SELECT * FROM project WHERE user_id = ? AND project_id = ?";
        $getprojectsStmt = $conn->prepare($getprojectsQuery);
        $getprojectsStmt->bind_param('ii', $user_id, $project_id);
        $getprojectsStmt->execute();
        $projectsResult = $getprojectsStmt->get_result();

        $projectDetails = array();
        while ($row = $projectsResult->fetch_assoc()) {
            $projectDetails[] = $row;
        }

        echo json_encode(['status' => 1, 'projectDetails' => $projectDetails]);

    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if it's a request to update task progress or delete task
    $requestData = json_decode(file_get_contents('php://input'), true);

    if (isset($requestData['projectId']) && isset($requestData['action'])) {
        $project_id = $requestData['projectId'];
        $action = $requestData['action'];

        if ($action === 'updateProject') {
            // Update project
            if (isset($requestData['projectDescription'])) {
                $project_description = $requestData['projectDescription'];

                $updateProjectQuery = "UPDATE project SET project_description = ? WHERE project_id = ?";
                $updateProjectStmt = $conn->prepare($updateProjectQuery);
                $updateProjectStmt->bind_param('si', $project_description, $project_id);

                if ($updateProjectStmt->execute()) {
                    echo json_encode(['status' => 1, 'message' => 'Project updated successfully']);
                } else {
                    echo json_encode(['status' => 0, 'message' => 'Failed to update project']);
                }
            } else {
                echo json_encode(['status' => 0, 'message' => 'Project description is required']);
            }
        } elseif ($action === 'deleteProject') {
            // Delete project and associated events
            $conn->autocommit(FALSE); // Start a transaction
        
            // Step 1: Delete events associated with the project
            $deleteEventsQuery = "DELETE FROM event WHERE project_id = ?";
            $deleteEventsStmt = $conn->prepare($deleteEventsQuery);
            $deleteEventsStmt->bind_param('i', $project_id);
        
            if ($deleteEventsStmt->execute()) {
                // Step 2: Delete the project
                $deleteProjectQuery = "DELETE FROM project WHERE project_id = ?";
                $deleteProjectStmt = $conn->prepare($deleteProjectQuery);
                $deleteProjectStmt->bind_param('i', $project_id);
        
                if ($deleteProjectStmt->execute()) {
                    // Commit the transaction
                    $conn->commit();
                    echo json_encode(['status' => 1, 'message' => 'Project deleted successfully']);
                } else {
                    // Rollback the transaction if the second query fails
                    $conn->rollback();
                    echo json_encode(['status' => 0, 'message' => 'Failed to delete project']);
                }
            } else {
                // Rollback the transaction if the first query fails
                $conn->rollback();
                echo json_encode(['status' => 0, 'message' => 'Failed to delete events associated with the project']);
            }
        
            // Set autocommit back to true
            $conn->autocommit(TRUE);
        }
        else {
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
