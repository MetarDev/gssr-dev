<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
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
