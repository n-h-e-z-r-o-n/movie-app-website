<?php
// Get parameters (sanitize in production)
$videoId =  urlencode($_GET['video_id']) ;
$newName =  $_GET['new_name'] ;

$test = [
    'video_id' => $videoId,
    'new_name' => $newName,
];
//echo json_encode($test); /*
// API Configuration
$apiUrl = 'https://upnshare.com/api/v1/video/manage/' . $videoId;
$apiToken = '1af48a98de335a85b8863a7b'; // Use environment variables in production


// Prepare request
$data = ['name' => $newName];
$headers = [
    'accept: application/json',
    'api-token: ' . $apiToken,
    'Content-Type: application/json'
];

// Execute PATCH request
function makePatchRequest($url, $data, $headers) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => 'PATCH',
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_FAILONERROR => true
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    return [
        'status' => $httpCode,
        'response' => $response,
        'error' => $error
    ];
}

// Make the request
$result = makePatchRequest($apiUrl, $data, $headers);

// Handle response
header('Content-Type: application/json');
try {
    if ($result['status'] >= 200 && $result['status'] < 300) {
        // Try to decode the response to ensure it's valid JSON
        $decoded = json_decode($result['response']);
        if (json_last_error() === JSON_ERROR_NONE) {
            echo $result['response'];
        } else {
            echo json_encode([
                'success' => true,
                'message' => 'Name updated successfully',
                'raw_response' => $result['response']
            ]);
        }
    } else {
        http_response_code($result['status'] ?: 500);
        echo json_encode([
            'error' => true,
            'status' => $result['status'] ?: 500,
            'message' => $result['error'] ?: 'Unknown error',
            'response' => $result['response']
        ]);
    }
} catch (Exception $e) {
    //http_response_code(500);
    echo json_encode([
        'error' => true,
        'status' => 500,
        'message' => 'Internal server error: ' . $e->getMessage()
    ]);
}

?>