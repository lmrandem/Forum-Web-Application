<?php

require_once 'utils/AbstractService.php';

class JwtBlacklistService extends AbstractService {

    public function blacklist(string $token, string $expires): bool {
        $sql = 'INSERT INTO JwtBlacklist (token, expires) VALUES (?, ?)';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('ss', $token, $expires);
        return $stmt->execute();
    }

    public function isBlacklisted($token): bool {
        $sql = 'SELECT * FROM JwtBlacklist WHERE token = ?';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('s', $token);
        $stmt->execute();
        $stmt->store_result();
        return $stmt->num_rows > 0;
    }

}

?>