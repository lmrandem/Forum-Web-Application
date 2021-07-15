<?php

require_once 'utils/AbstractService.php';

class BoardService extends AbstractService {

    public function listBoards(): ?array {
        $sql = 'SELECT boards.name, title, description, username AS creator
                FROM boards, users
                WHERE creator = id';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function getBoard(string $name): ?array {
        $sql = 'SELECT boards.name, title, description, username AS creator
                FROM boards, users
                WHERE creator = id AND boards.name = ?';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('s', $name);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function createBoard(string $name, string $title, string $description, int $user): bool {
        $sql = 'INSERT INTO boards (name, title, description, creator) VALUES (?, ?, ?, ?)';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('sssi', $name, $title, $description, $user);
        return $stmt->execute();
    }

}

?>