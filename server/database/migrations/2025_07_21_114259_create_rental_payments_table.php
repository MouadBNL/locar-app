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
        Schema::create('rental_payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('rental_id')->constrained('rentals');
            $table->enum('type', ['normal', 'deposit', 'refund', 'other'])->default('normal');
            $table->enum('method', ['cash', 'card', 'bank_transfer', 'cheque', 'other'])->default('cash');
            $table->decimal('amount', 10, 2);
            $table->dateTime('date');
            $table->uuid('receipt_document_id')->nullable();
            $table->string('reference')->nullable();
            $table->string('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rental_payments');
    }
};
