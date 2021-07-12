<?php

require_once 'service/comment.php';
require_once 'service/post.php';

class CommentController {

    private $commentService;
    private $postService;

    public function __construct() {
        $this->commentService = new CommentService();
        $this->postService = new PostService();
    }

    public function list(Request $request, Response $response): Response {
        $comments = $this->commentService->listComments();
        return $response->status(200)->json(['success'=>true, 'data'=>$comments]);
    }

    public function get(Request $request, Response $response): Response {
        if (!isset($request->params['id'])) {
            return $response->status(400)->json(['success'=>false, 'message'=>'Missing identifier']);
        }
        $comment = $this->commentService->getComment($request->params['id']);
        if (!$comment) {
            return $response->status(404)->json(['success'=>false, 'message'=>'Comment not found']);
        }
        return $response->status(200)->json(['success'=>true, 'data'=>$comment]);
    }

    public function create(Request $request, Response $response): Response {
        if (!isset($request->body['comment']) || !isset($request->body['post'])) {
            return $response->status(400)->json(['success'=>false, 'message'=>'Missing input']);
        }
        $comment = $request->body['comment'];
        $user = $request->user['id'];
        $post = $request->body['post'];
        $parent = null;
        if (isset($request->body['parentId'])) {
            $parent = $request->body['parentId'];
            $parentExist = $this->commentService->getComment($parent);
            if (!$parentExist) {
                return $response->status(404)->json(['success'=>false, 'message'=>'Parent comment not found']);
            }
            if ($parentExist['post'] != $post) {
                return $response->status(400)->json(['success'=>false, 'message'=>'Parent comment does not belong to provided post']);
            }
        }
        $postExist = $this->postService->getPost($post);
        if (!$postExist) {
            return $response->status(404)->json(['success'=>false, 'message'=>'Post not found']);
        }
        $comment = $this->commentService->createComment($comment, $user, $post, $parent);
        if (!$comment) {
            return $response->status(500)->json(['success'=>false, 'message'=>'Something went wrong']);
        }
        return $response->status(201)->json(['success'=>true, 'message'=>'Post created']);
    }

}

?>