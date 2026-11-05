<?php
    include_once("db_connect.php");
    header('Content-Type: application/json');

    $status = 400;
    $retVal = "";
    $data = null;

    $jsondata = json_decode(file_get_contents('php://input'), true);

    $firstName = isset($jsondata['first_name']) ? trim($jsondata['first_name']) : '';
    $lastName = isset($jsondata['last_name']) ? trim($jsondata['last_name']) : '';
    $email = isset($jsondata['email']) ? trim($jsondata['email']) : '';
    $contactNumber = isset($jsondata['contact_number']) ? trim($jsondata['contact_number']) : '';

    // 1. Check that every field is filled in
    if ($firstName === '' || $lastName === '' || $email === '' || $contactNumber === '') {
        $retVal = "All fields are required.";
    }
    // 2. Check max length of first name, last name, and email (50 chars)
    else if (strlen($firstName) > 50 || strlen($lastName) > 50 || strlen($email) > 50) {
        $retVal = "First name, last name, and email must not exceed 50 characters.";
    }
    // 3. Check contact number is numeric and at most 15 digits
    else if (!preg_match('/^[0-9]+$/', $contactNumber) || strlen($contactNumber) > 15) {
        $retVal = "Contact number must contain digits only and be at most 15 numbers long.";
    }
    // 4. Check email format
    else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $retVal = "Please enter a valid email address.";
    }
    else {
        // 5. Check for duplicate email
        $checkStmt = $con->prepare("SELECT contact_id FROM contacts WHERE LOWER(email) = LOWER(?)");
        $checkStmt->bind_param("s", $email);
        $checkStmt->execute();
        $checkStmt->store_result();

        if ($checkStmt->num_rows > 0) {
            $retVal = "A contact with this email address already exists.";
        }
        $checkStmt->close();

        // Insert record if still valid
        if ($retVal === '') {
            $insertStmt = $con->prepare("INSERT INTO contacts (first_name, last_name, email, contact_number) VALUES (?, ?, ?, ?)");
            $insertStmt->bind_param("ssss", $firstName, $lastName, $email, $contactNumber);

            if ($insertStmt->execute()) {
                $newId = $con->insert_id;
                $insertStmt->close();

                $selectStmt = $con->prepare("SELECT contact_id, first_name, last_name, email, contact_number FROM contacts WHERE contact_id = ?");
                $selectStmt->bind_param("i", $newId);
                $selectStmt->execute();
                $result = $selectStmt->get_result();
                $data = $result->fetch_assoc();
                $selectStmt->close();

                $status = 200;
                $retVal = "Contact added successfully.";
            } else {
                $retVal = "Failed to add contact.";
            }
        }
    }

    echo json_encode(array(
        'status' => $status,
        'data' => $data,
        'message' => $retVal
    ));

    $con->close();
?>
