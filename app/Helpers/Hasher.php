<?php

namespace App\Helpers;

use App\Models\Question;
use Illuminate\Support\Collection;

class Hasher
{
    /**
     * Compute the unique hash for a browser.
     *
     * @return string
     */
    public static function calculateUniqueBrowserHash(string $name, string $version, string $type): string
    {
        return md5($name . $version . $type);
    }

    /**
     * Compute the unique hash for a browser.
     *
     * @param string $type
     * @param string $supports
     * @param int|null $subjectId
     * @param array<string> $answers
     * @return string
     */
    public static function calculateQuestionHash(string $type, string $supports, int|null $subjectId, array $answers): string
    {
        return md5(
            $type .
            $supports .
            $subjectId .
            implode($answers)
        );
    }

    /**
     * Compute the unique hash for a quiz.
     *
     * @return string
     */
    public static function calculateQuizHash(Collection $questions, int $timer): string
    {
        return hash(
            'crc32',
            $timer .
            $questions->sum(function (Question $question) {
                return $question->id;
            })
        );
    }

    /**
     * Generates a random crc32 hash.
     *
     * @return string
     */
    public static function generateRandomShortHash(): string
    {
        return hash('crc32', (string) (rand() + rand()));
    }
}
