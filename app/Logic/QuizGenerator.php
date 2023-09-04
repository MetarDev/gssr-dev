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
     * Batches writing of quizzed (and questions) into batches of $batches
     *
     * @var integer
     */
    private $batches = 10;

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
     * @return array<string, float>
     */
    public function generateRandom(int $howManyQuizzes, int $timer, bool $isDryRun): array
    {
        // Based on $howManyQuizzes, create a spread of quizzes to generate based on type and support.
        $answersCount = Question::DEFAULT_ANSWER_COUNT;
        $quizzes = collect([]);
        for ($i = 0; $i < $howManyQuizzes; $i++) {
            $quizOverview = new QuizOverview($timer, Quiz::DEFAULT_QUESTION_COUNT);
            $quizOverview->initialize();
            $quizzes->push($quizOverview);
        }

        // Generate quiz and questions for each quiz.
        $total_time = 0;
        $browser_total = 0;
        $feature_total = 0;
        $global_total = 0;
        $counter = 0;
        $quizzes->each(function (QuizOverview $quizOverview) use ($timer, $answersCount, &$total_time, &$browser_total, &$feature_total, &$global_total, &$counter, $isDryRun) {

            // Start timer.
            $logic_time_start = microtime(true);
            $browser_start = microtime(true);

            // Start the transaction
            if ($counter === 0 && !$isDryRun) {
                DB::beginTransaction();
            }

            $questions = collect([]);

            $quizOverview->browserSupportQuestions->each(function (array $params) use (&$questions, $answersCount) {
                $questions->push($this->questionGenerator->generateBrowserSupportQuestion(
                    $params['type'],
                    $params['supports'],
                    $answersCount,
                ));
            });
            $browser_end = microtime(true) - $browser_start;
            $browser_total += $browser_end;

            $feature_start = microtime(true);
            $quizOverview->featureSupportQuestions->each(function (array $params) use (&$questions, $answersCount) {
                $questions->push($this->questionGenerator->generateFeatureSupportQuestion(
                    $params['category'],
                    $params['supports'],
                    $answersCount,
                ));
            });
            $feature_end = microtime(true) - $feature_start;
            $feature_total += $feature_end;

            $global_start = microtime(true);
            $quizOverview->globalSupportQuestions->each(function (array $params) use (&$questions, $answersCount) {
                $questions->push($this->questionGenerator->generateGlobalSupportQuestion(
                    $params['category'],
                    $params['supports'],
                    $answersCount,
                ));
            });
            $global_end = microtime(true) - $global_start;
            $global_total += $global_end;

            // Remove any null values.
            $questions = $questions->filter();

            // Validate that quiz has enough questions
            if ($questions->count() < $quizOverview->totalQuestions) {
                \Illuminate\Support\Facades\Log::info("Quiz has less questions then expected, skipping. Got {$questions->count()}, expecting {$answersCount}");
                return true;
            }
            $logic_time_end = microtime(true) - $logic_time_start;
            $total_time += $logic_time_end;

            Quiz::firstOrCreate(
                [ 'slug' => Hasher::calculateQuizHash($questions, $timer) ],
                [
                    'timer' => $quizOverview->timer,
                    'questions' => $questions->shuffle()->pluck('id'),
                ]
            );

            // Let's commit in batches.
            $counter++;
            if (!$isDryRun && $counter >= $this->batches) {
                $counter = 0;
                DB::commit();
            }
        });

        if (!$isDryRun && DB::transactionLevel() > 0) {
            DB::commit();
        }
        $db_start = microtime(true);
        $db_end = microtime(true) - $db_start;

        return [
            'total-time-spent' => $total_time,
            'browser-support-question-generation' => $browser_total,
            'feature-support-question-generation' => $feature_total,
            'global-support-question-generation' => $global_total,
            'writing-to-db' => $db_end,
        ];
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
