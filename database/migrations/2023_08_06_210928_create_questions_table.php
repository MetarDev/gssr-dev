<?php

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
            $table->enum('type', [Question::TYPE_BROWSER, Question::TYPE_FEATURE, Question::TYPE_GLOBAL, Question::TYPE_CUSTOM]);
            $table->foreignId('answer_1_id'); // Feature or Browser model ID, based on question's type
            $table->foreignId('answer_2_id');
            $table->foreignId('answer_3_id');
            $table->foreignId('answer_4_id');
            $table->foreignId('correct_answer_id');
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
