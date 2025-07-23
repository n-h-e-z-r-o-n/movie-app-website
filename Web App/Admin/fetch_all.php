<?php
header("Content-Type: application/json");

$page = $_GET['page'];
//echo $page;
$perPage = 200;

$url = 'https://upnshare.com/api/v1/video/manage?perPage=' . $perPage . '&page=' . $page;

$headers = [
    'accept: application/json',
    'api-token: 1af48a98de335a85b8863a7b'
];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}

curl_close($ch);

// Process the response
if ($response !== false) {
    // Assuming the response is JSON
    $data = json_decode($response, true);
    // Do something with $data
    echo $response;
}
?>