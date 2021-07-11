<?php

require_once 'service/board.php';
require_once 'service/subscription.php';
require_once 'utils/Request.php';
require_once 'utils/Response.php';
require_once 'utils/ApiError.php';

class BoardController {

    private $boardService;

    public function __construct() {
        $this->boardService = new BoardService();
        $this->subscriptionService = new SubscriptionService();
    }

    public function list(Request $request, Response $response): Response {
        $boards = $this->boardService->listBoards();
        return $response->status(200)->json(['success'=>true, 'data'=>$boards]);
    }

    public function get(Request $request, Response $response): Response {
        $group = $this->boardService->getBoard($request->params['name']);
        if (!$group) {
            return $response->status(404)->json(['success'=>false, 'message'=>'Board not found']);
        }
        return $response->status(200)->json(['success'=>true, 'data'=>$group]);
    }

    public function create(Request $request, Response $response): Response {
        if (!isset($request->body['name']) 
            || !isset($request->body['title']) 
            || !isset($request->body['description'])) {
            return $response->status(400)->json(['success'=>false, 'message'=>'Missing input']);
        }
        $board = $this->boardService->getBoard($request->body['title']);
        if ($board) {
            return $response->status(400)->json(['success'=>false, 'message'=>'Board already exists']);
        }
        $board = $this->boardService->createBoard($request->body['title']);
        if (!$board) {
            return $response->status(500)->json(['success'=>false, 'message'=>'Board not created']);
        }
        return $response->status(201)->json(['success'=>true, 'message'=>'Board created']);
    }

}

?>