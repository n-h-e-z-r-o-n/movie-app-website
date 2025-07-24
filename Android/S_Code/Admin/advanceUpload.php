<?php
function uploadVideo() {
    // Fetch URL and name from GET request
    if (isset($_GET['url']) && isset($_GET['name'])) {
        $url = $_GET['url'];
        $name = $_GET['name'];
    } else {
        echo "URL or Name is missing.";
        echo json_encode(["error" => true, "message" => "URL or Name is missing."]);
        return;
    }

    $data = array(
        'url' => $url,  // Video URL from GET request
        'name' => $name  // Video name from GET request
    );

    // Convert data to JSON
    $jsonData = json_encode($data);

    $apiUrl = 'https://upnshare.com/api/v1/video/advance-upload';
    $apiToken = '108ce292df799791c4df2200';  // Your API token

    // Initialize cURL session
    $ch = curl_init();

    // Set cURL options
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'api-token: ' . $apiToken
    ));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);

    // Execute cURL request
    $response = curl_exec($ch);

    // Check for errors
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
        echo json_encode(['error' => true, 'message' => curl_error($ch)]);
    } else {
        // Decode the response and print it
        $result = json_decode($response, true);
        echo json_encode($result);
    }

    // Close cURL session
    curl_close($ch);
}

// Call the function to upload the video
uploadVideo();
?>
