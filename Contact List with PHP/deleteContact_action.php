<?php
    include_once("db_connect.php");
    header('Content-Type: application/json');

    $status = 400;
    $retVal = "Delete failed.";

    $jsondata = json_decode(file_get_contents('php://input'), true);
    $contactId = isset($jsondata['contact_id']) ? trim($jsondata['contact_id']) : '';

    if ($contactId === '' || !ctype_digit((string)$contactId)) {
        $retVal = "Invalid contact.";
    } else {
        $stmt = $con->prepare("DELETE FROM contacts WHERE contact_id = ?");
        $stmt->bind_param("i", $contactId);

        if ($stmt->execute()) {
            $status = 200;
            $retVal = "Contact deleted successfully.";
        } else {
            $retVal = "Failed to delete contact.";
        }
        $stmt->close();
    }

    echo json_encode(array(
        'status' => $status,
        'message' => $retVal
    ));

    $con->close();
?>
