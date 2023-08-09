<?php

namespace App\Helpers;

use App\Models\Question;

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
     * @param string $category
     * @param string $subjectId
     * @param array<string> $answers
     * @return string
     */
    public static function calculateQuestionHash(string $type, string $supports, string $category, int $subjectId, array $answers): string
    {
        return md5(
            $type .
            $supports .
            $category .
            $subjectId .
            implode($answers)
        );
    }
}
