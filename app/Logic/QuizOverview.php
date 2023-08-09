<?php
declare(strict_types=1);

namespace App\Logic;

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
     * Constructor.
     *
     * @param integer $howManyQuizzes
     * @param integer $timer
     */
    public function __construct(int $timer)
    {
        $this->timer = $timer;
        $this->browserSupportQuestions = collect([
            [
                'supports' => Question::SUPPORTED,
                'category' => 'CSS',
            ],
            [
                'supports' => Question::NOT_SUPPORTED,
                'category' => 'CSS',
            ],
            [
                'supports' => Question::NOT_SUPPORTED,
                'category' => 'HTML5',
            ],
            // [
            //     'supports' => Question::SUPPORTED,
            //     'category' => 'Security',
            // ],
        ]);

        $this->featureSupportQuestions = collect([
            [
                'supports' => Question::SUPPORTED,
                'type' => 'desktop',
            ],
            [
                'supports' => Question::NOT_SUPPORTED,
                'type' => 'desktop',
            ],
            [
                'supports' => Question::NOT_SUPPORTED,
                'type' => 'mobile',
            ],
            [
                'supports' => Question::SUPPORTED,
                'type' => 'mobile',
            ],
        ]);

        $this->globalSupportQuestions = collect([
            [
                'supports' => Question::SUPPORTED,
                'category' => 'JS',
            ],
            [
                'supports' => Question::NOT_SUPPORTED,
                'category' => 'JS API',
            ],
            [
                'supports' => Question::NOT_SUPPORTED,
                'category' => 'HTML5',
            ],
        ]);

        $this->totalQuestions = $this->featureSupportQuestions->count() + $this->browserSupportQuestions->count() + $this->globalSupportQuestions->count();
    }
}
