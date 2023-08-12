<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Inertia\Inertia;

class QuizController extends Controller
{
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
        return Inertia::render('Quiz', [
            'slug' => $slug,
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
