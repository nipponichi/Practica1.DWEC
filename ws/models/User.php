<?php

declare(strict_types=1);

namespace models;

class User 
{
    private int $id;
    private string $name;
    private string $last_name;
    private string $password;
    private string $phone;
    private string $email;
    private string $gender;
    private string $birth_date;
    private string $how_meet_us;
    private ?bool $privacy_policy;
    private ?bool $newsletter;

    public function __construct(
        int $id,
        string $name,
        string $last_name,
        string $password,
        string $phone,
        string $email,
        string $gender,
        string $birth_date,
        string $how_meet_us,
        ?bool $privacy_policy,
        ?bool $newsletter
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->last_name = $last_name;
        $this->password = $password;
        $this->phone = $phone;
        $this->email = $email;
        $this->gender = $gender;
        $this->birth_date = $birth_date;
        $this->how_meet_us = $how_meet_us;
        $this->privacy_policy = $privacy_policy;
        $this->newsletter = $newsletter;
    }

    // Getters
    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getLastName()
    {
        return $this->last_name;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function getPhone()
    {
        return $this->phone;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getGender()
    {
        return $this->gender;
    }

    public function getBirthDate()
    {
        return $this->birth_date;
    }

    public function getHowMeetUs()
    {
        return $this->how_meet_us;
    }

    public function getPrivatePolicy()
    {
        return $this->privacy_policy;
    }

    public function getNewsletter()
    {
        return $this->newsletter;
    }

    // Setters
    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function setName(string $name)
    {
        $this->name = $name;
    }

    public function setLastName(string $last_name): void
    {
        $this->last_name = $last_name;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function setPhone(string $phone): void
    {
        $this->phone = $phone;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function setGender(string $gender): void
    {
        $this->gender = $gender;
    }

    public function setBirthDate(string $birth_date): void
    {
        $this->birth_date = $birth_date;
    }

    public function setHowMeet(string $how_meet_us): void
    {
        $this->how_meet_us = $how_meet_us;
    }

    public function setPrivacyPolicy(bool $privacy_policy): void
    {
        $this->privacy_policy = $privacy_policy;
    }

    public function setNewsletter(bool $newsletter): void
    {
        $this->newsletter = $newsletter;
    }

    public function mountUser(User $user): array
    {
        return [
            'id' => $user->getId(),
            'name' => $user->getName(),
            'last_name' => $user->getLastName(),
            'password' => $user->getPassword(),
            'phone' => $user->getPhone(),
            'email' => $user->getEmail(),
            'gender' => $user->getGender(),
            'birth_date' => $user->getBirthDate(),
            'how_meet_us' => $user->getHowMeetUs(),
            'privacy_policy' => $user->getPrivatePolicy(),
            'newsletter' => $user->getNewsletter()
        ];
    }

    public function mountUserFromArray(array $data): User
    {
        if (!empty($data['id'])) {
            $this->id = $data['id'];
        }
        $this->name = $data['nombre'] ?? '';
        $this->last_name = $data['apellidos'] ?? '';
        $this->password = $data['password'] ?? '';
        $this->phone = $data['telefono'] ?? '';
        $this->email = $data['email'] ?? '';
        $this->gender = $data['sexo'] ?? '';
        $this->birth_date = $data['fecha_nacimiento'] ?? '';
        $this->how_meet_us = $data['how_meet_us'] ?? '';
        $this->privacy_policy = isset($data['privacy_policy']);
        $this->privacy_policy = $data['privacy_policy'] ?? null;
        $this->newsletter = $data['newsletter'] ?? null;

        return $this;
    }

    // Checks form values
    function validateForm(array $user_data, bool $is_new_user): array
    {
        $errors = [];
    
        $required_fields = [
            'nombre' => 'El nombre es obligatorio',
            'apellidos' => 'Los apellidos son obligatorios',
            'fecha_nacimiento' => 'La fecha de nacimiento es obligatoria',
            'password' => 'La contraseña es obligatoria',
            'telefono' => 'El teléfono es obligatorio',
            'email' => 'El correo electrónico es obligatorio',
            'sexo' => 'El género es obligatorio',
        ];
    
        // Only for new users
        if ($is_new_user) {
            foreach ($required_fields as $field => $error_message) {
                if (empty($user_data[$field])) {
                    $errors[] = $error_message;
                }
            }
        }
        // All the users
        if (!empty($user_data['password']) && strlen($user_data['password']) < 8) {
            $errors[] = 'La contraseña debe tener al menos 8 caracteres';
        }
    
        if (!empty($user_data['telefono']) && !preg_match('/^\d{9}$/', $user_data['telefono'])) {
            $errors[] = 'El teléfono debe tener 9 números';
        }
    
        if (!empty($user_data['email']) && !filter_var($user_data['email'], FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'El correo electrónico no es válido';
        }
    
        if (!empty($user_data['sexo']) && (strlen($user_data['sexo']) > 1 || !in_array(strtoupper($user_data['sexo']), ['M', 'F', 'O']))) {
            $errors[] = 'El género debe ser M, F u O';
        }
    
        if ($is_new_user && empty($user_data['privacy_policy'])) {
            $errors[] = 'Debe aceptar la política de privacidad';
        }
    
        return $errors;
    }
    
}
