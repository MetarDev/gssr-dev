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

        $this->totalQuestions = 3;
    }
}
