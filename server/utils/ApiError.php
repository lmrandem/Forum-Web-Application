<?php

class ApiError {

    public function __construct($message, $statusCode) {
        $http = new Http();
        $http->status($statusCode)->json(array('success'=>false, 'message'=>$message));
    }

}

?>