<?php
    include_once("db_connect.php");
    header('Content-Type: application/json');

    $status = 200;
    $data = array();

    // Contacts are always returned ordered by last name (then first name)
    $result = $con->query("SELECT contact_id, first_name, last_name, email, contact_number FROM contacts ORDER BY last_name ASC, first_name ASC");

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    } else {
        $status = 500;
    }

    echo json_encode(array(
        'status' => $status,
        'data' => $data,
        'count' => count($data)
    ));

    $con->close();
?>
