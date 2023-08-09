<?php

use App\Models\Feature;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->enum('type', [
                Question::TYPE_BROWSER,
                Question::TYPE_FEATURE,
                Question::TYPE_GLOBAL,
                Question::TYPE_CUSTOM
            ]);
            $table->enum('supports', [
                Question::SUPPORTED,
                Question::NOT_SUPPORTED
            ]);
            $table->enum('category', [
                Feature::CAT_CSS,
                Feature::CAT_HTML5,
                Feature::CAT_JS,
                Feature::CAT_JS_API,
                Feature::CAT_OTHER,
                Feature::CAT_SECURITY,
                Feature::CAT_SVG,
            ]);
            $table->string('hash')->unique();
            $table->foreignId('subject_id'); // Feature or Browser model ID, based on question's type
            $table->foreignId('correct_answer_id');
            $table->string('answers'); // Feature or Browser model ID, based on question's type
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
