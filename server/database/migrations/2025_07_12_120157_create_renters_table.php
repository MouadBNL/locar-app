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
            $table->string('full_name');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();

            // Identification information
            $table->string('id_card_number')->nullable();
            $table->date('birth_date')->nullable();
            $table->string('address_primary');
            $table->string('profession')->nullable();
            $table->string('address_primary');
            $table->string('address_secondary')->nullable();
            $table->string('id_card_scan_document')->nullable();

            // Driver's license information
            $table->string('driver_license_number')->nullable();
            $table->string('driver_license_issuing_city')->nullable();
            $table->date('driver_license_issuing_date')->nullable();
            $table->date('driver_license_expiration_date')->nullable();
            $table->string('driver_license_scan_document')->nullable();

            // Passport information
            $table->string('passport_number')->nullable();
            $table->string('passport_country')->nullable();
            $table->date('passport_issuing_date')->nullable();
            $table->date('passport_expiration_date')->nullable();
            $table->string('passport_scan_document')->nullable();

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
