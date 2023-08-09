<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Support\Collection;

class QuestionController extends Controller
{
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
}
