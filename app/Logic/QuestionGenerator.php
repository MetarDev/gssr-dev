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
                        $type = Question::TYPE_BROWSER;
                        $supports = Question::SUPPORTED;
                        $answers = [ $correctAnswerId, $incorrectAnswers[0], $incorrectAnswers[1], $incorrectAnswers[2] ];
                        sort($answers);

                        $hash = Hasher::calculateQuestionHash($type, $supports, $category, $browser->id, $answers);

                        if (! $isDryRun) {
                            Question::updateOrCreate(
                                [ 'hash' => $hash ],
                                [
                                    'type' => $type,
                                    'supports' => $supports,
                                    'category' => $category,
                                    'subject_id' => $browser->id,
                                    'correct_answer_id' => $correctAnswerId,
                                    'answers' => $answers,
                                    'hash' => $hash,
                                ]
                            );
                        }
                        $totalQuestions++;
                    }
                }

                foreach ($unsupportedFeatures as $correctAnswerId) {
                    foreach ($this->featureController->getAllIncorrectAnswerCombinations($supportedFeatures) as $incorrectAnswers) {
                        $type = Question::TYPE_BROWSER;
                        $supports = Question::NOT_SUPPORTED;
                        $answers = [ $correctAnswerId, $incorrectAnswers[0], $incorrectAnswers[1], $incorrectAnswers[2] ];
                        sort($answers);

                        $hash = Hasher::calculateQuestionHash($type, $supports, $category, $browser->id, $answers);

                        if (! $isDryRun) {
                            Question::updateOrCreate(
                                [ 'hash' => $hash ],
                                [
                                    'type' => $type,
                                    'supports' => $supports,
                                    'category' => $category,
                                    'subject_id' => $browser->id,
                                    'correct_answer_id' => $correctAnswerId,
                                    'answers' => $answers,
                                    'hash' => $hash,
                                ]
                            );
                        }
                        $totalQuestions++;
                    }
                }

                DB::commit();
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
}
