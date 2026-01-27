<?php
header('Content-Type: application/json');

$jsonFile = 'tracks.json';
$data = file_get_contents('php://input');

if (!empty($data)) {
    // Validate JSON before writing
    if (json_decode($data) === null) {
        echo json_encode(["success" => false, "message" => "Invalid JSON format."]);
        exit;
    }

    // Write the new data, replacing the old content
    if (file_put_contents($jsonFile, $data, LOCK_EX) !== false) {
        echo json_encode(["success" => true, "message" => "Data replaced successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to write data."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "No data received."]);
}
?>
