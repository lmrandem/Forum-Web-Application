<?php

header('Access-Control-Allow-Origin: http://forumwebapp:8081');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

require_once 'utils/RequestHandler.php';

require_once 'route/auth.php';
require_once 'route/user.php';
require_once 'route/post.php';
require_once 'route/board.php';
require_once 'route/subscription.php';

RequestHandler::handleRequest();

?>