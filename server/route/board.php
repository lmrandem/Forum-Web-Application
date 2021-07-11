<?php

require_once 'utils/Router.php';
require_once 'controller/board.php';
require_once 'middleware/AuthMiddleware.php';

$apiPath = '/boards';

$controller = new BoardController();

$middleware = ["AuthMiddleware::isAuthenticated"];

Router::get($apiPath.'/', [], [$controller, 'list']);
Router::get($apiPath.'/:name', [], [$controller, 'get']);
Router::post($apiPath.'/', $middleware, [$controller, 'create']);

?>