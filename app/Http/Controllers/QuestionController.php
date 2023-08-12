<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\Browser;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Support\Collection;

class QuestionController extends Controller
{

    /**
     * The answer controller instance.
     *
     * @var AnswerController
     */
    protected $answerController;

    /**
     * COnstructs object.
     *
     * @var AnswerController
     */
    public function __construct(AnswerController $answerController)
    {
        $this->answerController = $answerController;
    }

    /**
     * Build the questions for the quiz with answers
     *
     * @param Quiz $quiz
     * @return Collection
     */
    public function buildQuestionsForQuiz(Quiz $quiz): Collection
    {
        $questions = Question::whereIn('id', $quiz->questions)->get();

        $questions = $questions->map(function ($question) {
            $question->answers = $this->answerController
                ->buildAnswersForQuestion($question->answers, $this->getAnswerModelClass($question))
                ->map(function ($answer) use (&$question) {
                    if ($answer->id === $question->correct_answer_id) {
                        $answer->isCorrect = true;
                    }
                    return $answer;
                });

            return $question;
        });

        // Create answers from browsers / features specific to the quiz
        return $questions;
    }

    /**
     * Randoms $howMany random questions. Tries to give a nice spread of question types.
     *
     * @param integer $howMany
     * @return Collection
     */
    public function getRandom(int $howMany): Collection
    {
        return Question::inRandomOrder()
            ->limit($howMany)
            ->get();

        // TO DO - try to get a nice spread of question types.
    }

    /**
     * Returns the correct model to fetch based on the question type.
     *
     * @param Question $question
     * @return string
     */
    private function getAnswerModelClass(Question $question)
    {
        if ($question->type === Question::TYPE_FEATURE) {
            return Browser::class;
        } else {
            return Feature::class;
        }
    }
}
