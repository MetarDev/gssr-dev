<?php

use App\Models\Question;
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
            $table->string('hash')->unique();
            $table->foreignId('subject_id')->nullable(); // Feature or Browser model ID, based on question's type
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
