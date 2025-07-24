<?php
// Set the correct MIME type for JavaScript
header('Content-Type: application/javascript');
// Optional: Add server-side logic (e.g., check user permissions)
$isAuthorized = true; // Example: Check if the user is authorized
if ($isAuthorized) {
    // Output the content of NavBar.js
    //readfile('../NavBar.js');
    $jsCode = file_get_contents('../watch.js');
    $obfuscatedCode = obfuscateJs($jsCode);
    echo $obfuscatedCode;

} else {
    // Output an error message or alternative JS code
    echo "console.error('Access to NavBar.js denied!');";
}

function obfuscateJs($code) {
    // Encode the JavaScript code in base64
    $encodedCode = base64_encode($code);

    // Create a JavaScript snippet to decode and execute the code
    $obfuscatedCode = "eval(atob('$encodedCode'));";

    return $obfuscatedCode;
}

?>