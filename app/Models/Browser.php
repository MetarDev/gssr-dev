<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Browser extends Model
{
    use HasFactory;

    public const TYPE_DESKTOP = 'desktop';
    public const TYPE_MOBILE = 'mobile';

    /**
     * Guarded properties that can't be saved over.
     *
     * @var array<string>
     */
    protected $guarded = ['id'];

    /**
     * The roles that belong to the user.
     */
    public function supported_features(): BelongsToMany
    {
        return $this->belongsToMany(Feature::class, 'browser_supported_features', 'browser_id', 'feature_id');
    }

    /**
     * The roles that belong to the user.
     */
    public function unsupported_features(): BelongsToMany
    {
        return $this->belongsToMany(Feature::class, 'browser_unsupported_features', 'browser_id', 'feature_id');
    }
}
