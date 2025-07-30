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
        Schema::create('vehicle_maintenances', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('vehicle_id')->references('id')->on('vehicles');
            $table->dateTime('started_at')->nullable();
            $table->dateTime('finished_at')->nullable();
            $table->dateTime('cancelled_at')->nullable();
            $table->string('title')->nullable();
            $table->string('reference')->nullable();
            $table->string('notes')->nullable();
            $table->uuid('receipt_document_id')->nullable()->references('id')->on('documents');
            $table->timestamps();
        });

        Schema::table('vehicle_expenses', function (Blueprint $table) {
            $table->foreignUuid('vehicle_maintenance_id')->nullable()->references('id')->on('vehicle_maintenances')->after('vehicle_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehicle_expenses', function (Blueprint $table) {
            $table->dropForeign(['vehicle_maintenance_id']);
            $table->dropColumn('vehicle_maintenance_id');
        });
        Schema::dropIfExists('vehicle_maintenances');
    }
};
