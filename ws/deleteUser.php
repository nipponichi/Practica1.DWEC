<?php

declare(strict_types=1);

require_once 'controllers/UserActions.php';

use models\Response;
use controllers\UserActions;

try {
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;
    if ($id === null) {
        $response = new Response(false, 'Debes proporcionar un ID', []);
        $response = $response->toJson();
        header('Content-Type: application/json; charset=utf-8');
        echo $response;
        return;
    }

    $userActions = new UserActions();
    $response = $userActions->deleteUser($id);
    header('Content-Type: application/json; charset=utf-8');
    echo $response;
} catch (Exception $e) {
    $response = new Response(false, 'Error al eliminar alumno', []);
    $response = $response->toJson();
    header('Content-Type: application/json; charset=utf-8');
    echo $response;
}








