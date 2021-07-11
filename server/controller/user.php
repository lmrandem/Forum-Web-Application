<?php

require_once 'service/user.php';
require_once 'utils/Request.php';
require_once 'utils/Response.php';
require_once 'service/jwtBlacklist.php';
require_once 'utils/Jwt.php';

class UserController {

    private $userService;
    private $blacklistService;

    public function __construct() {
        $this->userService = new UserService();
        $this->blacklistService = new JwtBlacklistService();
    }

    public function get(Request $request, Response $response): Response {
        if (!isset($request->params['username'])) {
            return $response->status(400)->json(['success'=>false, 'message'=>'Missing input']);
        }
        $user = $this->userService->getUserByUsername($request->params['username'], false);
        if (!$user) {
            return $response->status(404)->json(['success'=>false, 'message'=>'User not found']);
        }
        return $response->status(200)->json(['success'=>true, 'data'=>$user]);
    }

    public function getCurrentUser(Request $request, Response $response): Response {
        return $response->status(200)->json(['success'=>true, 'data'=>$request->user]);
    }

    public function register(Request $request, Response $response): Response {
        if (!isset($request->body['username']) || !isset($request->body['name']) || 
            !isset($request->body['email']) || !isset($request->body['password'])) {
            return $response->status(400)->json(['success'=>false, 'message'=>'Missing input']);
        }
        $username = $request->body['username'];
        $name = $request->body['name'];
        $email = $request->body['email'];
        $hashed_password = password_hash($request->body['password'], PASSWORD_ARGON2ID);
        
        $registered = $this->userService->createUser($username, $name, $email, $hashed_password);
        if (!$registered) {
            return $response->status(500)->json(['success'=>false, 'message'=>'User not created']);
        }
        $user = $this->userService->getUserByEmail($email, false);
        return JWT::sendToken($user, $response);
    }

    public function login(Request $request, Response $response): Response {
        if (!isset($request->body['email']) || !isset($request->body['password'])) {
            return $response->status(400)->json(['success'=>false, 'message'=>'Missing input']);
        }
        $email = $request->body['email'];
        $password = $request->body['password'];

        $user = $this->userService->getUserByEmail($email, true);
        if (!$user) {
            return $response->status(500)->json(['success'=>false, 'message'=>'Missing input']);
        }
        if (!password_verify($password, $user['password'])) {
            return $response->status(400)->json(['success'=>false, 'message'=>'Wrong credentials']);
        }
        return JWT::sendToken($user, $response);
    }

    public function logout(Request $request, Response $response): Response {
        $token = $_COOKIE['token'];
        $expires = json_decode(base64_decode(explode('.', $token)[1]))->exp;
        $this->blacklistService->blacklist($token, date("Y-m-d H:i:s", $expires));
        return $response->
            cookie('token', '', ['expires'=>time(), 'httpOnly'=>true])->
            status(200)->
            json(['success'=>true, 'message'=>'Signed out']);
    }

}

?>