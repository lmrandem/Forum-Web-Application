<?php

class Response {

    private static $response;

    private function __construct() {

    }

    public function cookie(string $name, string $value, array $options): self {
        // header('Set-Cookie: token='.$value.'; EXPIRES='.$options['expires'].'; SameSite=Lax;');
        setcookie($name, $value, $options);
        return $this;
    }

    public function status(int $status = 200): self {
        // $this->status = $status;
        http_response_code($status);
        return $this;
    }

    public function json(array $message): self {
        header("Content-Type: application/json; charset=UTF-8");
        echo json_encode($message);
        return $this;
    }

    public static function getResponse(): self {
        if (!isset(self::$response)) {
            self::$response = new Response();
        }
        return self::$response;
    }

}

?>