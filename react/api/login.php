<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
// echo "Login page";
error_log(print_r($_SESSION, true));
include 'db_connect.php';
$_SESSION['id'];
try {
    if ($conn) {
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {
            case "POST":
                $user = json_decode(file_get_contents('php://input'));

                $checkLoginQuery = "SELECT id, username, password FROM users WHERE email = ?";
                $checkLoginStmt = $conn->prepare($checkLoginQuery);
                $checkLoginStmt->bind_param('s', $user->email);
                $checkLoginStmt->execute();
                $loginResult = $checkLoginStmt->get_result();

                if ($loginResult->num_rows > 0) {
                    $userData = $loginResult->fetch_assoc();
                    $hashedPassword = $userData['password'];

                    // Verify the hashed password
                    if (password_verify($user->password, $hashedPassword)) {
                                        
                    // After successful login
                    $_SESSION['id'] = $userData['id']; // Set user ID
                    echo json_encode(['status' => 1, 'message' => 'Login successful', 'user_id' => $_SESSION['id']]);
                    } else {
                        echo json_encode(['status' => 0, 'message' => 'Invalid email or password']);
                    }
                } else {
                    echo json_encode(['status' => 0, 'message' => 'Invalid email ']);
                }
                break;
        }
    } else {
        echo json_encode(['status' => 0, 'message' => 'Failed to connect to the database']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
}



mysqli_close($conn);


?>
