<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Request as FacadesRequest;

class Images
{
    /**
     * Generates the full URL to the image.
     *
     * @param string $path
     * @return string
     */
    public static function resolve(string $path): string
    {
        return config('app.url') . "/img/$path";
    }
}
