<?php

require_once 'utils/Route.php';
require_once 'utils/Request.php';
require_once 'utils/Response.php';

class Router {

    private static $routes = [];
    private static $match = null;

    private static function getRequestBody(): array {
        $body = json_decode(file_get_contents('php://input'), true);
        if (!$body) {
            return [];
        }
        return $body;
    }

    /*
    private static function pathToRegex(string $path): string {
        $regex = '/^'.preg_replace('/\//', '\/', preg_replace('/\/$/', '', preg_replace('/:\w+/', '([^/]+)', $path))).'(\/|)$/';
        echo 'test';
        echo $regex;
        return $regex;
    }
    */

    public static function getMatch(string $path): ?Route {
        if (!isset(self::$match)) {
            foreach (self::$routes as $route) {
                if ($route->match($path)) {
                    self::$match = $route;
                    break;
                }
            }
        }
        return self::$match;
    }

    public static function get(string $route, array $middleware, callable $action): void {
        self::$routes[] = new Route($route, $middleware, $action, 'GET');
    }

    public static function post(string $route, array $middleware, callable $action): void {
        self::$routes[] = new Route($route, $middleware, $action, 'POST');
    }

    public static function put(string $route, array $middleware, callable $action): void {
        self::$routes[] = new Route($route, $middleware, $action, 'PUT');
    }

    public static function patch(string $route, array $middleware, callable $action): void {
        self::$routes[] = new Route($route, $middleware, $action, 'PATCH');
    }

    public static function delete(string $route, array $middleware, callable $action): void {
        self::$routes[] = new Route($route, $middleware, $action, 'DELETE');
    }

}

?>