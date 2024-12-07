<?php

declare(strict_types=1);

namespace models;

use PDO;

require_once 'configurations/config.php';

class Database
{
    private string $host;
    private string $user;
    private string $password;
    private string $name;
    private string $charset;
    private PDO $db;

    public function __construct() 
    {
        $this->host = DB_HOST;
        $this->user = DB_USER;
        $this->password = DB_PASSWORD;
        $this->name = DB_NAME;
        $this->charset = DB_CHARSET;
    }

    public function getHost(): string
    {
        return $this->host;
    }

    public function getUser(): string
    {
        return $this->user;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getCharset(): string
    {
        return $this->charset;
    }

}