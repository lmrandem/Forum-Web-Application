<?php

require_once 'utils/AbstractService.php';

class CommentService extends AbstractService {

    private function recursiveCommentTree(array $tree, ?int $parent): array {
        $commentTree = [];
        foreach($tree as $comment) {
            if ($comment['parentId'] == $parent) {
                $commentTree[$comment['id']] = $comment;
                $commentTree[$comment['id']]['children'] = $this->recursiveCommentTree($tree, $comment['id']);
            }
        }
        return $commentTree;
    }

    public function listComments(): ?array {
        $sql = 'SELECT * FROM comments ORDER BY id ASC';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        return $this->recursiveCommentTree($result, null);
    }

    public function getComment(int $id): ?array {
        $sql = 'SELECT * FROM comments WHERE id = ?';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function createComment(string $comment, int $user, int $post, ?int $parent = null): bool {
        $stmt;
        if ($parent) {
            $sql = 'INSERT INTO comments (comment, user, post, parentId) VALUES (?, ?, ?, ?)';
            $stmt = $this->getConnection()->prepare($sql);
            $stmt->bind_param('siii', $comment, $user, $post, $parent);
        }
        else {
            $sql = 'INSERT INTO comments (comment, user, post) VALUES (?, ?, ?)';
            $stmt = $this->getConnection()->prepare($sql);
            $stmt->bind_param('sii', $comment, $user, $post);
        }
        return $stmt->execute();
    }

}

?>