<?php

declare(strict_types=1);

namespace controllers;

require_once 'models/Connection.php';
require_once 'models/User.php';
require_once 'models/Response.php';

use models\Connection;
use models\Response;
use models\User;
use PDO;
use Exception;


class UserActions
{
    private Connection $connection;
    private PDO $pdo;
    private User $user;
    private Response $response;

    public function __construct()
    {
        $this->connection = new Connection();
        $this->pdo = $this->connection->getPDO();
        $this->user = new User(0, '', '', '', '','', '', '', '', false, false);
        $this->response = new Response();
    }

    public function createUser(User $user): string
    {
        try {
            $query = "INSERT INTO alumno 
            (nombre, apellidos, password, telefono, email, sexo, 
            fecha_nacimiento, how_meet_us, privacy_policy, newsletter)
            VALUES (:nombre, :apellidos, :password, :telefono, :email, :sexo, 
            :fecha_nacimiento, :how_meet_us, :privacy_policy, :newsletter)";
            $statement = $this->pdo->prepare($query);

            $nombre = $user->getName();
            $apellidos = $user->getLastName();
            $password = $user->getPassword();
            $telefono = $user->getPhone();
            $email = $user->getEmail();
            $sexo = $user->getGender();
            $fecha_nacimiento = $user->getBirthDate();
            $how_meet_us = $user->getHowMeetUs();
            $privacy_policy = $user->getPrivatePolicy();
            $newsletter = $user->getNewsletter();

            $statement->bindParam(':nombre', $nombre);
            $statement->bindParam(':apellidos', $apellidos);
            $statement->bindParam(':password', $password);
            $statement->bindParam(':telefono', $telefono);
            $statement->bindParam(':email', $email);
            $statement->bindParam(':sexo', $sexo);
            $statement->bindParam(':fecha_nacimiento', $fecha_nacimiento);
            $statement->bindParam(':how_meet_us', $how_meet_us);
            $statement->bindParam(':privacy_policy', $privacy_policy, PDO::PARAM_BOOL);
            $statement->bindParam(':newsletter', $newsletter, PDO::PARAM_BOOL);

            $statement->execute();

            $user_id = $this->pdo->lastInsertId();
            $user->setId((int) $user_id);
            $user = $this->user->mountUser($user);

            $this->response->makeResponse(true, 'Alumno creado correctamente', $user);
            return $this->response->toJson();

        } catch (Exception $e) {

            $this->response->makeResponse(false, 'Error al crear alumno: ' . $e->getMessage(), []);
            return $this->response->toJson();
        }
    }

    public function deleteUser(int $id): string
    {
        try {
            $response = $this->getUserById($id);
            if (empty($response)) {
                $this->response->makeResponse(false, 'No se encontró ningún alumno con ID ' . $id, []);
                return $this->response->toJson();
            }
            $response_data = json_decode($response, true);
            $users = $response_data['data'];
            $query = "DELETE 
            FROM alumno 
            WHERE id = :id";
            $statement = $this->pdo->prepare($query);
            $statement->bindParam(':id', $id);
            if ($statement->execute()) {
                if ($statement->rowCount() > 0) {
                    $this->response->makeResponse(true, 'Alumno eliminado correctamente', $users);
                } else {
                    $this->response->makeResponse(false, 'No se encontró ningún alumno con ID ' . $id, []);
                }
            } else {
                $this->response->makeResponse(false, 'Error al eliminar alumno', []);
            }
            return $this->response->toJson();
        } catch (Exception $e) {
            $this->response->makeResponse(false, 'Error: '.$e->getMessage(), []);
            return $this->response->toJson();
        }
    }

    public function getUserById(int $id): string
    {
        try {
            $query = "SELECT * 
            FROM alumno 
            WHERE id = :id";
            $statement = $this->pdo->prepare($query);
            $statement->bindParam(':id', $id);
            if($statement->execute()) {
                $user_data = $statement->fetch(PDO::FETCH_ASSOC);
                if (!empty($user_data)) {
                    $this->response->makeResponse(true, 'Alumno cargado correctamente', $user_data);                
                } else {
                    $this->response->makeResponse(false, 'No se encontró ningún alumno con ese ID', []);
                }
            } else {
                $this->response->makeResponse(false, 'Error al consultar alumno', []);
            }
            return $this->response->toJson();
        } catch (Exception $e) {
            $this->response->makeResponse(false, 'Error: '.$e->getMessage(), []);
            return $this->response->toJson();
        }
    }

    public function getUsers(): string {
        try {
            $query = "SELECT * FROM alumno";
            $statement = $this->pdo->prepare($query);
    
            if ($statement->execute()) {
                $users_data = $statement->fetchAll(PDO::FETCH_ASSOC);
                if (!empty($users_data)) {
                    $this->response->makeResponse(true, 'Alumnos cargados correctamente', $users_data);
                } else {
                    $this->response->makeResponse(false, 'No se encontraron alumnos', []);
                }
            } else {
                $this->response->makeResponse(false, 'Error al consultar alumnos', []);
            }
            return $this->response->toJson();
        } catch (Exception $e) {
            $this->response->makeResponse(false, 'Error: ' . $e->getMessage(), []);
            return $this->response->toJson();
        }
    }

    public function updateUser(User $user): string
    {
        try {
            $set = [];
            $values = [];

            $id = $user->getId();
            $current_user_json = $this->getUserById($id);
            $current_user_array = json_decode($current_user_json, true);
            $current_user = $current_user_array['data'];
    
            $user_array = [
                'nombre' => $user->getName(),
                'apellidos' => $user->getLastName(),
                'password' => $user->getPassword(),
                'telefono' => $user->getPhone(),
                'email' => $user->getEmail(),
                'sexo' => $user->getGender(),
                'fecha_nacimiento' => $user->getBirthDate(),
                'how_meet_us' => $user->getHowMeetUs(),
                'privacy_policy' => $user->getPrivatePolicy(),
                'newsletter' => $user->getNewsletter()
            ];
            
            foreach ($user_array as $key => $value) {
                if ($value !== null && $value !== '' && $value !== $current_user[$key]) {
                    $set[] = "$key = :$key";
                    $values[":$key"] = $value;
                }
            }
    
            $values[':id'] = $id;
    
            if (empty($set)) {
                $this->response->makeResponse(false, 'No se ha actualizado ningún valor', []);
                return $this->response->toJson();
            }
    
            $query = "UPDATE alumno SET " . implode(', ', $set) . " WHERE id = :id";
            $statement = $this->pdo->prepare($query);
    
            foreach ($values as $key => $value) {
                $paramType = is_bool($value) ? PDO::PARAM_BOOL : PDO::PARAM_STR;
                $statement->bindValue($key, $value, $paramType);
            }
    
            if ($statement->execute()) {
                $userData = [
                    [
                        'id' => $user->getId(),
                        'nombre' => $user->getName(),
                        'apellidos' => $user->getLastName(),
                        'password' => $user->getPassword(),
                        'telefono' => $user->getPhone(),
                        'email' => $user->getEmail(),
                        'sexo' => $user->getGender(),
                        'fecha_nacimiento' => $user->getBirthDate(),
                        'how_meet_us' => $user->getHowMeetUs(),
                        'privacy_policy' => $user->getPrivatePolicy(),
                        'newsletter' => $user->getNewsletter()
                    ]
                ];
    
                $this->response->makeResponse(true, 'Alumno actualizado correctamente', $userData);
            } else {
                $this->response->makeResponse(false, 'Error al actualizar', []);
            }
    
            return $this->response->toJson();
        } catch (Exception $e) {
            $this->response->makeResponse(false, 'Error: ' . $e->getMessage(), []);
            return $this->response->toJson();
        }
    }   
}