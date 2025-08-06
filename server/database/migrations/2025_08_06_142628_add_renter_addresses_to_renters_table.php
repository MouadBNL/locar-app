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
        Schema::table('renters', function (Blueprint $table) {
            $table->string('id_card_address')->nullable();
            $table->string('driver_license_address')->nullable();
            $table->string('passport_address')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('renters', function (Blueprint $table) {
            $table->dropColumn('id_card_address');
            $table->dropColumn('driver_license_address');
            $table->dropColumn('passport_address');
        });
    }
};
