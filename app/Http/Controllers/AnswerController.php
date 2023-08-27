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
     * @param Question $question
     * @return Collection
     */
    public function buildAnswersForQuestion(array $answerIds, string $modelClass): Collection
    {
        $models = $modelClass::whereIn('id', $answerIds)->get();
        return $models->map(fn($model) => $this->buildAnswerFromModel($model));
    }

    /**
     * Builds the answer model from Feature / Browser model
     *
     * @param Feature|Browser $model
     * @return Answer
     */
    public function buildAnswerFromModel(mixed $model): Answer
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
        return Answer::make([
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
