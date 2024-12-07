<?php

declare(strict_types=1);

require_once 'controllers/UserActions.php';
require_once 'models/Response.php';

use controllers\UserActions;
use models\Response;

try {
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;
    $userActions = new UserActions();
    $response = $id !== null ? $userActions->getUserById($id) : $userActions->getUsers();
    header('Content-Type: application/json; charset=utf-8');
    echo $response;
} catch (Exception $e) {
    $response = new Response(false, 'Error mostrando alumno/s: ' . $e->getMessage(), []);
    $response = $response->toJson();
    header('Content-Type: application/json; charset=utf-8');
    echo $response;
}
