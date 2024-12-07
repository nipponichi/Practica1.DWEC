<?php

declare(strict_types=1);

require_once 'models/User.php';
require_once 'controllers/UserActions.php';

use models\Response;
use models\User;
use controllers\UserActions;

$user = new User(0, '', '', '', '', '', '', '', '', false, false);
$userActions = new UserActions();

try {
    $id = isset($_GET['id']) && $_GET['id'] !== '' ? (int) $_GET['id'] : null;

    if ($id === null || $id <= 0) {
        $response = new Response(false, 'Debes proporcionar un ID válido', []);
        header('Content-Type: application/json; charset=utf-8');
        echo $response->toJson();
        return;
    }

    // Data from form
    $user_data = [
        'id' => $id,
        'nombre' => $_POST['nombre'] ?? '',
        'apellidos' => $_POST['apellidos'] ?? '',
        'fecha_nacimiento' => $_POST['fecha_nacimiento'] ?? '',
        'password' => $_POST['password'] ?? '',
        'telefono' => $_POST['telefono'] ?? '',
        'email' => $_POST['email'] ?? '',
        'sexo' => $_POST['sexo'] ?? '',
        'how_meet_us' => $_POST['how_meet_us'] ?? '',
        'privacy_policy' => isset($_POST['privacy_policy']) 
            ? ($_POST['privacy_policy'] === 'true' ? true : ($_POST['privacy_policy'] === 'false' ? false : null)) 
            : null,
        'newsletter' => isset($_POST['newsletter']) 
            ? ($_POST['newsletter'] === 'true' ? true : ($_POST['newsletter'] === 'false' ? false : null)) 
            : null,
    ];

    $errors = $user->validateForm($user_data, false);

    if (!empty($errors)) {
        $response = new Response(false, 'Revisa los campos del formulario: ', $errors);
        header('Content-Type: application/json; charset=utf-8');
        echo $response->toJson();
        return;
    }

    $user->mountUserFromArray($user_data);
    $response = $userActions->updateUser($user);
    header('Content-Type: application/json; charset=utf-8');
    echo $response;
} catch (Exception $e) {
    $response = new Response(false, 'Error actualizando alumno: ' . $e->getMessage(), []);
    header('Content-Type: application/json; charset=utf-8');
    echo $response->toJson();
}
