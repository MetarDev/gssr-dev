<?php

namespace App\Logic;

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
     */
    public function generateBrowserSupportQuestions()
    {
        // Foreach browser, get all supported and unsupported features
        $this->browserController->getAllUsed()->each(function (Browser $browser) {
            $supported = $browser->supported_features;
            $unsupported = $browser->unsupported_features;

            return true;

            $supportedFeatures = $this->featureController->getSupportedFeatures($browser);
            $unsupportedFeatures = $this->featureController->getUnsupportedFeatures($browser);

            // Foreach supported feature, generate a question
            DB::beginTransaction();
            $supportedFeatures->each(function (Feature $feature) use ($browser, $unsupportedFeatures) {
                $this->featureController->getAllIncorrectAnswerCombinations($feature->id, $unsupportedFeatures)->each(function (array $incorrectAnswers) use ($feature, $browser) {
                    $question = new Question();
                    $question->type = Question::TYPE_BROWSER;
                    $question->supports = Question::SUPPORTED;
                    $question->subject_id = $browser->id;
                    $question->correct_answer_id = $feature->id;
                    $question->answers = collect([
                        $feature->id,
                        $incorrectAnswers[0],
                        $incorrectAnswers[1],
                        $incorrectAnswers[2],
                    ])->shuffle()->toArray();
                    $question->save();
                });
            });

            // Foreach unsupported feature, generate a question
            $unsupportedFeatures->each(function (Feature $feature) use ($browser, $supportedFeatures) {
                $this->featureController->getAllIncorrectAnswerCombinations($feature->id, $supportedFeatures)->each(function (array $incorrectAnswers) use ($feature, $browser) {
                    $question = new Question();
                    $question->type = Question::TYPE_BROWSER;
                    $question->supports = Question::NOT_SUPPORTED;
                    $question->subject_id = $browser->id;
                    $question->correct_answer_id = $feature->id;
                    $question->answers = collect([
                        $feature->id,
                        $incorrectAnswers[0],
                        $incorrectAnswers[1],
                        $incorrectAnswers[2],
                    ])->shuffle()->toArray();
                    $question->save();
                });
            });

            DB::commit();
        });
    }

    /**
     * Generate "Which is feature is most / least universally supported?" questions.
     */
    public function generateGlobalSupportQuestions()
    {
    }
}
