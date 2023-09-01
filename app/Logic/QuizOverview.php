<?php
declare(strict_types=1);

namespace App\Logic;

use App\Models\Browser;
use App\Models\Feature;
use App\Models\Question;
use Illuminate\Support\Collection;

class QuizOverview
{
    /**
     * Browser support questions.
     *
     * @var Collection
     */
    public Collection $browserSupportQuestions;

    /**
     * Feature support questions.
     *
     * @var Collection
     */
    public Collection $featureSupportQuestions;

    /**
     * Global support questions.
     *
     * @var Collection
     */
    public Collection $globalSupportQuestions;

    /**
     * Timer for each quiz.
     *
     * @var integer
     */
    public int $timer;

    /**
     * Total questions for each quiz.
     *
     * @var integer
     */
    public int $totalQuestions;

    /**
     * Question count for each quiz.
     *
     * @var integer
     */
    private int $questionCount;

    /**
     * Spread of question types for each quiz.
     *
     * @var array
     */
    private array $questionTypeSpread;

    /**
     * Constructor.
     *
     * @param integer $timer
     * @param integer $questionCount
     */
    public function __construct(int $timer, int $questionCount)
    {
        $this->timer = $timer;
        $this->questionCount = $questionCount;

        $this->questionTypeSpread = [
            Question::TYPE_BROWSER => 0,
            Question::TYPE_FEATURE => 0,
            Question::TYPE_GLOBAL => 0,
        ];

        $this->browserSupportQuestions = collect([]);
        $this->featureSupportQuestions = collect([]);
        $this->globalSupportQuestions = collect([]);

        $this->totalQuestions = $this->featureSupportQuestions->count() + $this->browserSupportQuestions->count() + $this->globalSupportQuestions->count();
    }

    /**
     * Initializes the quiz overview.
     *
     * @return void
     */
    public function initialize()
    {
        $this->generateQuestionTypeSpread();
        $this->generateBrowserSupportSpread();
        $this->generateFeatureSupportSpread();
        $this->generateGlobalSupportSpread();
    }

    /**
     * Generates a spread of question types based on $this->questionCount.
     *
     * @return void
     */
    private function generateQuestionTypeSpread()
    {
        $questionTypes = collect([
            Question::TYPE_BROWSER,
            Question::TYPE_BROWSER,
            Question::TYPE_FEATURE,
            Question::TYPE_FEATURE,
            Question::TYPE_GLOBAL,
            Question::TYPE_GLOBAL,
            Question::TYPE_GLOBAL,
        ]);

        for ($i = 0; $i < $this->questionCount; $i++) {
            $type = $questionTypes->random();
            $this->questionTypeSpread[$type]++;
        }
    }

    /**
     * Generates a spread of feature support questions
     *
     * @return void
     */
    private function generateFeatureSupportSpread()
    {
        if ($this->questionTypeSpread[Question::TYPE_FEATURE] === 0) {
            return;
        }

        for ($i = 0; $i < $this->questionTypeSpread[Question::TYPE_FEATURE]; $i++) {
            $category = $this->getPreferentialCategorySpread()->random();
            $supports = $this->getRandomSupports();

            $this->featureSupportQuestions->push([
                'supports' => $supports,
                'category' => $category,
              ]);
        }
    }

    /**
     * Generates a spread of browser support questions
     *
     * @return void
     */
    private function generateBrowserSupportSpread()
    {
        if ($this->questionTypeSpread[Question::TYPE_BROWSER] === 0) {
            return;
        }

        for ($i = 0; $i < $this->questionTypeSpread[Question::TYPE_BROWSER]; $i++) {
            // No real point in creating mobile questions for now as they only browsers with valid support data are
            // iOS safari and Samsung browser (so at best you get 2 Samsung browsers and 2 iOS safari browsers as answers,
            // and at worst 4 different versions of the same browser)
            $type = Browser::TYPE_DESKTOP;
            $supports = $this->getRandomSupports();

            $this->browserSupportQuestions->push([
                'supports' => $supports,
                'type' => $type,
              ]);
        }
    }

    /**
     * Generates a spread of global usage questions
     *
     * @return void
     */
    private function generateGlobalSupportSpread()
    {
        if ($this->questionTypeSpread[Question::TYPE_GLOBAL] === 0) {
            return;
        }

        for ($i = 0; $i < $this->questionTypeSpread[Question::TYPE_GLOBAL]; $i++) {
            $category = $this->getPreferentialCategorySpread()->random();
            $supports = $this->getRandomSupports();

            $this->globalSupportQuestions->push([
                'supports' => $supports,
                'category' => $category,
              ]);
        }
    }

    /**
     * Randomly pick supported or not supported.
     *
     * @return string
     */
    private function getRandomSupports(): string
    {
        return collect([
            Question::SUPPORTED,
            Question::NOT_SUPPORTED,
        ])->random();
    }

    /**
     * Gets a customized list of categories with some possibly being preferred over others.
     *
     * @return Collection
     */
    private function getPreferentialCategorySpread(): Collection
    {
        return collect([
            Feature::CAT_CSS,
            Feature::CAT_JS,
            Feature::CAT_JS_API,
            Feature::CAT_HTML5,
        ]);
    }
}
