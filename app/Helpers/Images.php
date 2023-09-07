<?php

namespace App\Helpers;

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
        $hash = env('IMAGE_HASH');
        \Illuminate\Support\Facades\Log::info(print_r($hash, true));
        return config('app.url') . "/img/$path?hash=$hash";
    }
}
