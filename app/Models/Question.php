<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    public const TYPE_GLOBAL = 'usage_global';
    public const TYPE_FEATURE = 'feature_support';
    public const TYPE_BROWSER = 'browser_support';
    public const TYPE_CUSTOM = 'custom';

    public const SUPPORTED = 'supported';
    public const NOT_SUPPORTED = 'not_supported';

    /**
     * Guarded properties that can't be saved over.
     *
     * @var array<string>
     */
    protected $guarded = ['id'];

    /**
     * Casting some Model attributes
     *
     * @var array<string, string>
     */
    protected $casts = [
        'answers' => 'array',
    ];
}
