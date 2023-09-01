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
        $questions = Question::whereIn('id', $quiz->questions)
            ->orderByRaw(sprintf('FIELD(id, %s)', implode(',', $quiz->questions)))
            ->get();

        // Fetch all answers in a single query
        $questions = $this->fetchAnswersAndSubjectForQuestions($questions);

        return $questions
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
        $question->answers = [...$this->answerController
            ->buildAnswersForQuestion($question->answerObjects)
            ->map(function ($answer) use (&$question) {
                if ($answer->id === $question->correct_answer_id) {
                    $answer->isCorrect = true;
                }
                return $answer;
            })->toArray()
        ];

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
                    'subjectType' => $question->subject_type,
                    'browserName' => $question->subject->title,
                    'browserVersion' => $question->subject->version,
                    'browserYear' => $question->subject->year,
                ];
                break;
            case Question::TYPE_BROWSER:
                $question->browserSupportData = [
                    'isSupported' => $question->supports === Question::SUPPORTED,
                    'subjectType' => $question->subject_type,
                    'featureShortName' => $question->subject->short_title,
                    'featureFullName' => $question->subject->title,
                ];
                break;
            case Question::TYPE_GLOBAL:
                $question->globalUsageData = [
                    'isMostUsed' => $question->supports === Question::SUPPORTED,
                    'subjectType' => $question->subject_type,
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
     * Fetches the correct models (Feature or Browser) for each question in a single query.
     *
     * @param Collection $questions
     * @return Collection
     */
    private function fetchAnswersAndSubjectForQuestions(Collection $questions): Collection
    {
        $answerIdsByModelClass = [];
        $answersByModelClass = [];

        // First let's separate the answer ids by model class.
        $questions->each(function ($question) use (&$answerIdsByModelClass) {
            $modelClass = $this->getAnswerModelClass($question);
            $subjectModelClass = $this->getSubjectModelClass($question);
            $answerIdsByModelClass[$modelClass] = [ ...$answerIdsByModelClass[$modelClass] ?? [], ...$question->answers];
            $answerIdsByModelClass[$subjectModelClass] = [ ...$answerIdsByModelClass[$subjectModelClass] ?? [], $question->subject_id];
        });

        // Now let's fetch all Features and Browsers depending on $answerIdsByModelClass
        foreach ($answerIdsByModelClass as $model => $answer_ids) {
            $answersByModelClass[$model] = $model::whereIn('id', array_filter(array_unique($answer_ids)))->get();
        }

        // Now that we have all the answers and subjects, let's assign them to the questions
        $questions->each(function ($question) use ($answersByModelClass) {
            $modelClass = $this->getAnswerModelClass($question);
            $subjectModelClass = $this->getSubjectModelClass($question);
            $question->answerObjects = $answersByModelClass[$modelClass]->filter(function ($answer) use ($question) {
                return in_array($answer->id, $question->answers);
            });
            $question->subject = $answersByModelClass[$subjectModelClass]->firstWhere('id', $question->subject_id);
        });

        return $questions;
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

    /**
     * Returns the correct model to fetch based on the question type.
     *
     * @param Question $question
     * @return string
     */
    private function getSubjectModelClass(Question $question)
    {
        switch ($question->type) {
            case Question::TYPE_FEATURE:
                return Browser::class;
            case Question::TYPE_BROWSER:
                return Feature::class;
            case Question::TYPE_GLOBAL:
                return Browser::class;
            default:
                throw new \Exception('Invalid question type');
        }
    }
}
