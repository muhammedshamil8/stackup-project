<?php
session_start();

if ($loginSuccessful) {
    $_SESSION['user_id'] = $user_id;
    $_SESSION['username'] = $username;
    // ...
}
?>