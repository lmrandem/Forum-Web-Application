<?php

require_once 'utils/Router.php';
require_once 'controller/subscription.php';
require_once 'middleware/AuthMiddleware.php';

$apiPath = '/subscriptions';

$controller = new SubscriptionController();

$middleware = ["AuthMiddleware::isAuthenticated"];

Router::get($apiPath.'/',  $middleware, [$controller, 'list']);
Router::get($apiPath.'/:board', $middleware, [$controller, 'get']);
Router::put($apiPath.'/:board', $middleware, [$controller, 'subscribe']);
Router::delete($apiPath.'/:board', $middleware, [$controller, 'unsubscribe']);

?>