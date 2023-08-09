<?php
declare(strict_types=1);

namespace App\Logic;

use App\Models\Browser;
use App\Models\Feature;
use App\Helpers\Hasher;
use Illuminate\Support\Facades\DB;

/**
 * Class for processing CanIUse data and storing it in our DB.
 */
class CanIUseApi
{
    private $categoriesMapping = [
        'CSS' => Feature::CAT_CSS,
        'CSS2' => Feature::CAT_CSS,
        'CSS3' => Feature::CAT_CSS,
        'Canvas' => Feature::CAT_HTML5,
        'HTML5' => Feature::CAT_HTML5,
        'JS' => Feature::CAT_JS,
        'JS API' => Feature::CAT_JS_API,
        'PNG' => Feature::CAT_OTHER,
        'Other' => Feature::CAT_OTHER,
        'DOM' => Feature::CAT_OTHER,
        'Security' => Feature::CAT_SECURITY,
        'SVG' => Feature::CAT_SVG,
    ];

    /**
     * Imports all features from CanIUse.
     *
     * @return void
     */
    public function importFeatures()
    {
        // Read the JSON file
        $rawFeatures = $this->readData('data');

        // Filter out features of unwanted status
        $features = collect($rawFeatures)->filter(
            fn(array $feature) => in_array($feature['status'] ?? 'invalid-status', Feature::ALLOWED_STATUS, true)
        );

        // Foreach feature, update or create a new Feature model.
        DB::beginTransaction();
        $allBrowsers = Browser::get()->map(fn(Browser $browser) => $browser->only(['id', 'key', 'version']));
        $features->each(function (array $rawFeature) use ($allBrowsers) {
            [$primaryCategory, $secondaryCategory] = $this->mapCategoriesToCategory($rawFeature['categories']);
            $feature = Feature::updateOrCreate(
                [ 'title' => $rawFeature['title'] ],
                [
                    'title' => $rawFeature['title'],
                    'description' => $rawFeature['description'],
                    'primary_category' => $primaryCategory,
                    'secondary_category' => $secondaryCategory,
                    'status' => $rawFeature['status'],
                    'spec' => $rawFeature['spec'],
                    'usage_global' => (float) $rawFeature['usage_perc_y'] ?? 0 + (float) $rawFeature['usage_perc_a'] ?? 0,
                    'links' => collect($rawFeature['links'])->map(fn(array $link) => $link['url'] ?? '')->toArray(),
                ]
            );

            // Go through all browsers and attach them to the feature if supported (which we check on the caniuse data)
            $supportedBrowserIds = [];
            $unsupportedBrowserIds = [];
            $allBrowsersIds = collect($allBrowsers)->pluck('id')->toArray();

            $allBrowsers->each(
                function ($browser) use ($rawFeature, &$supportedBrowserIds, &$unsupportedBrowserIds) {
                    if (isset($rawFeature['stats'][ $browser['key'] ][ $browser['version'] ])
                        && $rawFeature['stats'][ $browser['key'] ][ $browser['version'] ] === 'y'
                    ) {
                        $supportedBrowserIds[] = $browser['id'];
                    } else {
                        $unsupportedBrowserIds[] = $browser['id'];
                    }
                }
            );

            $feature->supported_browsers()->detach($allBrowsersIds);
            $feature->unsupported_browsers()->detach($allBrowsersIds);

            $feature->supported_browsers()->attach($supportedBrowserIds);
            $feature->unsupported_browsers()->attach($unsupportedBrowserIds);
        });

        DB::commit();
    }

    /**
     * Imports all browsers from CanIUse.
     *
     * @return void
     */
    public function importBrowsers()
    {
        // Read the JSON file
        $browsers = collect($this->readData('agents'));

        // Foreach browser, update or create a new Browser model.
        DB::beginTransaction();
        $browsers->each(function (array $rawBrowser, string $key) {
            collect($rawBrowser['version_list'])->each(function (array $rawVersion) use ($rawBrowser, $key) {
                $hash = Hasher::calculateUniqueBrowserHash($rawBrowser['browser'], $rawVersion['version'], $rawBrowser['type']);
                Browser::updateOrCreate(
                    [ 'hash' => $hash ],
                    [
                        'title' => $rawBrowser['browser'],
                        'key' => $key,
                        'long_name' => $rawBrowser['long_name'],
                        'abbr' => $rawBrowser['abbr'],
                        'prefix' => $rawBrowser['prefix'],
                        'version' => $rawVersion['version'],
                        'type' => $rawBrowser['type'],
                        'hash' => $hash,
                        'usage_global' => (float) $rawVersion['global_usage'],
                    ]
                );
            });
        });

        DB::commit();
    }

    /**
     * Maps the given categories to a main category.
     *
     * @return array<int, string>
     */
    private function mapCategoriesToCategory(array $categories): array
    {
        $generalCategories = [];
        foreach ($categories as $category) {
            if (!isset($category, $this->categoriesMapping[$category])) {
                continue;
            }

            $generalCategories[] = $this->categoriesMapping[$category];
        }

        return [
            $generalCategories[0],
            $generalCategories[1] ?? null,
            // We only support primary and secondary category as all features (at the time of writing this)ž
            // only have 2
        ];
    }

    /**
     * Reads the CanIUse data file and returns the data array.
     *
     * @param string $key "data" (features) or "agents" (for browsers).
     * @return array
     */
    private function readData(string $key): array
    {
        return json_decode(file_get_contents($this->getDataPath()), true)[ $key ];
    }

    /**
     * Returns the path to the CanIUse data file.
     *
     * @return string
     */
    private function getDataPath(): string
    {
        return base_path() .
            DIRECTORY_SEPARATOR .
            'node_modules' .
            DIRECTORY_SEPARATOR .
            'caniuse-db' .
            DIRECTORY_SEPARATOR .
            'fulldata-json' .
            DIRECTORY_SEPARATOR .
            'data-2.0.json';
    }
}
