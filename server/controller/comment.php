<?php

require_once 'service/comment.php';

class CommentController {

    private $commentService;

    public function __construct() {
        $this->commentService = new CommentService();
    }

    public function list(Request $request, Response $response): Response {
        return $response;
    }

    public function get(Request $request, Response $response): Response {
        return $response;
    }

    public function create(Request $request, Response $response): Response {
        return $response;
    }

}

?>