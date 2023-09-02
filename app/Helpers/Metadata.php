<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Request as FacadesRequest;

class Metadata
{
    public static function generatePageMetadata(array $metadata): array
    {
        return [
            'title' => $metadata['title'] ?? '',
            'description' => $metadata['description'] ?? '',
            'image' => $metadata['image'] ?? '',
            'url' => FacadesRequest::url(),
        ];
    }
}
