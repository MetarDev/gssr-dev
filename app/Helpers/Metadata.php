<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Request as FacadesRequest;

class Metadata
{

    /**
     * Generates the page metadata.
     *
     * @param array $metadata
     * @param string $metadata.title
     * @param string $metadata.description
     * @param string $metadata.image
     * @param string $metadata.url
     * @return array
     */
    public static function generatePageMetadata(array $metadata): array
    {
        return [
            'title' => $metadata['title'] ?? '',
            'description' => $metadata['description'] ?? '',
            'image' => $metadata['image'] ?? self::getDefaultImage(),
            'url' => FacadesRequest::url(),
        ];
    }

    /**
     * Get the default image.
     *
     * @return string
     */
    public static function getDefaultImage(): string
    {
        return Images::resolve('default-1200x630.png');
    }
}
