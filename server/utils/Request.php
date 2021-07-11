<?php

require_once 'utils/Router.php';
require_once 'utils/Route.php';

class Request {

    private static $request;

    public $path;
    public $method;
    public $params;
    public $query;
    public $body;
    public $cookie;

    private function __construct(string $path, string $method, array $params, array $query, array $body) {
        $this->path = $path;
        $this->method = $method;
        $this->params = $params;
        $this->query = $query;
        $this->body = $body;
    }

    private static function getPath(array $parsedUri) {
        $path = '';
        if (isset($parsedUri['path'])) {
            $path = $parsedUri['path'];
        }
        return $path;
    }

    private static function getParams(string $path): array {
        $match = Router::getMatch($path);
        $params = [];
        if ($match instanceof Route) {
            preg_match_all('/:(\w+)/', $match->getPath(), $regMatchArr);
            preg_match($match->getPathRegex(), $path, $values);
            $keys = $regMatchArr[1];
            array_splice($values, 0, 1);
            foreach ($keys as $key => $keyName) {
                $params[$keyName] = $values[$key];
            }
        }
        return $params;
    }

    private static function getQuery(array $parsedUri): array {
        $query = [];
        if (isset($parsedUri['query'])) {
            $queries = explode('&', $parsedUri['query']);
            foreach ($queries as $q) {
                $q = explode('=', $q);
                $key = $q[0];
                $value = $q[1];
                $query[$key] = $value;
            }
        }
        return $query;
    }

    private static function getBody(): array {
        $body = json_decode(file_get_contents('php://input'), true);
        if (!$body) {
            return [];
        }
        return $body;
    }

    public static function getRequest() { 
        if (!isset(self::$request)) {
            // Get required fields for class instance
            $parsedUri = parse_url($_SERVER['REQUEST_URI']);
            $path = self::getPath($parsedUri);
            $method = strtoupper($_SERVER['REQUEST_METHOD']);
            $params = self::getParams($path);
            $query = self::getQuery($parsedUri);
            $body = self::getBody();

            self::$request = new Request($path, $method, $params, $query, $body);
        }
        return self::$request;
    }

    public function __toString() {
        return json_encode([
            'path' => $this->path,
            'method' => $this->method,
            'params' => $this->params,
            'query' => $this->query,
            'body' => $this->body
        ]);
    }

}

?>