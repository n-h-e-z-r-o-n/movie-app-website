<?php
// Set the correct MIME type for JavaScript
header('Content-Type: application/javascript');
// Optional: Add server-side logic (e.g., check user permissions)
$isAuthorized = true; // Example: Check if the user is authorized
if ($isAuthorized) {
    // Output the content of NavBar.js
    //readfile('../NavBar.js');
    $jsCode = file_get_contents('../script.js');
    $obfuscatedCode = obfuscateJs($jsCode);
    echo $obfuscatedCode;

    //header('Location: ../script.js', true, 302);





} else {
    // Output an error message or alternative JS code
    echo "console.error('Access to NavBar.js denied!');";
}

function obfuscateJs($code) {
    $key = 'secret_key_123'; // Change this to a strong random key
    $encoded = '';
    for ($i = 0; $i < strlen($code); $i++) {
        $encoded .= $code[$i] ^ $key[$i % strlen($key)];
    }
    return 'eval(unescape("' . rawurlencode($encoded) . '".replace(/./g, function(c) {
        return String.fromCharCode(c.charCodeAt(0) ^ "' . addslashes($key) . '".charCodeAt(0);
    })));';
}

?>