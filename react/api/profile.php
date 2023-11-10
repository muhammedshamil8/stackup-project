<?php
session_start();

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
            // if ($_SESSION['id'] = $user_id) {
                // Handle GET request for user data
                $query = "SELECT * FROM users WHERE id = ?";
                $stmt = $conn->prepare($query);
                $stmt->bind_param('s', $user_id);
                $stmt->execute();
                $result = $stmt->get_result();
                $userData = [];

                if ($result->num_rows > 0) {
                    $userData = $result->fetch_assoc();
                    echo json_encode(['status' => 1, 'userData' => $userData]);
                } else {
                    http_response_code(404);
                    echo json_encode(['status' => 0, 'message' => 'User not found']);
                }
            // } else {
            //     http_response_code(401);
            //     echo json_encode(['status' => 0, 'error' => 'Unauthorized']);
            // }
            break;

        case "POST":
            $data = json_decode(file_get_contents('php://input'), true);

            $newUsername = $data['username'];
            $newPronounce = $data['pronounce'];
            $newFullname = $data['fullname'];
            $newPhonenumber = $data['phonenumber'];
            $newDOB = $data['DOB'];
            $newProfession = $data['profession'];

            $checkUsernameQuery = "SELECT id, username, pronounce, fullname, phonenumber, DOB, profession FROM users WHERE id != ? AND username = ?";
            $checkUsernameStmt = $conn->prepare($checkUsernameQuery);
            $checkUsernameStmt->bind_param('is', $user_id, $newUsername);
            $checkUsernameStmt->execute();
            $checkUsernameResult = $checkUsernameStmt->get_result();

            if ($checkUsernameResult->num_rows > 0) {
                http_response_code(400);
                echo json_encode(['status' => 0, 'message' => 'Username_ Already_ Taken']);
                exit();

            }  elseif (($newPhonenumber !== null && strlen($newPhonenumber) !== 10) || ($newPhonenumber === null && isset($data['phonenumber']))) {
                http_response_code(400);
                echo json_encode(['status' => 0, 'error' => 'Phone number should be 10 digits']);
                exit();
            }
            
             else {
                $updateQuery = "UPDATE users SET username = ?, pronounce = ?, fullname = ?, phonenumber = ?, DOB = ?, profession = ? WHERE id = ?";
                $updateStmt = $conn->prepare($updateQuery);
                $updateStmt->bind_param('ssssssi', $newUsername, $newPronounce, $newFullname, $newPhonenumber, $newDOB, $newProfession, $user_id);

                if ($updateStmt->execute()) {
                    echo json_encode(['status' => 1, 'message' => 'User_  Data_  Updated_  Successfully']);
                } else {
                    http_response_code(500);
                    echo json_encode(['status' => 0, 'message' => 'Internal Server Error']);
                }
            }
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
}

mysqli_close($conn);
?>
