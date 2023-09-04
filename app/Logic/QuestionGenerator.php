<?php
declare(strict_types=1);

namespace App\Logic;

use App\Helpers\Hasher;
use App\Http\Controllers\BrowserController;
use App\Http\Controllers\FeatureController;
use App\Models\Feature;
use App\Models\Question;
use Illuminate\Support\Collection;

class QuestionGenerator
{
    public const MAX_GENERATE_QUESTIONS_LOOP = 100;

    /**
     * Browser controller.
     *
     * @var BrowserController
     */
    private BrowserController $browserController;

    /**
     * Feature controller.
     *
     * @var FeatureController
     */
    private FeatureController $featureController;

    /**
     * Relevant features.
     *
     * @var Collection
     */
    private $relevantFeatures;

    /**
     * Used browsers.
     *
     * @var Collection
     */
    private $usedBrowsers;

    /**
     * Constructor.
     *
     * @param BrowserController $browserController
     * @param FeatureController $featureController
     */
    public function __construct(BrowserController $browserController, FeatureController $featureController)
    {
        $this->browserController = $browserController;
        $this->featureController = $featureController;
        $this->relevantFeatures = collect([]);
        $this->usedBrowsers = collect([]);
    }

    /**
     * Creates a single feature support question.
     *
     * @param string $category
     * @param string $supports
     * @return Question|null
     */
    public function generateFeatureSupportQuestion(string $category, string $supports, int $answerCount): Question|null
    {
        $counter = 0;
        do {
            $browser = $this->getAllUsedBrowsers()->random();
            $supportedFeatureIds = $browser->getSupportedFeaturesByCategory($category);
            $unsupportedFeatureIds = $browser->getUnsupportedFeaturesByCategory($category);

            if ($counter > self::MAX_GENERATE_QUESTIONS_LOOP) {
                return null;
            }
            $counter++;
        } while (!$this->hasEnoughAnswers($supports, $supportedFeatureIds->count(), $unsupportedFeatureIds->count(), $answerCount));

        // Probably needs a better method for generating questions but let's go with random for now.
        $correctAnswerId = $supports === Question::SUPPORTED ? $supportedFeatureIds->random() : $unsupportedFeatureIds->random();
        $incorrectAnswers = $supports === Question::SUPPORTED ? $unsupportedFeatureIds->random($answerCount - 1)->toArray() : $supportedFeatureIds->random($answerCount - 1)->toArray();

        $question = $this->generateQuestion(
            Question::TYPE_FEATURE,
            $supports,
            $category,
            $incorrectAnswers,
            $correctAnswerId,
            $browser->id
        );

        unset($browser);
        unset($supportedFeatureIds);
        unset($unsupportedFeatureIds);
        unset($incorrectAnswers);
        return $question;
    }

    /**
     * Creates a single browser support question.
     *
     * @param string $browserType
     * @param string $supports
     * @return Question|null
     */
    public function generateBrowserSupportQuestion(string $browserType, string $supports, int $answerCount): mixed
    {
        $counter = 0;
        do {
            $incorrectAnswersByBrowser = collect([]);
            $feature = $this->getAllRelevantFeatures()->random();
            $supportedBrowsers = $feature->getSupportedBrowsersByType($browserType);
            $unsupportedBrowsers = $feature->getUnsupportedBrowsersByType($browserType);

            if ($counter > self::MAX_GENERATE_QUESTIONS_LOOP) {
                return null;
            }

            // Continue of not enough answers
            if (($supports === Question::SUPPORTED && $supportedBrowsers->count() === 0) ||
                ($supports !== Question::SUPPORTED && $unsupportedBrowsers->count() === 0)
            ) {
                $counter++;
                continue;
            }

            // Probably needs a better method for generating questions but let's go with random for now.
            $correctAnswer = $supports === Question::SUPPORTED ? $supportedBrowsers->random() : $unsupportedBrowsers->random();

            // Group the incorrect answers by browser so we can make sure we don't have duplicate browsers in answers
            $incorrectAnswersByBrowser = $supports === Question::SUPPORTED ?
                $unsupportedBrowsers->filter(fn($browser) => $browser->abbr !== $correctAnswer->abbr)->groupBy('abbr') :
                $supportedBrowsers->filter(fn($browser) => $browser->abbr !== $correctAnswer->abbr)->groupBy('abbr');

            $counter++;
        } while (!$this->hasEnoughIncorrectGroups($incorrectAnswersByBrowser->count(), $answerCount));

        // Get incorrect answers by making sure each answer is a different browser.
        $incorrectAnswers = $incorrectAnswersByBrowser->shuffle()->take(3)->map(function ($browserGroup) {
            return $browserGroup->random();
        })->pluck('id')->toArray();

        $question = $this->generateQuestion(
            Question::TYPE_BROWSER,
            $supports,
            $browserType,
            $incorrectAnswers,
            $correctAnswer->id,
            $feature->id
        );

        unset($feature);
        unset($supportedBrowsers);
        unset($unsupportedBrowsers);
        unset($incorrectAnswersByBrowser);
        unset($incorrectAnswers);

        return $question;
    }

    /**
     * Creates a global support question.
     *
     * @param string $category
     * @param string $supports
     * @return Question|null
     */
    public function generateGlobalSupportQuestion(string $category, string $supports, int $answerCount): Question|null
    {
        $counter = 0;
        do {
            $features = Feature::where('primary_category', $category)
                ->orWhere('secondary_category', $category)
                ->inRandomOrder()
                ->limit($answerCount)
                ->get()
                ->sortByDesc('usage_global');

            if ($counter > self::MAX_GENERATE_QUESTIONS_LOOP) {
                return null;
            }

            $counter++;
        } while (!$this->haveDifferentUsages($features) || !$this->hasEnoughAnswersSimple($features->count(), $answerCount));

        // Probably needs a better method for generating questions but let's go with random for now.
        $correctAnswerId = $supports === Question::SUPPORTED ? $features->first()->id : $features->last()->id;
        $incorrectAnswers = $supports === Question::SUPPORTED ? $features->slice(1)->pluck('id')->toArray() : $features->slice(0, -1)->pluck('id')->toArray();

        $question = $this->generateQuestion(
            Question::TYPE_GLOBAL,
            $supports,
            $category,
            $incorrectAnswers,
            $correctAnswerId
        );

        unset($features);
        unset($incorrectAnswers);

        return $question;
    }

    /**
     * Generates a single question.
     *
     * @param string $type
     * @param string $supports
     * @param string $subjectType
     * @param array $incorrectAnswers
     * @param integer $correctAnswerId
     * @param integer|null $subjectId
     * @return Question
     */
    private function generateQuestion(
        string $type,
        string $supports,
        string $subjectType,
        array $incorrectAnswers,
        int $correctAnswerId,
        int|null $subjectId = null,
    ): Question
    {
        $answers = [ $correctAnswerId, $incorrectAnswers[0], $incorrectAnswers[1], $incorrectAnswers[2] ];
        sort($answers);

        $hash = Hasher::calculateQuestionHash($type, $supports, $subjectId, $answers);

        $question = Question::updateOrCreate(
            [ 'hash' => $hash ],
            [
                'type' => $type,
                'supports' => $supports,
                'subject_type' => $subjectType,
                'subject_id' => $subjectId,
                'correct_answer_id' => $correctAnswerId,
                'answers' => $answers,
                'hash' => $hash,
            ]
        );

        return $question;
    }

    /**
     * Get all relevant features.
     *
     * @return Collection
     */
    private function getAllRelevantFeatures()
    {
        if ($this->relevantFeatures->isEmpty()) {
            $this->relevantFeatures = $this->featureController->getAllRelevant();
        }

        return $this->relevantFeatures;
    }

    /**
     * Get all used Browsers.
     *
     * @return Collection
     */
    private function getAllUsedBrowsers()
    {
        if ($this->usedBrowsers->isEmpty()) {
            $this->usedBrowsers = $this->browserController->getAllUsed();
        }

        return $this->usedBrowsers;
    }

    /**
     * Check if quiz has enough answers to generate a question.
     *
     * @param string $supports
     * @param int $supportedCount
     * @param int $unsupportedCount
     * @param int $expectedAnswerCount
     * @return bool
     */
    private function hasEnoughAnswers(string $supports, int $supportedCount, int $unsupportedCount, int $expectedAnswerCount): bool
    {
        if ($supports === Question::SUPPORTED) {
            return $supportedCount >= 1 && $unsupportedCount >= $expectedAnswerCount - 1;
        } else {
            return $supportedCount >= $expectedAnswerCount - 1 && $unsupportedCount >= 1;
        }
    }

    /**
     * Check if quiz has enough incorrect groups to generate a question.
     *
     * @param int $incorrectGroupsCount
     * @param int $expectedAnswerCount
     * @return bool
     */
    private function hasEnoughIncorrectGroups(int $incorrectGroupsCount, int $expectedAnswerCount): bool
    {
        return $incorrectGroupsCount >= $expectedAnswerCount - 1;
    }

    /**
     * Check if quiz has enough answers to generate a question.
     *
     * @param int $answerCount
     * @param int $expectedAnswerCount
     * @return bool
     */
    private function hasEnoughAnswersSimple(int $answerCount, int $expectedAnswerCount): bool
    {
        return $answerCount === $expectedAnswerCount;
    }

    /**
     * Check that all $features have different usage_global values.
     *
     * @param Collection $features
     * @return bool
     */
    private function haveDifferentUsages(Collection $features): bool
    {
        $usages = $features->pluck('usage_global')->toArray();
        return count(array_unique($usages)) === count($usages);
    }
}
