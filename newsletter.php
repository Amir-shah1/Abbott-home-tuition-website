<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please provide a valid email address.";
        exit;
    }

    // Check if email already exists
    $checkStmt = $conn->prepare("SELECT id FROM newsletter_subscribers WHERE email = ?");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        http_response_code(409); // Conflict
        echo "You are already subscribed!";
        $checkStmt->close();
        $conn->close();
        exit;
    }
    $checkStmt->close();

    $stmt = $conn->prepare("INSERT INTO newsletter_subscribers (email) VALUES (?)");
    $stmt->bind_param("s", $email);

    if ($stmt->execute()) {
        http_response_code(200);
        echo "Thank you for subscribing!";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong.";
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(403);
    echo "There was a problem with your submission.";
}
?>