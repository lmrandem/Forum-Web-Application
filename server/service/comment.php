<?php

require_once 'utils/AbstractService.php';

class CommentService extends AbstractService {

    public function listComments(): ?array {
        return null;
    }

    public function getComment(int $id): ?array {
        return null;
    }

    public function createComment(string $comment, int $user, int $post, ?int $parent): bool {
        return null;
    }

}

?>