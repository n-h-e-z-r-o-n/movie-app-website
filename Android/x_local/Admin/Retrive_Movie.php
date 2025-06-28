<?php
header("Content-Type: application/json");

if (isset($_GET['search'])) {
    $search = urlencode($_GET['search']);
    $apiUrl = 'https://upnshare.com/api/v1/video/manage?search=' . $search;
    $apiToken = '1af48a98de335a85b8863a7b';

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'accept: application/json',
        'api-token: ' . $apiToken
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo json_encode([
            'error' => true,
            'message' => curl_error($ch)
        ]);
    } else {
        echo $response;
        //echo json_encode(['error' => $search]);
    }

    curl_close($ch);
} else {
    echo json_encode([
        'error' => true,
        'message' => 'Missing search parameter'
    ]);
}
?>
