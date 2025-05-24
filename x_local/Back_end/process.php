<?php
//header('Content-Type: application/json');
// Get the target URL from the query parameter
$targetUrl = isset($_GET['url']) ? $_GET['url'] : '';
//echo json_encode(['massage' => 'Error adding user']);
//exit;
if (empty($targetUrl) || !filter_var($targetUrl, FILTER_VALIDATE_URL)) {
    http_response_code(400);
    echo 'Invalid or missing URL';
    exit;
}

// Initialize cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $targetUrl);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false); // Disable automatic redirects
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return response as string
curl_setopt($ch, CURLOPT_HEADER, true); // Include headers in response
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Disable SSL verification (use cautiously)
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'); // Set user agent

// Execute request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$headers = substr($response, 0, $headerSize);
$body = substr($response, $headerSize);
curl_close($ch);

// Check for redirect status codes (301, 302, etc.)
if ($httpCode >= 300 && $httpCode < 400) {
    http_response_code(403);
    echo 'Redirect detected and blocked';
    exit;
}

// Set headers to mimic original response
header('Content-Type: text/html; charset=UTF-8'); // Adjust based on content type
echo $body;
?>