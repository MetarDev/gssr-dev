<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Browser;
use App\Models\Feature;
use Illuminate\Support\Collection;

class FeatureController extends Controller
{
    /**
     * Returns all possible combinations for features so that the resulting array has 3 elements in set.
     *
     * Assuming the input is array with 5 elements: [1, 2, 3, 4, 5] as input, we want to return:
     * [
     *   [ 1, 2, 3 ]
     *   [ 1, 2, 4 ]
     *   [ 1, 2, 5 ]
     *   [ 1, 3, 4 ]
     *   [ 1, 3, 5 ]
     *   [ 1, 4, 5 ]
     *   [ 2, 3, 4 ]
     *   [ 2, 3, 5 ]
     *   [ 2, 4, 5 ]
     *   [ 3, 4, 5 ]
     * ]
     *
     * @param array<int, int> $featuresIds Feature IDs for which we want to create combinations
     * @return array<array<int, int>>
     */
    public function getAllIncorrectAnswerCombinations(array $featureIds, int $howManyPerSet = 3): array
    {
        $combinations = [];
        $this->generateCombinations($featureIds, $howManyPerSet, 0, [], $combinations);
        return $combinations;
    }

    /**
     * Generates combinations for a given input array.
     *
     * @param Browser $browser
     * @return array
     */
    private function generateCombinations(array $input, int $size, int $currentIndex, array $currentCombination, array &$combinations)
    {
        if ($size === 0) {
            $combinations[] = $currentCombination;
            return;
        }

        $remaining = count($input) - $currentIndex;

        if ($remaining < $size) {
            return; // Not enough elements remaining to form a valid combination
        }

        // Include the current element in the combination
        $currentCombination[] = $input[$currentIndex];
        $this->generateCombinations($input, $size - 1, $currentIndex + 1, $currentCombination, $combinations);

        // Exclude the current element from the combination
        array_pop($currentCombination);
        $this->generateCombinations($input, $size, $currentIndex + 1, $currentCombination, $combinations);
    }

    /**
     * Check if the Feature's primary_category or secondary_category is the same as either the other Feature's
     * primary_category or secondary_category. Make sure to ignore secondary categories if they are null.
     *
     * @param Feature $feature
     * @param Feature $otherFeature
     * @return boolean
     */
    public function isSameCategory(Feature $feature, Feature $otherFeature): bool
    {
        return $feature->primary_category === $otherFeature->primary_category
            || ($otherFeature->secondary_category && $feature->primary_category === $otherFeature->secondary_category)
            || ($feature->secondary_category && $feature->secondary_category === $otherFeature->primary_category)
            || ($feature->secondary_category && $otherFeature->secondary_category && $feature->secondary_category === $otherFeature->secondary_category);
    }
}
