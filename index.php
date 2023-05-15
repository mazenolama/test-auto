<?php

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the incoming webhook notification payload
    $payload = file_get_contents('php://input');
    // Parse the JSON payload into an associative array
    // Decode the JSON payload
    file_put_contents('log.json', $payload, FILE_APPEND);

    // Check if the payload is for a push event
    if (isset($payload['ref']) && $payload['ref'] === 'refs/heads/main') {
        // Execute the Git pull command to update the repository
        $output = shell_exec('cd H:\Workspace\Hadef IT\Local-QM System\testpull System && git pull');

        // Log the output of the Git pull command
        file_put_contents('logfile.txt', $output, FILE_APPEND);

        // Respond to the webhook notification with a success message
        http_response_code(200);
        echo 'Git repository pulled successfully';

        } else {

        // Respond to the webhook notification with an error message
        http_response_code(400);
        echo 'Invalid webhook notification payload';

    }

} else {
    // Send an error response for unsupported request methods
    http_response_code(405);
    echo 'Method Not Allowed.';
}



