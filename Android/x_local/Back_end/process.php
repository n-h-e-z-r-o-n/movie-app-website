<?php
// Simple PHP Ad Blocker Proxy inspired by uBlock Origin concepts

// URL of the iframe content to fetch (replace with your iframe's src)
$target_url = isset($_GET['url']) ? filter_var($_GET['url'], FILTER_SANITIZE_URL) : '';

// Basic filter list inspired by uBlock Origin's EasyList
$ad_filters = [
    // Common ad domains (extend this list based on your needs)
    '/(doubleclick\.net|adservice\.google\.com|adserver|banner)/i',
    // JavaScript redirect patterns
    '/window\.location\s*=/i',
    '/window\.open\s*\(/i',
    // Meta refresh tags
    '/<meta[^>]*http-equiv=["\']refresh["\'][^>]*>/i',
    // Common ad-related script sources
    '/src=["\'][^"\']*(ads|adserver|banner)[^"\']*["\']/i',
];

// Function to fetch and filter content
function fetch_and_filter_content($url) {
    global $ad_filters;

    // Initialize cURL to fetch the content
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false); // Prevent cURL from following redirects
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    $content = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code !== 200 || !$content) {
        return 'Error: Unable to fetch content or invalid response.';
    }

    // Apply filters to remove ad-related content
    foreach ($ad_filters as $filter) {
        $content = preg_replace($filter, '', $content);
    }

    // Remove all <script> tags to prevent JavaScript-based redirects
    $content = preg_replace('/<script\b[^>]*>.*?<\/script>/is', '', $content);

    // Neutralize inline JavaScript event handlers (e.g., onclick="window.open(...)")
    $content = preg_replace('/\bon\w+="[^"]*"/i', '', $content);

    // Optionally, wrap content to prevent top-level navigation
    $content = str_replace('window.top.location', 'void(0)', $content);

    return $content;
}

// Check if a valid URL is provided
if (!empty($target_url) && filter_var($target_url, FILTER_VALIDATE_URL)) {
    header('Content-Type: text/html; charset=UTF-8');
    echo fetch_and_filter_content($target_url);
} else {
    http_response_code(400);
    echo 'Error: Invalid or missing URL parameter.';
}
?>