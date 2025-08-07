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
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->date('birth_date')->nullable();

            $table->string('id_card_number')->nullable();
            $table->date('id_card_issuing_date')->nullable();
            $table->date('id_card_expiration_date')->nullable();
            $table->string('id_card_address')->nullable();

            $table->string('driver_license_number')->nullable();
            $table->date('driver_license_issuing_date')->nullable();
            $table->date('driver_license_expiration_date')->nullable();
            $table->string('driver_license_address')->nullable();

            $table->string('passport_number')->nullable();
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
        Schema::dropIfExists('customers');
    }
};
