<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
        'links' => 'array',
    ];

    /**
     * All browsers that support this feature
     */
    public function supported_browsers(): BelongsToMany
    {
        return $this->belongsToMany(Browser::class, 'browser_supported_features', 'feature_id', 'browser_id');
    }

    /**
     * All browsers that do not support this feature
     */
    public function unsupported_browsers(): BelongsToMany
    {
        return $this->belongsToMany(Browser::class, 'browser_unsupported_features', 'feature_id', 'browser_id');
    }
}
