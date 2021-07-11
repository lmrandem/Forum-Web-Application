<?php

require_once 'utils/Response.php';

class JWT {

    const SECRET = '22ab6710bd701cb31e4e0798a7409838f1c6dc7bbb8aad4ef587af32e4396591';

    private static function base64UrlEncode($text): string {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($text));
    }

    public static function createToken($payload): string {
        $header = json_encode([
            'typ' => 'JWT',
            'alg' => 'HS256'
        ]);

        $base64UrlHeader = self::base64UrlEncode($header);
        $base64UrlPayload = self::base64UrlEncode($payload);

        $signature = hash_hmac('sha256', $base64UrlHeader.'.'.$base64UrlPayload, self::SECRET, true);
        $base64UrlSignature = self::base64UrlEncode($signature);

        return $base64UrlHeader.'.'.$base64UrlPayload.'.'.$base64UrlSignature;
    }

    public static function validateToken($jwt): bool {
        $parts = explode('.', $jwt);
        $header = base64_decode($parts[0]);
        $payload = base64_decode($parts[1]);
        $providedSignature = $parts[2];

        $expiration = json_decode($payload)->exp;
        $isExpired = ($expiration <= time());

        $base64UrlHeader = self::base64UrlEncode($header);
        $base64UrlPayload = self::base64UrlEncode($payload);
        $signature = hash_hmac('sha256', $base64UrlHeader.'.'.$base64UrlPayload, self::SECRET, true);
        $base64UrlSignature = self::base64UrlEncode($signature);

        $isValidSignature = ($providedSignature === $base64UrlSignature);

        return ($isValidSignature && !$isExpired);
    }

    public static function sendToken(array $user, Response $response): Response {
        $token = self::createToken(json_encode([
            'id' => $user['id'],
            'exp' => time() + 24 * 60 * 60
        ]));
        $options = [
            'expires' => time() + 24 * 60 * 60,
            'httpOnly' => true,
            'sameSite' => 'false',
            'path' => '/'
        ];
        return $response->
            status(200)->
            cookie('token', $token, $options)->
            json([
                'success' => true, 
                'token' => $token, 
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email']
                ]
            ]);
    }

}

?>