<?php

declare(strict_types=1);

require_once '../ws/models/User.php';
require_once '../ws/controllers/UserActions.php';

use models\User;

// html form values
$id = (int) ($_POST['id'] ?? '0');
$name = (string) ($_POST['name'] ?? 'noname');
$last_name = (string) ($_POST['last_name'] ?? 'noLastName');
$password_input = (string) ($_POST['password'] ?? '');
$phone = (string) ($_POST['phone'] ?? '654987321');
$email = (string) ($_POST['email'] ?? 'no@email.com');
$gender = (string) ($_POST['gender'] ?? 'other');
$birth_date = (string) ($_POST['birthday'] ?? '1900-01-01');
$how_meet_us = (string) ($_POST['how_meet_us'] ?? 'unknown');
$privacy_policy = isset($_POST['privacy_policy'])
? ($_POST['privacy_policy'] === 'true' ? true : ($_POST['privacy_policy'] === 'false' ? false : null)) 
: null;
$newsletter = isset($_POST['newsletter']) 
? ($_POST['newsletter'] === 'true' ? true : ($_POST['newsletter'] === 'false' ? false : null)) 
: null;

// encrypt password 
$password = password_hash($password_input, PASSWORD_BCRYPT);

$user = new User(
    $id,
    $name,
    $last_name,
    $password,
    $phone,
    $email,
    $gender,
    $birth_date,
    $how_meet_us,
    $privacy_policy,
    $newsletter
);






