<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    /**
     * Guarded properties that can't be saved over.
     *
     * @var array<string>
     */
    protected $guarded = [];

    public function setIsCorrect(bool $isCorrect): void
    {
        $this->isCorrect = $isCorrect;
    }

    public function getIsCorrect(): bool
    {
        return $this->isCorrect;
    }
}
