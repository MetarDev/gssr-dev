<?php

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
        'CSS' => 'CSS',
        'CSS2' => 'CSS',
        'CSS3' => 'CSS',
        'Canvas' => 'HTML5',
        'HTML5' => 'HTML5',
        'JS' => 'JS',
        'JS API' => 'JS API',
        'PNG' => 'Other',
        'Other' => 'Other',
        'DOM' => 'Other',
        'Security' => 'Security',
        'SVG' => 'SVG',
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
        $features->each(function (array $rawFeature) {
            [$primaryCategory, $secondaryCategory] = $this->mapCategoriesToCategory($rawFeature['categories']);
            Feature::updateOrCreate(
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

        echo $browsers->count();

        // Foreach browser, update or create a new Browser model.
        DB::beginTransaction();
        $browsers->each(function (array $rawBrowser) {
            collect($rawBrowser['version_list'])->each(function (array $rawVersion) use ($rawBrowser) {
                $hash = Hasher::calculateUniqueBrowserHash($rawBrowser['browser'], $rawVersion['version'], $rawBrowser['type']);
                Browser::updateOrCreate(
                    [ 'hash' => $hash ],
                    [
                        'title' => $rawBrowser['browser'],
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
