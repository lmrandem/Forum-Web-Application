<?php

require_once 'service/post.php';
require_once 'utils/Request.php';
require_once 'utils/Response.php';
require_once 'utils/ApiError.php';
require_once 'utils/Slug.php';

class PostController {

    private $postService;

    public function __construct() {
        $this->postService = new PostService();
    }

    public function list(Request $request, Response $response): Response {
        $posts = $this->postService->listPosts($request->query);
        return $response->status(200)->json(['success'=>true, 'data'=>$posts]);
    }

    public function get(Request $request, Response $response): Response {
        if (!isset($request->params['id'])) {
            return $response->status(400)->json(['success'=>false, 'message'=>'Missing identifier']);
        }
        $post = $this->postService->getPost($request->params['id']);
        if (!$post) {
            return $response->status(404)->json(['success'=>false, 'message'=>'Post not found']);
        }
        return $response->status(200)->json(['success'=>true, 'data'=>$post]);
    }

    public function create(Request $request, Response $response): Response {
        if (!isset($request->body['title']) || !isset($request->body['content'])) {
            return $response->status(400)->json(['success'=>false, 'message'=>'Missing input']);
        }
        $created = $this->postService->createPost($request->body['title'], $request->body['content'], $request->user['id']);
        if (!$created) {
            return $response->status(500)->json(['success'=>false, 'message'=>'Post not created']);
        }
        return $response->status(201)->json(['success'=>true, 'message'=>'Post created']);
    }

    public function update(Request $request, Response $response): Response {
        if (!isset($request->params['id']) || !isset($request->body['title']) || !isset($request->body['content'])) {
            return $response->status(400)->json(['success'=>false, 'message'=>'Missing input']);
        }
        $post = $this->postService->getPost($request->params['id']);
        if ($request->user['username'] !== $post['username']) {
            return $response->status(403)->json(['success'=>false, 'message'=>'Can\'t update this post']);
        }
        $updated = $this->postService->updatePost($request->params['id'], $request->body['title'], $request->body['content']);
        if (!$updated) {
            return $response->status(500)->json(['success'=>false, 'message'=>'Post not updated']);
        }
        return $response->status(200)->json(['success'=>true, 'message'=>'Post updated']);
    }

    public function delete(Request $request, Response $response): Response {
        if (!isset($request->params['id'])) {
            return $response->status(400)->json(['success'=>false, 'message'=>'Missing input']);
        }
        $post = $this->postService->getPost($request->params['id']);
        if ($request->user['username'] !== $post['username']) {
            return $response->status(403)->json(['success'=>false, 'message'=>'Can\'t delete this post']);
        }
        $deleted = $this->postService->deletePost($request->params['id']);
        if (!$deleted) {
            return $response->status(500)->json(['success'=>false, 'message'=>'Post not deleted']);
        }
        return $response->status(200)->json(['success'=>true, 'message'=>'Post deleted']);
    }

}

?>