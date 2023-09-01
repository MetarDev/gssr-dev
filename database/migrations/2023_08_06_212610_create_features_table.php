<?php

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
        Schema::create('features', function (Blueprint $table) {
            $categoryMaxLength = 16;
            $table->id();
            $table->string('short_title')->unique();
            $table->string('title')->unique();
            $table->longText('description');
            $table->string('primary_category', $categoryMaxLength); // "cats" in caniuse dataset, already mapped to main category so "CSS" instead of "CSS3"
            $table->string('secondary_category', $categoryMaxLength)->nullable(); // "cats" in caniuse dataset, already mapped to main category so "CSS" instead of "CSS3"
            $table->string('status', 16);
            $table->longText('links');
            $table->string('spec');
            $table->float('usage_global')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('features');
    }
};
