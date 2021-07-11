<?php

require_once 'utils/Router.php';
require_once 'utils/Request.php';
require_once 'utils/Response.php';

class RequestHandler {

    public static function handleRequest(): void {
        $request = Request::getRequest();
        $response = Response::getResponse();

        $route = Router::getMatch($request->path);

        if (isset($route)) {
            $route->runAction($request, $response);
        }
        else if ($request->method !== 'OPTIONS') {
            $response->status(404);
        }
    }

}

?>