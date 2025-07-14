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
        Schema::create('customers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('first_name');
            $table->string('last_name');
            $table->enum('gender', ['male', 'female']);

            // Identification information
            $table->string('id_card_number');
            $table->date('birth_date');
            $table->string('address');
            $table->string('address_secondary');
            $table->string('address_photo_url');

            // Contact information
            $table->string('phone')->nullable();
            $table->string('email')->nullable();

            // Passport information
            $table->string('passport_number');
            $table->string('passport_country');
            $table->date('passport_issuing_date');
            $table->date('passport_expiration_date');

            // Driver's license information
            $table->string('driver_license_number');
            $table->string('driver_license_city');
            $table->date('driver_license_issuing_date');
            $table->date('driver_license_expiration_date');
            $table->string('driver_license_photo_url');

            // Contact information
            $table->string('phone');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
