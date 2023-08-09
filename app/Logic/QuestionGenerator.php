<?php
declare(strict_types=1);

namespace App\Logic;

use App\Helpers\Hasher;
use App\Http\Controllers\BrowserController;
use App\Http\Controllers\FeatureController;
use App\Models\Browser;
use App\Models\Feature;
use App\Models\Question;
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
     * Constructor.
     *
     * @param CanIUseApi $canIUseApi
     */
    public function __construct(BrowserController $browserController, FeatureController $featureController)
    {
        $this->browserController = $browserController;
        $this->featureController = $featureController;
    }

    /**
     * Generate the "Which browser does / doesn't support this feature?" questions.
     */
    public function generateFeatureSupportQuestions()
    {
        // Get 1 random feature using Eloquent
        $feature = Feature::inRandomOrder()->first();
    }

    /**
     * Creates a single browser support question.
     *
     * @param string $category
     * @param string $supports
     * @return Question|null
     */
    public function generateBrowserSupportQuestion(string $category, string $supports, int $answerCount): Question|null
    {
        $counter = 0;
        do {
            $browser = $this->browserController->getAllUsed()->random();
            $supportedFeatures = $browser->getSupportedFeaturesByCategory($category);
            $unsupportedFeatures = $browser->getUnsupportedFeaturesByCategory($category);

            if ($counter > self::MAX_GENERATE_QUESTIONS_LOOP) {
                return null;
            }
            $counter++;
        } while (!$this->hasEnoughAnswers($supports, $supportedFeatures->count(), $unsupportedFeatures->count(), $answerCount));

        // Probably needs a better method for generating questions but let's go with random for now.
        $correctAnswerId = $supports === Question::SUPPORTED ? $supportedFeatures->random()->id : $unsupportedFeatures->random()->id;
        $incorrectAnswers = $supports === Question::SUPPORTED ? $unsupportedFeatures->random($answerCount - 1)->pluck('id')->toArray() : $supportedFeatures->random(3)->pluck('id')->toArray();

        $question = $this->generateQuestion(Question::TYPE_BROWSER, $supports, $category, $incorrectAnswers, $correctAnswerId, $browser->id);
        return $question;
    }

    /**
     * Generate the "Which feature is / isn't supported by this browser?" questions.
     *
     * @return int Total number of questions generated.
     */
    public function generateBrowserSupportQuestions(bool $isDryRun = false): int
    {
        // Foreach browser, get all supported and unsupported features
        $totalQuestions = 0;
        $this->browserController->getAllUsed()->each(function (Browser $browser) use (&$totalQuestions, $isDryRun) {

            foreach (Feature::getAllCategories() as $category) {
                $supportedFeatures = $browser->supported_features->filter(fn(Feature $feature) => $feature->primary_category === $category || $feature->secondary_category === $category)->pluck('id')->toArray();
                $unsupportedFeatures = $browser->unsupported_features->filter(fn(Feature $feature) => $feature->primary_category === $category || $feature->secondary_category === $category)->pluck('id')->toArray();

                // Foreach supported feature, generate a question
                DB::beginTransaction();

                foreach ($supportedFeatures as $correctAnswerId) {
                    foreach ($this->featureController->getAllIncorrectAnswerCombinations($unsupportedFeatures) as $incorrectAnswers) {
                        $this->generateQuestion(
                            Question::TYPE_BROWSER,
                            Question::SUPPORTED,
                            $category,
                            $incorrectAnswers,
                            $correctAnswerId,
                            $browser->id,
                        );
                        $totalQuestions++;
                    }
                }

                foreach ($unsupportedFeatures as $correctAnswerId) {
                    foreach ($this->featureController->getAllIncorrectAnswerCombinations($supportedFeatures) as $incorrectAnswers) {
                        $this->generateQuestion(
                            Question::TYPE_BROWSER,
                            Question::NOT_SUPPORTED,
                            $category,
                            $incorrectAnswers,
                            $correctAnswerId,
                            $browser->id,
                        );
                        $totalQuestions++;
                    }
                }

                if (!$isDryRun) {
                    DB::commit();
                } else {
                    DB::rollBack();
                }
            }
        });

        return $totalQuestions;
    }

    /**
     * Generate "Which is feature is most / least universally supported?" questions.
     */
    public function generateGlobalSupportQuestions()
    {
    }

    /**
     * Generates a single question.
     *
     * @param string $type
     * @param string $supports
     * @param string $category
     * @param array $incorrectAnswers
     * @param integer $correctAnswerId
     * @param integer $subjectId
     * @return Question|null
     */
    private function generateQuestion(
        string $type,
        string $supports,
        string $category,
        array $incorrectAnswers,
        int $correctAnswerId,
        int $subjectId,
    ): Question|null
    {
        $answers = [ $correctAnswerId, $incorrectAnswers[0], $incorrectAnswers[1], $incorrectAnswers[2] ];
        sort($answers);

        $hash = Hasher::calculateQuestionHash($type, $supports, $category, $subjectId, $answers);

        $question = Question::updateOrCreate(
            [ 'hash' => $hash ],
            [
                'type' => $type,
                'supports' => $supports,
                'category' => $category,
                'subject_id' => $subjectId,
                'correct_answer_id' => $correctAnswerId,
                'answers' => $answers,
                'hash' => $hash,
            ]
        );

        echo "Generating question for $category, $supports\n";
        return $question ?? null;
    }

    /**
     * Check if quiz has enough answers to generate a question.
     *
     * @param string $supports
     * @param int $supportedCount
     * @param int $unsupportedCount
     * @return bool
     */
    private function hasEnoughAnswers(string $supports, int $supportedCount, int $unsupportedCount, int $answerCount): bool
    {
        if ($supports === Question::SUPPORTED) {
            return $supportedCount >= 1 && $unsupportedCount >= $answerCount - 1;
        } else {
            return $supportedCount >= $answerCount - 1 && $unsupportedCount >= 1;
        }
    }
}
