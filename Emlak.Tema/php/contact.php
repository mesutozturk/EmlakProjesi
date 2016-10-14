<?php
// Configuration options
// Enter the email address that you want to emails to be sent to.
define('EMAIL_RECIPIENT', 'example@example.com');
// Enter the email subject
define('EMAIL_SUBJECT', 'Contact form');

$fields = [
    'name' => function ($value) {
        $value = trim($value);

        return strlen($value) ? $value : false;
    },
    'email' => function ($value) {
        return filter_var($value, FILTER_VALIDATE_EMAIL);
    },
    'message' => function ($value) {
        $value = trim($value);

        return strlen($value) ? $value : false;
    },
    'phone' => function ($value) {
        return trim($value);
    }
];

$data = [];

foreach ($fields as $field => $validator) {
    $value = isset($_POST[$field]) ? $_POST[$field] : null;
    $data[$field] = $validator($value);
    if ($value === false) {
        error_response();
    }
}

if (!send_email($data)) {
    error_response();
}

success_response();

function error_response() {
    header('Content-type: application/json');
    http_response_code(400);
    exit;
}

function success_response() {
    header('Content-type: application/json');
    http_response_code(204);
    exit;
}

function send_email($data) {

    $msg = "You have been contacted by {$data['name']}, their additional message is as follows." . PHP_EOL . PHP_EOL;
    $msg .= "\"{$data['message']}\"" . PHP_EOL . PHP_EOL;
    $msg .= "You can contact {$data['name']} via email, {$data['email']}" . PHP_EOL . PHP_EOL;
    if (!empty($data['phone'])) {
        $msg .= "Or by phone {$data['phone']}";
    }

    $msg = wordwrap($msg, 70);

    $headers = "From: {$data['email']}" . PHP_EOL;
    $headers .= "Reply-To: {$data['email']}" . PHP_EOL;
    $headers .= "MIME-Version: 1.0" . PHP_EOL;
    $headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
    $headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

    $a = mail(EMAIL_RECIPIENT, EMAIL_SUBJECT, $msg, $headers);
    return $a;
}

exit;