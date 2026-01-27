<?php
header('Content-Type: application/json');
$file = 'tracks.json';

// Check if file exists, if not create it with empty array
if (!file_exists($file)) {
    file_put_contents($file, '[]');
}

// Read and output the file contents
echo file_get_contents($file);
?>