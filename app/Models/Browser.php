<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;

class Browser extends Model
{
    use HasFactory;

    public const TYPE_DESKTOP = 'desktop';
    public const TYPE_MOBILE = 'mobile';

    public const ALLOWED_MOBILE_BROWSERS = [
        'ios_saf',
        'samsung',
    ];

    /**
     * Guarded properties that can't be saved over.
     *
     * @var array<string>
     */
    protected $guarded = ['id'];

    /**
     * Return all supported features for a given category.
     *
     * @param string $category
     * @return Collection<int, int>
     */
    public function getSupportedFeaturesByCategory(string $category): Collection
    {
        return $this->supported_features->filter(fn(Feature $feature) => $feature->primary_category === $category || $feature->secondary_category === $category)->pluck('id');
    }

    /**
     * Returns all unsupported features for a given category.
     *
     * @param string $category
     * @return Collection<int, int>
     */
    public function getUnsupportedFeaturesByCategory(string $category): Collection
    {
        return $this->unsupported_features->filter(fn(Feature $feature) => $feature->primary_category === $category || $feature->secondary_category === $category)->pluck('id');
    }

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
