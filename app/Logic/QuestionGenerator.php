<?php
declare(strict_types=1);

namespace App\Logic;

use App\Helpers\Hasher;
use App\Http\Controllers\BrowserController;
use App\Http\Controllers\FeatureController;
use App\Models\Browser;
use App\Models\Feature;
use App\Models\Question;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

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

        $question = $this->generateQuestion(Question::TYPE_FEATURE, $supports, $incorrectAnswers, $correctAnswerId, $browser->id);
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
            $feature = $this->getAllRelevantFeatures()->random();
            $supportedBrowserIds = $feature->getSupportedBrowsersByType($browserType);
            $unsupportedBrowserIds = $feature->getUnsupportedBrowsersByType($browserType);

            if ($counter > self::MAX_GENERATE_QUESTIONS_LOOP) {
                return null;
            }
            $counter++;
        } while (!$this->hasEnoughAnswers($supports, $supportedBrowserIds->count(), $unsupportedBrowserIds->count(), $answerCount));

        // Probably needs a better method for generating questions but let's go with random for now.
        $correctAnswerId = $supports === Question::SUPPORTED ? $supportedBrowserIds->random() : $unsupportedBrowserIds->random();
        $incorrectAnswers = $supports === Question::SUPPORTED ? $unsupportedBrowserIds->random($answerCount - 1)->toArray() : $supportedBrowserIds->random($answerCount - 1)->toArray();

        return $this->generateQuestion(Question::TYPE_BROWSER, $supports, $incorrectAnswers, $correctAnswerId, $feature->id);
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

        $question = $this->generateQuestion(Question::TYPE_GLOBAL, $supports, $incorrectAnswers, $correctAnswerId);
        return $question;
    }

    /**
     * Generates a single question.
     *
     * @param string $type
     * @param string $supports
     * @param array $incorrectAnswers
     * @param integer $correctAnswerId
     * @param integer|null $subjectId
     * @return Question
     */
    private function generateQuestion(
        string $type,
        string $supports,
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
                'subject_id' => $subjectId,
                'correct_answer_id' => $correctAnswerId,
                'answers' => $answers,
                'hash' => $hash,
            ]
        );

        \Illuminate\Support\Facades\Log::info(print_r($question, true));

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
