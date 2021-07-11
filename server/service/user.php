<?php

require_once 'utils/AbstractService.php';

class UserService extends AbstractService {

    public function getUserById(int $id): ?array {
        $sql = 'SELECT id, username, name, email FROM users WHERE id = ?';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    private function getUser(string $sql, string $param) {
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('s', $param);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function getUserByEmail(string $email, bool $showPwd): ?array {
        $sql = 'SELECT id, username, name, email FROM users WHERE email = ?';
        if ($showPwd) {
            $sql = 'SELECT * FROM Users WHERE email = ?';
        }
        return $this->getUser($sql, $email);
    }

    public function getUserByUsername(string $username, bool $showPwd): ?array {
        $sql = 'SELECT id, username, name, email FROM users WHERE username = ?';
        if ($showPwd) {
            $sql = 'SELECT * FROM Users WHERE username = ?';
        }
        return $this->getUser($sql, $username);
    }

    public function createUser(string $username, string $name, string $email, string $password): bool {
        $sql = 'INSERT INTO users (username, name, email, Password) VALUES (?, ?, ?, ?)';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('ssss', $username, $name, $email, $password);
        return $stmt->execute();
    }

}

?>