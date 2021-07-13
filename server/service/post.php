<?php

require_once 'utils/AbstractService.php';
require_once 'utils/Slug.php';

class PostService extends AbstractService {

    public function listPosts(?array $query = []): ?array {
        $sql = [];
        $sql[] = 'SELECT posts.id, title, slug, createdAt, updatedAt, board, username';
        $sql[] = 'FROM posts, users';
        $sql[] = 'WHERE posts.user = users.id';
        $values = [];
        $types = '';
        if ($query && isset($query['username'])) {
            $sql[] = 'AND users.username = ?';
            $queries[] = $query['username'];
            $types = $types.'s';
        }
        if ($query && isset($query['board'])) {
            $sql[] = 'AND board = ?';
            $values[] = $query['board'];
            $types = $types.'s';
        }
        $sql[] = 'ORDER BY posts.id ASC';
        $sql = implode(' ', $sql);
        $stmt = $this->getConnection()->prepare($sql);
        if ($values) {
            $stmt->bind_param($types, ...$values);
        }
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function getPost(int $id): ?array {
        $sql = 'SELECT posts.id, title, slug, content, updatedAt, board, username
                FROM posts, users
                WHERE posts.user = users.id AND posts.id = ?';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function createPost(string $title, string $content, string $board, int $user): bool {
        $sql = 'INSERT INTO posts (title, content, slug, board, user) VALUES (?, ?, ?, ?, ?)';
        $stmt = $this->getConnection()->prepare($sql);
        $slug = Slug::slugify($title);
        $stmt->bind_param('ssssi', $title, $content, $slug, $board, $user);
        return $stmt->execute();
    }

    public function updatePost(int $id, string $title, string $content): bool {
        $sql = 'UPDATE posts SET title = ?, content = ?, slug = ? WHERE id = ?';
        $stmt = $this->getConnection()->prepare($sql);
        $slug = Slug::slugify($title);
        $stmt->bind_param('sssi', $title, $content, $slug, $id);
        return $stmt->execute();
    }

    public function deletePost(int $id): bool {
        $sql = 'DELETE FROM posts WHERE id = ?';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bind_param('i', $id);
        return $stmt->execute();
    }

}

?>