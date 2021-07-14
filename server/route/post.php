<?php

require_once 'utils/Router.php';
require_once 'controller/post.php';
require_once 'middleware/AuthMiddleware.php';

$apiPath = '/posts';

$controller = new PostController();

$middleware = ["AuthMiddleware::isAuthenticated"];

Router::get($apiPath.'/',  [], [$controller, 'list']);
Router::get($apiPath.'/subscribed', $middleware, [$controller, 'listSubscribed']);
Router::get($apiPath.'/:id', [], [$controller, 'get']);
Router::post($apiPath.'/', $middleware, [$controller, 'create']);
Router::put($apiPath.'/:id', $middleware, [$controller, 'update']);
Router::delete($apiPath.'/:id', $middleware, [$controller, 'delete']);

?>