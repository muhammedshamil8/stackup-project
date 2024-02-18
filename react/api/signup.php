<?php
session_start();

echo "Signup page";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'db_connect.php';

try {
    if ($conn) {
        // Continue if the database connection is successful
    } else {
        echo json_encode(['status' => 0, 'message' => 'Failed to connect to the database']);
    }

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case "POST":
            $user = json_decode(file_get_contents('php://input'));

            if (empty($user->username) || empty($user->email) || empty($user->password)) {
                echo json_encode(['status' => 0, 'message' => 'All fields must be filled']);
            }elseif (strlen($user->password) < 8) {
                echo json_encode(['status' => 0, 'message' => 'Password must contain at least 8 characters']);
            } else {
                // Check for duplicate usernames
                $checkUsernameQuery = "SELECT username FROM users WHERE username = ?";
                $checkUsernameStmt = $conn->prepare($checkUsernameQuery);
                $checkUsernameStmt->bind_param('s', $user->username);
                $checkUsernameStmt->execute();
                $usernameResult = $checkUsernameStmt->get_result();

                // Check for duplicate emails
                $checkEmailQuery = "SELECT email FROM users WHERE email = ?";
                $checkEmailStmt = $conn->prepare($checkEmailQuery);
                $checkEmailStmt->bind_param('s', $user->email);
                $checkEmailStmt->execute();
                $emailResult = $checkEmailStmt->get_result();

                if ($usernameResult->num_rows > 0) {
                    echo json_encode(['status' => 0, 'message' => 'Username already exists']);
                } elseif ($emailResult->num_rows > 0) {
                    echo json_encode(['status' => 0, 'message' => 'Email already exists']);
                } else {
                    if ($user->password === $user->passwordConfirm){

                   
                    $hashedPassword = password_hash($user->password, PASSWORD_DEFAULT);
                    // Insert user data into the database
                    $sql = "INSERT INTO users (id, username, email, password, create_at) VALUES (null, ?, ?, ?, ?)";
                    $create_at = date('Y-m-d');
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param('ssss', $user->username, $user->email, $hashedPassword, $create_at);

                    if ($stmt->execute()) {
                        echo json_encode(['status' => 1, 'message' => 'Record created successfully']);
                    } else {
                        echo json_encode(['status' => 0, 'message' => 'Failed to create Record: ' . $stmt->error]);
                    }
                }else{
                    echo json_encode(['status' => 0, 'message' => 'Password and confirm password do not match']);

                    }
                }
            }
            break;
    }
} catch (Exception $e) {
    echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
}

mysqli_close($conn);

?>
