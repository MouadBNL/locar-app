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
        Schema::create('traffic_infractions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->dateTime('date')->nullable();
            $table->string('title')->nullable();
            $table->foreignUuid('document_id')->nullable()->constrained('documents');
            $table->string('location')->nullable();
            $table->foreignUuid('vehicle_id')->nullable()->constrained('vehicles');
            $table->foreignUuid('rental_id')->nullable()->constrained('rentals');
            $table->foreignUuid('customer_id')->nullable()->constrained('customers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('traffic_infractions');
    }
};
