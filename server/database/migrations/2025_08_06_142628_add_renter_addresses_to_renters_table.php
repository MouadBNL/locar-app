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
            if (!Schema::hasColumn('renters', 'id_card_address')) {
                $table->string('id_card_address')->nullable();
            }
        
            if (!Schema::hasColumn('renters', 'driver_license_address')) {
                $table->string('driver_license_address')->nullable();
            }
        
            if (!Schema::hasColumn('renters', 'passport_address')) {
                $table->string('passport_address')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('renters', function (Blueprint $table) {
            if (Schema::hasColumn('renters', 'id_card_address')) {
                $table->dropColumn('id_card_address');
            }
            if (Schema::hasColumn('renters', 'driver_license_address')) {
                $table->dropColumn('driver_license_address');
            }
            if (Schema::hasColumn('renters', 'passport_address')) {
                $table->dropColumn('passport_address');
            }
        });
    }
};
