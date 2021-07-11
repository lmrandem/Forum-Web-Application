<?php

require_once 'utils/Router.php';
require_once 'controller/user.php';
require_once 'middleware/AuthMiddleware.php';

$apiPath = '/users';

$controller = new UserController();

Router::get($apiPath.'/:username', [], [$controller, 'get']);
// Router::get($apiPath.'/:username/boards', ["AuthMiddleware::isAuthentiated"], [$controller, 'listBoards']);
// Router::get($apiPath.'/:username/boards/:name', ["AuthMiddleware::isAuthentiated"], [$controller, 'getBoards']);

?>