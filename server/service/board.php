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

    public function createBoard(string $name, string $title, string $description, int $creator): bool {
        $sql = 'INSERT INTO boards (name, title, description, creator) VALUES (?, ?, ?, ?)';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('sssi', $name, $title, $description, $creator);
        return $stmt->execute();
    }

    /*
    public function subscribeToBoard($board, $user): bool {
        $sql = 'INSERT INTO board_subscribers (board, user) VALUES (?, ?)';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('si', $board, $user);
        return $stmt->execute();
    }

    public function unsubscribeFromBoard($board, $user): bool {
        $sql = 'DELETE FROM board_subscribers WHERE board = ? AND user = ?';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('si', $board, $user);
        return $stmt->execute();
    }
    */

}

?>