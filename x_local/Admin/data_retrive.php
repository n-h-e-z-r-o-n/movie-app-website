<?php
header('Content-Type: application/json'); // Set JSON response header

// Get show_id from request (URL parameter)
$show_id = isset($_GET['show_id']) ? $_GET['show_id'] : null;

// Validate input
if (!$show_id) {
    //http_response_code(400); // Bad Request
    echo json_encode(['error' => 'show_id parameter is required']);
    exit;
}

// File path
$file = 'data.json';

// Check if file exists
if (!file_exists($file)) {
    // http_response_code(404); // Not Found
    echo json_encode(['error' => 'Data file not found']);
    exit;
}

// Read and decode JSON data
$json_data = file_get_contents($file);
$data = json_decode($json_data, true);

// Search for matching show_id
$result = null;
foreach ($data as $entry) {
    if ($entry['show_id'] === $show_id) {
        $result = $entry;
        break;
    }
}

// Return response
if ($result) {
    echo json_encode( ['Feedback' => $result]);
} else {

    //http_response_code(404); // Not Found
    echo json_encode(['Feedback' => "show_id not found"]);
}
?>