<?php
header('Content-Type: application/json'); // Ensure JSON response

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

            //echo json_encode(['massage' => $Messages]);
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



        default:
            echo json_encode(['massage' => 'Invalid action']);
}



// Function to add user
function addUser($username, $email, $password, $watchlist, $Messages) {
    global $db;
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
        // Prepare the SQL query to insert the user
        $stmt = $db->prepare("INSERT INTO users (name, email, password, watchlist, Messages) VALUES (:username, :email, :password, :watchlist, :Messages)");
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':password', $hashedPassword);
        $stmt->bindValue(':watchlist', $watchlist);
        $stmt->bindValue(':Messages', $Messages);

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

// Example usage (commented out to avoid duplicates):
// addUser('john_doe', 'h@gmail.com', '123456', '[]', '[]');


// Function to get users
function getUsers() {
    global $db;
    try {
        // Prepare and execute the SELECT query
        $stmt = $db->query("SELECT * FROM users");

        echo "<h3>User List:</h3>";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo "<div style='border:1px solid #ccc; padding:10px; margin-bottom:10px;'>";
            echo "ID: " . htmlspecialchars($row['id']) . "<br>";
            echo "Username: " . htmlspecialchars($row['name']) . "<br>";
            echo "Email: " . htmlspecialchars($row['email']) . "<br>";
            echo "Created: " . htmlspecialchars($row['created_at']) . "<br>";
            echo "</div>";
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

        // Execute the query
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
            // Generate secure token and expiration (1 hour)
            $token = bin2hex(random_bytes(32));

            $hashedPassword = password_hash($token, PASSWORD_DEFAULT);

            // Store token in database
            $stmt = $db->prepare("UPDATE users SET password = :token WHERE email = :email");
            $stmt->bindValue(':token', $hashedPassword);
            $stmt->bindValue(':email', $email);
            //$stmt->execute();

            // Send email (pseudo-code - implement your email sending)
            $subject = "Password Reset Request";
            $message = "reset your password, Reset Code: $token";
            mail($email, $subject, $message);
        }

        // Always return the same message whether user exists or not
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



?>