<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;

class Feature extends Model
{
    use HasFactory;

    public const CAT_CSS = 'CSS';
    public const CAT_HTML5 = 'HTML5';
    public const CAT_JS = 'JS';
    public const CAT_JS_API = 'JS API';
    public const CAT_OTHER = 'Other';
    public const CAT_SECURITY = 'Security';
    public const CAT_SVG = 'SVG';

    /**
     * By default we only index / allow features with these statuses.
     *
     * @var array
     */
    public const ALLOWED_STATUS = [
        'ls',
        'cr',
        'other',
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
     * Returns all our categories
     *
     * @return array<int, string>
     */
    public static function getAllCategories(): array
    {
        return [
            self::CAT_CSS,
            self::CAT_HTML5,
            self::CAT_JS,
            self::CAT_JS_API,
            self::CAT_OTHER,
            self::CAT_SECURITY,
            self::CAT_SVG,
        ];
    }

    /**
     * Return all supported browsers for a given type.
     *
     * @param string $type
     * @return Collection<int, int>
     */
    public function getSupportedBrowsersByType(string $type): Collection
    {
        return $this->supported_browsers->filter(fn(Browser $browser) => $browser->type === $type)->pluck('id');
    }

    /**
     * Returns all unsupported browsers for a given type.
     *
     * @param string $type
     * @return Collection<int, int>
     */
    public function getUnsupportedBrowsersByType(string $type): Collection
    {
        return $this->unsupported_browsers->filter(fn(Browser $browser) => $browser->type === $type)->pluck('id');
    }

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
