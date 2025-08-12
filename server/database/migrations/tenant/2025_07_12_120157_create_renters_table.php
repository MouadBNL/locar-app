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
        Schema::create('renters', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('rental_id')->constrained('rentals');
            $table->foreignUuid('customer_id')->nullable();

            // Identification information
            $table->string('full_name');
            $table->string('phone')->nullable();
            $table->date('birth_date')->nullable();
            $table->string('profession')->nullable();

            // ID card information
            $table->string('id_card_number')->nullable();
            $table->date('id_card_issuing_date')->nullable();
            $table->date('id_card_expiration_date')->nullable();
            $table->string('id_card_address')->nullable();

            // Driver's license information
            $table->string('driver_license_number')->nullable();
            $table->string('driver_license_issuing_city')->nullable();
            $table->date('driver_license_issuing_date')->nullable();
            $table->date('driver_license_expiration_date')->nullable();
            $table->string('driver_license_address')->nullable();

            // Passport information
            $table->string('passport_number')->nullable();
            $table->string('passport_country')->nullable();
            $table->date('passport_issuing_date')->nullable();
            $table->date('passport_expiration_date')->nullable();
            $table->string('passport_address')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('renters');
    }
};
