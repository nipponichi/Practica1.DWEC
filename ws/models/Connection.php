<?php

declare(strict_types=1);

namespace models;

use PDO;
use PDOException;
use models\Database;

require_once 'Database.php';

class Connection
{
    private PDO $pdo;
    public function __construct()
    {

        $database = new Database();

        try {
            $this->pdo = new PDO(
                'mysql:host=' . $database->getHost() . ';dbname=' . $database->getName() . ';charset=' . $database->getCharset(),
                $database->getUser(),
                $database->getPassword(),
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
            exit;
        }
    }

    public function getPDO(): PDO
    {
        return $this->pdo;
    }
}
