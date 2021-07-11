<?php

class Slug {

    public static function slugify(string $str) {
        $str = iconv('utf-8', 'ascii//TRANSLIT', $str);
        $str = strtolower($str);
        $str = preg_replace('/[^0-9a-z ]/i', '', $str);
        $str = preg_replace('/( ){2,}/', ' ', $str);
        $str = str_replace(' ', '-', $str);

        if (strlen($str) > 50) {
            $str = str_split($str, 50)[0];
        }
        return trim($str, '-');
    }

}

?>