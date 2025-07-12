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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('make');
            $table->string('model');
            $table->integer('year');
            $table->string('license_plate'); // should it be unique ?
            $table->integer('mileage')->default(0);
            $table->enum('fuel_type', ['gasoline', 'diesel', 'electric', 'hybrid']);
            $table->enum('transmission', ['AT', 'MT']);
            $table->integer('number_of_seats')->default(0);
            $table->integer('number_of_doors')->default(0);
            $table->string('color')->nullable();
            $table->string('photo_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
