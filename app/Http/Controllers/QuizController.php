<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

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
     * @var QuestionController
     */
    public function __construct(QuestionController $questionController)
    {
        $this->questionController = $questionController;
    }

    /**
     * Display the quiz page.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Get a random quizSlug (faster / more efficient then doing inRandomOrder)
        $slug = Quiz::get('slug')->random(1)->pluck('slug')->first();
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
        $questions = $this->questionController->buildQuestionsForQuiz($quiz);
        return Inertia::render('Quiz', [
            'quiz' => $quiz,
            'questions' => $questions,
            'url' => Request::url(),
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
