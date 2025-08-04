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
        Schema::create('reservations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('reservation_number')->unique();
            $table->foreignUuid('customer_id')->constrained('customers');
            $table->foreignUuid('vehicle_id')->constrained('vehicles');
            $table->date('check_in_date');
            $table->date('check_out_date');
            $table->decimal('daily_rate', 10, 2);
            $table->integer('total_days');
            $table->decimal('total_price', 10, 2);
            $table->decimal('deposit', 10, 2)->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
