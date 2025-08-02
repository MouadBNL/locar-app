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
        Schema::create('rental_rates', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('rental_id')->constrained('rentals');

            $table->decimal('day_quantity')->nullable();
            $table->decimal('day_rate', 10, 2)->nullable();
            $table->decimal('day_total', 10, 2)->nullable();

            $table->decimal('extra_quantity')->nullable();
            $table->decimal('extra_rate', 10, 2)->nullable();
            $table->decimal('extra_total', 10, 2)->nullable();

            $table->decimal('total', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rental_rates');
    }
};
