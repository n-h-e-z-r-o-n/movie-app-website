<?php
// Get input values
$video_id = isset($_GET['video_id']) ? $_GET['video_id'] : 'default_video';
$show_id = isset($_GET['show_id']) ? $_GET['show_id'] : 'default_show';

// File path
$file = 'data.json';

// Read existing data (or initialize empty array)
$data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

// Check if show_id already exists
$show_exists = false;
foreach ($data as $entry) {
    if ($entry['show_id'] === $show_id) {
        $show_exists = true;
        break;
    }
}

// Add only if show_id is new
if (!$show_exists) {
    $data[] = ['video_id' => $video_id, 'show_id' => $show_id];
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));

    echo json_encode(['feedback' => "Data saved successfully!"]);

} else {
    echo json_encode(['feedback' => "Error: show_id already exists!"]);
}
?>