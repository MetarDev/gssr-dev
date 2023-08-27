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
        // Create answers from browsers / features specific to the quiz
        return Question::whereIn('id', $quiz->questions)
            ->orderByRaw(sprintf('FIELD(id, %s)', implode(',', $quiz->questions)))
            ->get()
            ->map([$this, 'buildAnswersForQuestion'])
            ->map([$this, 'addQuestionTypeData']);
    }

    /**
     * Builds answer models for the each question.
     *
     * @param Collection $answers
     * @param string $answerModelClass
     * @return Collection
     */
    public function buildAnswersForQuestion(Question $question): Question
    {
        $question->answers = $this->answerController
            ->buildAnswersForQuestion($question->answers, $this->getAnswerModelClass($question))
            ->map(function ($answer) use (&$question) {
                if ($answer->id === $question->correct_answer_id) {
                    $answer->isCorrect = true;
                }
                return $answer;
            });

        return $question;
    }

    /**
     * Adds appropriate data for each question type.
     *
     * @param Question $question
     * @return Question
     */
    public function addQuestionTypeData(Question $question): Question
    {
        switch ($question->type) {
            case Question::TYPE_FEATURE:
                $question->featureSupportData = [
                    'isSupported' => $question->supports === Question::SUPPORTED,
                    'featureType' => $question->correctAnswer->type,
                    'browserName' => $question->subject->name,
                    'browserVersion' => $question->subject->version,
                    'browserYear' => $question->subject->year,
                ];
                break;
            case Question::TYPE_BROWSER:
                $question->browserSupportData = [
                    'isSupported' => $question->supports === Question::SUPPORTED,
                    'browserType' => $question->correctAnswer->type,
                    'featureShortName' => $question->subject->title,
                    'featureFullName' => $question->subject->title,
                ];
                break;
            case Question::TYPE_GLOBAL:
                $question->globalUsageData = [
                    'isMostUsed' => $question->supports === Question::SUPPORTED,
                    'featureType' => $question->correctAnswer->type,
                    'fullFeatureName' => $question->feature_full_name,
                ];
                break;
        }
        return $question;
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
        switch ($question->type) {
            case Question::TYPE_FEATURE:
                return Feature::class;
            case Question::TYPE_BROWSER:
                return Browser::class;
            case Question::TYPE_GLOBAL:
                return Feature::class;
            default:
                throw new \Exception('Invalid question type');
        }
    }
}
