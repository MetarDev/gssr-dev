<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Browser;
use App\Models\Feature;
use App\Models\Answer;
use App\Models\Question;
use Illuminate\Support\Collection;

class AnswerController extends Controller
{
    /**
     * Build the answer for the question.
     *
     * @param Collection<int|string, Feature|Browser> $models All Feature/Browser models.
     * @return Collection<int|string, Answer>
     */
    public function buildAnswersForQuestion(Collection $models): Collection
    {
        return $models->map([$this, 'buildAnswerFromModel']);
    }

    /**
     * Builds the answer model from Feature / Browser model
     *
     * @param Feature|Browser $model
     * @return Answer
     */
    public function buildAnswerFromModel(Feature|Browser $model): Answer
    {
        $isBrowser = $model instanceof Browser;
        if ($isBrowser) {
            $title = "$model->title ($model->version)";
            $titleLong = $model->title;
            $description = "$model->long_name ($model->version)";
        } else {
            $title = $model->short_title;
            $titleLong = $model->title;
            $description = $model->description;
        }

        return new Answer([
            'id' => $model->id,
            'title' => $title,
            'titleLong' => $titleLong,
            'description' => $description,
            'isCorrect' => false, // This is set later
            'globalUsageData' => [
                'globalUsage' => $model->usage_global,
            ],
        ]);
    }
}
