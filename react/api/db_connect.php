<?php
echo "db_connection";

$servername = 'mysql_db';  // Replace with your actual MySQL server name
$username = 'root';        // Replace with your MySQL username
$password = 'root';        // Replace with your MySQL password
$database = 'task_managment_app'; // Replace with your database name

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
