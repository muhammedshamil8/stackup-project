<?php
session_start();

if ($loginSuccessful) {
    // Store user information in the session
    $_SESSION['user_id'] = $user_id;
    $_SESSION['username'] = $username;
    // ...
}
?>