<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    use HasFactory;

    /**
     * By default we only index / allow features with these statuses.
     *
     * @var array
     */
    public const ALLOWED_STATUS = [
        'ls',
		'cr',
    ];

    /**
     * Casting some Model attributes
     *
     * @var array<string, string>
     */
    protected $casts = [
        'links' => 'array',
    ];
}
