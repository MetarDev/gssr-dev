<?php
declare(strict_types=1);

namespace App\Logic;

use App\Helpers\Hasher;
use App\Http\Controllers\QuizController;
use App\Logic\QuestionGenerator;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

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
     * @var QuestionGenerator
     */
    private questionGenerator $questionGenerator;

    /**
     * Constructor.
     *
     * @param QuizController $quizController
     * @param QuestionGenerator $questionGenerator
     */
    public function __construct(QuizController $quizController, questionGenerator $questionGenerator)
    {
        $this->quizController = $quizController;
        $this->questionGenerator = $questionGenerator;
    }

    /**
     * Generate $count random quizzes
     *
     * @param integer $howManyQuizzes
     * @param integer $timer
     * @return void
     */
    public function generateRandom(int $howManyQuizzes, int $timer, bool $isDryRun)
    {
        // Based on $howManyQuizzes, create a spread of quizzes to generate based on type and support.
        $answersCount = Question::DEFAULT_ANSWER_COUNT;
        $quizzes = collect([]);
        for ($i = 0; $i < $howManyQuizzes; $i++) {
            $quizzes->push(new QuizOverview($timer));
        }

        // Generate quiz and questions for each quiz.
        DB::beginTransaction();
        $quizzes->each(function (QuizOverview $quizOverview) use ($timer, $answersCount) {
            $questions = collect([]);

            $quizOverview->browserSupportQuestions->each(function (array $params) use (&$questions, $answersCount) {
                $question = $this->questionGenerator->generateBrowserSupportQuestion(
                    $params['category'],
                    $params['supports'],
                    $answersCount,
                );

                if (!$question) {
                    return true;
                }

                $questions->push($question);
            });

            // Validate that quiz has enough questions
            if ($questions->count() < $quizOverview->totalQuestions) {
                \Illuminate\Support\Facades\Log::info("Quiz has less questions then expected, skipping. Got {$questions->count()}, expecting {$answersCount}");
                return true;
            }

            $hash = Hasher::calculateQuizHash($questions, $timer);
            Quiz::updateOrCreate(
                [ 'slug' => $hash ],
                [
                    'timer' => $quizOverview->timer,
                    'questions' => $questions->shuffle()->pluck('id'),
                    'slug' => $hash,
                ]
            );
        });

        if (!$isDryRun) {
            DB::commit();
        } else {
            DB::rollBack();
        }
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
