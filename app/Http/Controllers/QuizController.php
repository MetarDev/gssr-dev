<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Helpers\Images;
use App\Helpers\Metadata;
use App\Models\Quiz;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class QuizController extends Controller
{
    /**
     * The question controller instance.
     *
     * @var QuestionController
     */
    protected $questionController;

    /**
     * The question controller instance.
     *
     * @param QuestionController $questionController
     */
    public function __construct(QuestionController $questionController)
    {
        $this->questionController = $questionController;
    }

    /**
     * Display the quiz page.
     *
     * @return RedirectResponse
     */
    public function index()
    {
        // Get a random quizSlug (faster / more efficient then doing inRandomOrder)
        // $slug = Quiz::get('slug')->random(1)->pluck('slug')->first();

        // Get a random quizSLug by getting the max quiz ID and then picking a random number between 1 and max.
        // Does 2 queries but negligible amount of memory compared to getting all slugs and then picking one.
        $slug = Quiz::where('id', rand(1, Quiz::max('id')))->pluck('slug')->first();

        return redirect("/quiz/$slug");
    }

    /**
     * Display the quiz page.
     *
     * @return \Inertia\Response
     */
    public function indexSpecificQuiz(string $slug)
    {
        $quiz = Quiz::where('slug', $slug)->firstOrFail();
        $questions = $this->questionController->buildQuestionsForQuiz($quiz)->shuffle();
        return Inertia::render('Quiz', [
            'quiz' => $quiz,
            'questions' => $questions,
            'metadata' => Metadata::generatePageMetadata([
                'title' => config('app.name') . " - Quiz $quiz->slug",
                'description' => "Quiz of mixed browser / feature / global support questions.",
                'image' => Images::resolve('quiz-1200x630.png'),
            ])
        ]);
    }
    /**
     * Compute the slug for the quiz.
     *
     * @return string
     */
    public function computeSlug(Quiz $quiz): string
    {
        return "{$quiz->id}-123456";
    }
}
