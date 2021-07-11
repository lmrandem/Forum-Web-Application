<?php

class Http {

    private $status = 200;

    public function cookie(string $name, $value, array $options): self {
        setcookie($name, json_encode($value), $options);
        return $this;
    }

    public function status(int $status): self {
        $this->status = $status;
        return $this;
    }

    public function json($response): void {
        header("Content-Type: application/json; charset=UTF-8");
        http_response_code($this->status);
        echo json_encode($response);
    }

}

?>