<?php
header('Content-Type: application/json');
error_log("PHP script executed");

// Define some data to send back
$data = 'message';

// Send the data as a JSON response
echo json_encode($data);

?>
