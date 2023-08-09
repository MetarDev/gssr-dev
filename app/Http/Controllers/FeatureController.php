<?php

namespace App\Http\Controllers;

use App\Models\Browser;
use App\Models\Feature;
use Illuminate\Support\Collection;

class FeatureController extends Controller
{
    /**
     * Returns the features that are supported by the given browser.
     *
     * @return Collection
     */
    public function getSupportedFeatures(Browser $browser): Collection
    {
        return collect([]);
    }

    /**
     * Returns the features that are NOT supported by the given browser.
     *
     * @return Collection
     */
    public function getUnsupportedFeatures(Browser $browser): Collection
    {
        return collect([]);
    }

    /**
     * Returns all possible combinations for features of the same category that are not the given feature.
     * For now we assume all quizzes have 4 answers total.
     *
     * @param Feature $feature
     * @param Collection $otherFeatures Other features that are the opposite support of $feature
     * @return Collection
     */
    public function getAllIncorrectAnswerCombinations(Feature $feature, Collection $otherFeatures): Collection
    {
        $sameCategoryFeatures = $otherFeatures->filter(fn(Feature $otherFeature) => $this->isSameCategory($feature, $otherFeature));
        return $sameCategoryFeatures->combinations(3);
    }

    /**
     * Check if the Feature's primary_category or secondary_category is the same as either the other Feature's
     * primary_category or secondary_category. Make sure to ignore secondary categories if they are null.
     *
     * @param Feature $feature
     * @param Feature $otherFeature
     * @return boolean
     */
    private function isSameCategory(Feature $feature, Feature $otherFeature): bool
    {
        return $feature->primary_category === $otherFeature->primary_category
            || ($otherFeature->secondary_category && $feature->primary_category === $otherFeature->secondary_category)
            || ($feature->secondary_category && $feature->secondary_category === $otherFeature->primary_category)
            || ($feature->secondary_category && $otherFeature->secondary_category && $feature->secondary_category === $otherFeature->secondary_category);
    }
}
