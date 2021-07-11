<?php

require_once 'utils/AbstractService.php';

class SubscriptionService extends AbstractService {

    public function listSubscriptions($user): ?array {
        $sql = 'SELECT boards.* FROM boardSubscriptions, boards WHERE user = ? boardSubscriptions.board = boards.name';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('i', $user);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function getSubscription($board, $user): ?array {
        $sql = 'SELECT * FROM boardSubscriptions WHERE board = ? AND user = ?';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('si', $board, $user);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function subscribeToBoard($board, $user): bool {
        $sql = 'INSERT INTO boardSubscriptions (board, user) VALUES (?, ?)';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('si', $board, $user);
        return $stmt->execute();
    }

    public function unsubscribeFromBoard($board, $user): bool {
        $sql = 'DELETE FROM boardSubscriptions WHERE board = ? AND user = ?';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('si', $board, $user);
        return $stmt->execute();
    }

}

?>