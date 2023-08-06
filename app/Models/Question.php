<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    public const TYPE_GLOBAL = 'global';
    public const TYPE_FEATURE = 'feature';
    public const TYPE_BROWSER = 'browser';
    public const TYPE_CUSTOM = 'custom';

    /**
     * Casting some Model attributes
     *
     * @var array<string, string>
     */
    protected $casts = [
        'answers' => 'array',
    ];
}
