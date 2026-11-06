<?php
    // Database connection settings
    $host = "localhost";        // Host name
    $user = "root";             // User
    $password = "";             // Password (default XAMPP has no root password; set it here if yours differs)
    $dbname = "contactlist";    // Database name

    // Create connection
    $con = mysqli_connect($host, $user, $password, $dbname);

    // Check connection
    if (!$con) {
        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(array(
            'status' => 500,
            'message' => "Connection failed: " . mysqli_connect_error()
        ));
        exit();
    }

    mysqli_set_charset($con, "utf8mb4");
?>
