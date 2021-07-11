<?php

require_once 'utils/Request.php';
require_once 'utils/Response.php';

class Route {

    private $path;
    private $pathRegex;
    private $middleware;
    private $action;
    private $requestMethod;

    public function __construct(string $path, array $middleware, callable $action, string $requestMethod) {
        $this->path = $path;
        $this->pathRegex = $this->pathToRegex($path);
        $this->middleware = $middleware;
        $this->action = $action;
        $this->requestMethod = $requestMethod;
    }

    private function pathToRegex(string $path) {
        return '/^'.
            preg_replace('/\//', '\/', 
                preg_replace('/\/$/', '', 
                    preg_replace('/:\w+/', '([^/]+)', $path))).'(\/|)$/';
    }

    private function runMiddleware(Request &$request, Response $response): bool {
        foreach ($this->middleware as $mwFunc) {
            if (!is_callable($mwFunc)) {
                continue;
            }
            $hasPassed = call_user_func_array($mwFunc, [&$request, $response]);
            if (!is_bool($hasPassed) || !$hasPassed) {
                return false;
            }
        }
        return true;
    }

    public function runAction(Request $request, Response $response): void {
        if ($this->runMiddleware($request, $response)) {
            call_user_func_array($this->action, [$request, $response]);
        }
    }

    public function match(string $path, array &$outputArr = []): bool {
        if ($_SERVER['REQUEST_METHOD'] !== $this->requestMethod) {
            return false;
        }
        if (preg_match($this->pathRegex, $path, $matchArr) === 0) {
            return false;
        }
        $outputArr = $matchArr;
        return true;
    }

    public function getParams(string $path): array {
        preg_match_all('/:(\w+)/', $this->path, $regMatchArr);
        preg_match($this->pathRegex, $path, $values);
        $keys = $regMatchArr[1];
        array_splice($values, 0, 1);
        $params = [];
        foreach ($keys as $key => $keyName) {
            $params[$keyName] = $values[$key];
        }
        return $params;
    }

    public function getPath(): string {
        return $this->path;
    }

    public function getPathRegex(): string {
        return $this->pathRegex;
    }

}

?>