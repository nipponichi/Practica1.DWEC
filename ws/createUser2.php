<?php

declare(strict_types=1);

require_once 'models/User.php';
require_once 'controllers/UserActions.php';

use models\User;
use models\Response;
use controllers\UserActions;

$user = new User(0, '', '', '', '', '', '', '', '', false, false);
$userActions = new UserActions();

try {
    //Data from form
    $user_data = [
        'nombre' => $_POST['nombre'] ?? '',
        'apellidos' => $_POST['apellidos'] ?? '',
        'fecha_nacimiento' => $_POST['fecha_nacimiento'] ?? '',
        'password' => $_POST['password'] ?? '',
        'telefono' => $_POST['telefono'] ?? '',
        'email' => $_POST['email'] ?? '',
        'sexo' => $_POST['sexo'] ?? '',
        'how_meet_us' => $_POST['how_meet_us'] ?? '',
        'privacy_policy' => isset($_POST['privacy_policy']) ? (bool)$_POST['privacy_policy'] : false,
        'newsletter' => isset($_POST['newsletter']) ? (bool)$_POST['newsletter'] : false,
    ];

    $errors = $user->validateForm($user_data, true);

    if (!empty($errors)) {
        $response = new Response(false, 'Revisa los campos del formulario', $errors);
        $response = $response->toJson();
        header('Content-Type: application/json; charset=utf-8');
        echo $response;
        return;
    }

    $user->mountUserFromArray($user_data);
    $response = $userActions->createUser($user);
    header('Content-Type: application/json; charset=utf-8');
    echo $response;

} catch (Exception $e) {
    $response = new Response(false, 'Error creando alumno: ' . $e->getMessage(), []);
    $response = $response->toJson();
    header('Content-Type: application/json; charset=utf-8');
    echo $response;
}
