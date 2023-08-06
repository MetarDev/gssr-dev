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
        Schema::create('browsers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('type', [Browser::TYPE_DESKTOP, Browser::TYPE_MOBILE]);
            $table->string('long_name');
            $table->string('abbr');
            $table->string('prefix');
            $table->string('version');
            $table->float('usage_global', 7, 5, true); // % with 5 decimals, same as in caniuse dataset
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('browsers');
    }
};
