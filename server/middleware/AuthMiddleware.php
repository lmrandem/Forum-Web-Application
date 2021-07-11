<?php

require_once 'utils/Jwt.php';
require_once 'utils/Request.php';
require_once 'service/jwtBlacklist.php';
require_once 'service/post.php';
require_once 'service/user.php';

class AuthMiddleware {

    public static function isAuthenticated(Request &$request, Response $response): bool {
        if (!isset($_COOKIE['token'])) {
            $response->status(401)->json(['success'=>false, 'message'=>'Not logged in']);
            return false;
        }
        $token = $_COOKIE['token'];

        $blacklistService = new JwtBlacklistService();
        $userService = new UserService();

        $isBlacklisted = $blacklistService->isBlacklisted($token);

        if ($isBlacklisted || !JWT::validateToken($token)) {
            $response->
                cookie('token', '', ['expires'=>time(), 'httpOnly'=>true])->
                status(401)->
                json(['success'=>false, 'message'=>'Invalid token']);
            return false;
        }

        $decoded = json_decode(base64_decode(explode('.', $token)[1]));
        $user = $userService->getUserById($decoded->id);

        if (!$user) {
            $response->status(404)->json(['success'=>false, 'message'=>'User not found']);
            return false;
        }

        $request->{'user'} = $user;
        return true;
    }

    public static function isNotAuthenticated(Request &$request, Response $response): bool {
        if (isset($_COOKIE['token'])) {
            $response->status(403)->json(['success'=>false, 'message'=>'Already logged in']);
            return false;
        }
        return true;
    }

}

?>