<?php

abstract class AbstractService {

    private $conn;

    public function __construct() {
        $this->conn = new mysqli('localhost', 'root', '', 'smallwebapp');
        if ($this->conn->connect_error) {
            // die('Connection failed' . $this->conn->connect_error);
        }
    }

    public function getConnection() {
        return $this->conn;
    }

}

?>