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
        Schema::create('rental_vehicles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('rental_id')->constrained('rentals');
            $table->foreignUuid('vehicle_id')->nullable();
            $table->string('make');
            $table->string('model');
            $table->integer('year');
            $table->string('license_plate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rental_vehicles');
    }
};
