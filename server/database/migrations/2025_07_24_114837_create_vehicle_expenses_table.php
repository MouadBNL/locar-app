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
        Schema::create('vehicle_expenses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('vehicle_id')->references('id')->on('vehicles');
            $table->enum('type', ['fuel', 'maintenance', 'repair', 'other']);
            $table->decimal('amount', 10, 2);
            $table->date('date')->nullable();
            $table->string('title')->nullable();
            $table->string('reference')->nullable();
            $table->uuid('receipt_document_id')->nullable()->references('id')->on('documents');
            $table->string('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_expenses');
    }
};
