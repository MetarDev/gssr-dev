<?php

use App\Models\Browser;
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
        Schema::create('browser_supported_features', function (Blueprint $table) {
            $table->unsignedBigInteger('browser_id')->unsigned();
            $table->unsignedBigInteger('feature_id')->unsigned();

            $table->foreign('browser_id')->references('id')
                ->on('browsers')->onDelete('cascade');
            $table->foreign('feature_id')->references('id')
                ->on('features')->onDelete('cascade');
        });

        Schema::create('browser_unsupported_features', function (Blueprint $table) {
            $table->unsignedBigInteger('browser_id')->unsigned();
            $table->unsignedBigInteger('feature_id')->unsigned();

            $table->foreign('browser_id')->references('id')
                ->on('browsers')->onDelete('cascade');
            $table->foreign('feature_id')->references('id')
                ->on('features')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('browser_supported_features');
        Schema::dropIfExists('browser_unsupported_features');
    }
};
