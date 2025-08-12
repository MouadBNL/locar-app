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
        Schema::create('customer_ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('customer_id')->constrained('customers');
            $table->foreignUuid('rental_id')->nullable()->constrained('rentals');
            $table->decimal('rating', 10, 1)->default(2.5);
            $table->text('comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_ratings');
    }
};
