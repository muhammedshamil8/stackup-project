<?php
session_start();

echo "Create Project page";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'db_connect.php';

$user_id = $_GET['userId'];

try {
    if ($conn) {
        // Continue if the database connection is successful
    } else {
        echo json_encode(['status' => 0, 'message' => 'Failed to connect to the database']);
    }

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case "GET":
            // Retrieve projects for the user
            $getProjectsQuery = "SELECT project_id, project_name FROM project WHERE user_id = ?";
            $getProjectsStmt = $conn->prepare($getProjectsQuery);
            $getProjectsStmt->bind_param('i', $user_id);
            $getProjectsStmt->execute();
            $getProjectsResult = $getProjectsStmt->get_result();
    
            $projects = array();
    
            while ($row = $getProjectsResult->fetch_assoc()) {
                $projects[] = $row;
            }
    
            echo json_encode(['status' => 1, 'projects' => $projects]);
            break;
            
        case "POST":
            $data = json_decode(file_get_contents('php://input'), true);

            $newProjectName = $data['projectName'];
            $newprojectDescription = $data['projectDescription'];

            // Check if the project_name is provided
            if (!isset($newProjectName)) {
                http_response_code(400);
                echo json_encode(['status' => 0, 'error' => 'Project name is required']);
                exit();
            }
            
           
          // Check if the project name already exists for the user
$checkProjectQuery = "SELECT project_id FROM project WHERE user_id = ? AND project_name = ?";
$checkProjectStmt = $conn->prepare($checkProjectQuery);
$checkProjectStmt->bind_param('is', $user_id, $newProjectName);
$checkProjectStmt->execute();
$checkProjectResult = $checkProjectStmt->get_result();

if ($checkProjectResult->num_rows > 0) {
    http_response_code(400);
    echo json_encode(['status' => 0, 'error' => 'Project name already exists for the user']);
    exit();
}
if (strlen($newProjectName) < 5 || strlen($newProjectName) > 15) {
    http_response_code(400);
    echo json_encode(['status' => 0, 'error' => 'Project Name must contain between 5 and 15 characters']);
    exit();
}
    
// Insert into the project table
$insertQuery = "INSERT INTO project (user_id, project_name,project_description) VALUES (?, ?,?)";
$insertStmt = $conn->prepare($insertQuery);
$insertStmt->bind_param('iss', $user_id, $newProjectName,$newprojectDescription);

if ($insertStmt->execute()) {
    // Retrieve the auto-generated project_id
    $newProjectId = $conn->insert_id;
        echo json_encode(['status' => 1, 'message' => 'Project Created Successfully']);

    // // Update the event table with the new project_id
    // $updateEventQuery = "UPDATE event SET project_id = ? WHERE user_id = ?";
    // $updateEventStmt = $conn->prepare($updateEventQuery);
    // $updateEventStmt->bind_param('ii', $newProjectId, $user_id);

    // if ($updateEventStmt->execute()) {
    //     echo json_encode(['status' => 1, 'message' => 'Project Created Successfully']);
    // } else {
    //     http_response_code(500);
    //     echo json_encode(['status' => 0, 'error' => 'Failed to update event table']);
    // }
} else {
    http_response_code(500);
    echo json_encode(['status' => 0, 'error' => 'Failed to insert into project table']);
}

            break;
           
        
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
}

mysqli_close($conn);
?>
