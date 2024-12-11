<?php

declare(strict_types=1);

namespace models;

use ws\interfaces\IToJson;

require_once 'Database.php';
require_once '../ws/interfaces/IToJson.php';

class Response implements IToJson
{
    private bool $success;
    private string $message;

    private array $data;

    public function __construct(
        bool $success = false, 
        string $message = '', 
        array $data = []
    ){
        $this->success = $success;
        $this->message = $message;
        $this->data = $data;
    }

    public function setSuccess(bool $success): void {
        $this->success = $success;
    }

    public function setMessage(String $message): void {
        $this->message = $message;
    }

    public function setData(array $data) {
        $this->data = $data;
    }
    
    public function getSuccess(): bool
    {
        return $this->success;
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    public function getData(): array
    {
        return $this->data;
    }

    public function makeResponse(bool $success, string $message, array $data): void {
        $this->success = $success;
        $this->message = $message;
        $this->data = $data;
    }

    public function toJson(): string {
        return json_encode([
            'success' => $this->success,
            'message' => $this->message,
            'data' => $this->data
        ], JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }
}