<?php
declare(strict_types=1);

namespace App\Logic;

use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;
use App\Logic\QuestionGenerator;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Support\Collection;

class QuizGenerator
{
    /**
     * Quiz controller.
     *
     * @var QuizController
     */
    private QuizController $quizController;

    /**
     * Question controller.
     *
     * @var QuestionController
     */
    private QuestionController $questionController;

    /**
     * Constructor.
     *
     * @param QuizController $quizController
     * @param QuestionController $questionController
     */
    public function __construct(QuizController $quizController, QuestionController $questionController)
    {
        $this->quizController = $quizController;
        $this->questionController = $questionController;
    }

    /**
     * Generate a random quiz.
     *
     * @param integer $howManyQuestions
     * @param integer $timer
     * @return Quiz
     */
    public function generateRandom(int $howManyQuestions, int $timer): Quiz
    {
        $questions = $this->questionController->getRandom($howManyQuestions);

        $quiz = $this->generate(
            $questions->map(fn(Question $question) => $question->id),
            $timer,
        );

        return $quiz;
    }

    /**
     * Generate a quiz from a collection of question IDs.
     *
     * @param Collection $questionIds
     * @param integer $timer
     * @return Quiz
     */
    public function generate(Collection $questionIds, int $timer): Quiz
    {
        $quiz = Quiz::create([
            'timer' => $timer,
            'questions' => $questionIds,
        ]);

        $slug = $this->quizController->computeSlug($quiz);
        $quiz->slug = $slug;

        $quiz->save();
        return $quiz;
    }
}
