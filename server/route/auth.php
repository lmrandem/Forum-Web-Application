<?php

require_once 'utils/Router.php';
require_once 'controller/user.php';
require_once 'middleware/AuthMiddleware.php';

$controller = new UserController();

$middleware = ['AuthMiddleware::isAuthenticated'];

Router::get('/me',  $middleware, [$controller, 'getCurrentUser']);
Router::post('/register', [], [$controller, 'register']);
Router::post('/login', [], [$controller, 'login']);
Router::post('/logout', $middleware, [$controller, 'logout']);

?>