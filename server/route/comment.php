<?php

require_once 'utils/Router.php';
require_once 'controller/comment.php';
require_once 'middleware/AuthMiddleware.php';

$apiPath = '/comments';

$controller = new CommentController();

$middleware = ["AuthMiddleware::isAuthenticated"];

Router::get($apiPath.'/', [], [$controller, 'list']);
Router::get($apiPath.'/:id', [], [$controller, 'get']);
Router::post($apiPath.'/', $middleware, [$controller, 'create']);

?>