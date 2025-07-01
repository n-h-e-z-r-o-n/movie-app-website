<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (use with caution)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
error_reporting(0); // Turn off error reporting on live site
ini_set('display_errors', 0);


$action = $_POST['action'] ?? $_GET['action'] ?? '';

try {
    // Connect to SQLite database (creates if doesn't exist)
    $db = new PDO('sqlite:database.db');
    // Set the PDO error mode to exception
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create the table if it doesn't exist
    $query = "CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        watchlist TEXT,
        Messages TEXT,
        ProfileIMG TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );";
    $db->exec($query);

} catch (PDOException $e) {
    echo json_encode(['massage' => 'Connection failed']);
    exit;
}

switch ($action) {
        case 'login':
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';
            LoginUser($email, $password);
            break;

        case 'register':
            $name = $_POST['name'] ?? '';
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';
            $watchlist =  '[]';
            $messages =  '[]';
            addUser($name, $email, $password, $watchlist, $messages);
            break;

        case 'updateWatchlist':
            $email = $_POST['email'] ?? '';
            $watchlist = $_POST['watchlist'] ?? '[]';
            updateWatchlist($email, $watchlist);
            break;

        case 'updateMassagelist':
            $email = $_POST['email'] ?? '';
            $Messages = $_POST['Messages'] ?? '[]';
            updateMassagelist($email, $Messages);
            break;


        case 'requestPasswordReset':
            $email = $_POST['email'] ?? '';
            requestPasswordReset($email);
            break;

        case 'updatePass':
            $password = $_POST['password'] ?? '';
            $email = $_POST['email'] ?? '';

            updatePass($password, $email);
            break;

        case 'updateImg':

            $email = $_POST['email'];
            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                $file  = $_FILES['image'];
                $fileContent = file_get_contents($file['tmp_name']);
                $base64Image = 'data:' . $file['type'] . ';base64,' . base64_encode($fileContent);
                //echo json_encode(['massage' => $base64Image ]);
                updateIMG($base64Image, $email);
            }else{
                echo json_encode(['massage' => 'No file uploaded or upload error' ]);
            }
            break;

        case 'getWatchlist':
            $email = $_POST['email'] ?? '';
            getWatchlist($email);
            break;

        case 'getMessageslist':
            $email = $_POST['email'] ?? '';
            getMessageslist($email);
            break;

        case 'getUser':
            $email = $_POST['email'] ?? '';
            getUsers($email);
            break;

        default:
            echo json_encode(['massage' => 'Invalid action']);
}



// Function to add user
function addUser($username, $email, $password, $watchlist, $Messages) {
    global $db;
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $defaultProfileImg = './Assets/account.png';
    try {
        // Prepare the SQL query to insert the user
        $stmt = $db->prepare("INSERT INTO users (name, email, password, watchlist, Messages, ProfileIMG) VALUES (:username, :email, :password, :watchlist, :Messages, :img)");
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':password', $hashedPassword);
        $stmt->bindValue(':watchlist', $watchlist);
        $stmt->bindValue(':Messages', $Messages);
        $stmt->bindValue(':img', $defaultProfileImg);

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(['massage' => 'User added successfully']);
        }
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // SQLite constraint violation (unique email)
            echo json_encode(['massage' => 'User already exists']);
        } else {
               echo json_encode(['massage' => 'Error adding user']);
        }
    }
}


function getUsers($email) {
    global $db;
    try {
        $stmt = $db->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->bindValue(':email', $email);
        $stmt->execute();

         // Fetch the user data
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
               unset($user['password']);
               echo json_encode(['massage' => $user]);

        } else {
               echo json_encode(['massage' => 'User not found']);

        }
    } catch (PDOException $e) {
        echo "Error fetching users: " . $e->getMessage();
    }
}



// Function to get a specific user's information based on email and password
function LoginUser($email, $password) {
    global $db;

    try {
        // Prepare the SQL query to find a user by email
        $stmt = $db->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->bindValue(':email', $email);
        $stmt->execute();

        // Fetch the user data
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            if (password_verify($password, $user['password'])) {
                echo json_encode(['massage' => $user]);
            } else {
                echo json_encode(['massage' => 'Invalid password']);
            }
        } else {
               echo json_encode(['massage' => 'User not found']);

        }
    } catch (PDOException $e) {
             return ['error' => 'Database error: ' . $e->getMessage()];
    }
}

function updateWatchlist($email, $watchlist) {
    global $db;

    try {
        // Prepare the update query
        $stmt = $db->prepare("UPDATE users SET watchlist = :watchlist WHERE email = :email");
        $stmt->bindValue(':watchlist', $watchlist);
        $stmt->bindValue(':email', $email);

        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                echo json_encode(['massage' => 'Watchlist updated successfully']);
            } else {
                echo json_encode(['massage' => 'No user found with that ID']);
            }
        }
    } catch (PDOException $e) {
        echo json_encode(['massage' => 'Error updating watchlist']);
    }
}

function getWatchlist($email) {
    global $db;
    $stmt = $db->prepare("SELECT watchlist FROM users WHERE email = :email");
    $stmt->bindValue(':email', $email);
    if ($stmt->execute()) {
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result && isset($result['watchlist'])) {
             echo json_encode(['massage' => $result['watchlist']]);
        }else{
           echo json_encode(['massage' => 'Error fetching']);
        }
    }
}


function getMessageslist($email) {
    global $db;
    $stmt = $db->prepare("SELECT Messages FROM users WHERE email = :email");
    $stmt->bindValue(':email', $email);
    if ($stmt->execute()) {
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result && isset($result['Messages'])) {
             echo json_encode(['massage' => $result['Messages']]);
        }else{
           echo json_encode(['massage' => 'Error fetching']);
        }
    }
}


function updateMassagelist($email, $Messages) {
    global $db;

    try {
        // Prepare the update query
        $stmt = $db->prepare("UPDATE users SET Messages = :Messages WHERE email = :email");
        $stmt->bindValue(':Messages', $Messages);
        $stmt->bindValue(':email', $email);

        // Execute the query
        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                echo json_encode(['massage' => 'Messages updated successfully']);
            } else {
                echo json_encode(['massage' => 'No user found with that ID']);
            }
        }
    } catch (PDOException $e) {
        echo json_encode(['massage' => 'Error updating Messages']);
    }
}

function requestPasswordReset($email) {
    global $db;

    try {
        // Check if user exists (but don't reveal if they don't)
        $stmt = $db->prepare("SELECT email FROM users WHERE email = :email");
        $stmt->bindValue(':email', $email);
        $stmt->execute();

        if ($stmt->fetch()) {
            $token = bin2hex(random_bytes(32));
            $hashedPassword = password_hash($token, PASSWORD_DEFAULT);

            // Store token in database
            $stmt = $db->prepare("UPDATE users SET password = :newPass WHERE email = :email");
            $stmt->bindValue(':newPass', $hashedPassword);
            $stmt->bindValue(':email', $email);
            $stmt->execute();

            // Send email (pseudo-code - implement your email sending)
            $subject = "Password Reset Request";
            $message = "reset your password, New Password: $token";
            mail($email, $subject, $message);
        }

        echo json_encode(['message' => 'If this email exists, a reset link has been sent']);

    } catch (PDOException $e) {
        echo json_encode(['message' => 'Database error']);
    }
}

function updatePass($password, $email) {
    global $db;

    try {
        // Check if user exists (but don't reveal if they don't)
        $stmt = $db->prepare("SELECT email FROM users WHERE email = :email");
        $stmt->bindValue(':email', $email);
        $stmt->execute();

        if ($stmt->fetch()) {


            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Store token in database
            $stmt = $db->prepare("UPDATE users SET password = :token WHERE email = :email");
            $stmt->bindValue(':token', $hashedPassword);
            $stmt->bindValue(':email', $email);
            $stmt->execute();
            echo json_encode(['message' => 'Password Changed ']);
        }
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Database error']);
    }
}

function updateIMG($img, $email) {
    global $db;
    try {
        // Check if user exists (but don't reveal if they don't)
        $stmt = $db->prepare("SELECT email FROM users WHERE email = :email");
        $stmt->bindValue(':email', $email);
        $stmt->execute();

        if ($stmt->fetch()) {
            // Store token in database
            $stmt = $db->prepare("UPDATE users SET ProfileIMG = :img WHERE email = :email");
            $stmt->bindValue(':img', $img);
            $stmt->bindValue(':email', $email);

            if ($stmt->execute()) {
                 echo json_encode(['message' => 'Profile Updated', 'imagedata' =>  $img]);
            } else {
                 echo json_encode(['message' => 'Update failed']);
            }
        }
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Update failed, Database error']);
    }
}



?>