<?php

namespace App\Helpers;

class Hasher
{
    /**
     * Compute the unique hash for a browser.
     *
     * @return string
     */
    public static function calculateUniqueBrowserHash(string $name, string $version, string $type): string
    {
        return md5($name . $version . $type);
    }
}
