<?php
   header('Content-Type: application/json');

    // Get the query parameter
    $query = isset($_GET['q']) ? urlencode($_GET['q']) : '';
    $apiUrl = "https://animeapi.skin/search?q={$query}";

    // Initialize cURL session
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, false);


    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo json_encode(['error' => 'Request error']);
    } else {
        // Set content type for JSON
        echo $response;
    }

    curl_close($ch);
?>
