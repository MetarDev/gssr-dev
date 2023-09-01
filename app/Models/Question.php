<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;

class Question extends Model
{
    use HasFactory;

    public const TYPE_GLOBAL = 'usage_global';
    public const TYPE_FEATURE = 'feature_support';
    public const TYPE_BROWSER = 'browser_support';
    public const TYPE_CUSTOM = 'custom';

    public const SUPPORTED = 'supported';
    public const NOT_SUPPORTED = 'not_supported';

    public const DEFAULT_ANSWER_COUNT = 4;

    /**
     * Collection of answers objects for the question (either Feature or Browser models.)
     *
     * @var Collection
     */
    public $answerObjects;

    /**
     * Guarded properties that can't be saved over.
     *
     * @var array<string>
     */
    protected $guarded = ['id'];

    /**
     * Casting some Model attributes
     *
     * @var array<string, string>
     */
    protected $casts = [
        'answers' => 'array',
    ];

    /**
     * Returns either a Feature model or a Browser model depending on questions type
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function subject(): BelongsTo
    {
        switch ($this->type) {
            case self::TYPE_FEATURE:
                return $this->belongsTo(Browser::class, 'subject_id');
            case self::TYPE_BROWSER:
                return $this->belongsTo(Feature::class, 'subject_id');
            case self::TYPE_GLOBAL:
                return $this->belongsTo(Feature::class, 'subject_id');
            default:
                throw new \Exception('Invalid question type');
        }
    }

    /**
     * Returns either a Feature model or a Browser model depending on questions type
     *
     * @return string
     */
    public function correctAnswer(): BelongsTo
    {
        switch ($this->type) {
            case self::TYPE_FEATURE:
                return $this->belongsTo(Feature::class, 'correct_answer_id');
            case self::TYPE_GLOBAL:
                return $this->belongsTo(Feature::class, 'correct_answer_id');
            case self::TYPE_BROWSER:
                return $this->belongsTo(Browser::class, 'correct_answer_id');
            default:
                throw new \Exception('Invalid question type');
        }
    }
}
