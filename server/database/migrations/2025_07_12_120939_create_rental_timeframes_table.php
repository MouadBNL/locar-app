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
        Schema::create('rental_timeframes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('rental_id')->constrained('rentals');
            $table->timestamp('departure_date');
            $table->dateTime('return_date');
            $table->dateTime('actual_departure_date')->nullable();
            $table->dateTime('actual_return_date')->nullable();
            $table->integer('total_hours')->nullable();
            $table->integer('total_days')->nullable();
            $table->integer('total_weeks')->nullable();
            $table->integer('total_months')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rental_timeframes');
    }
};
