<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\User;
use App\Models\Vehicle;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            DemoSeeder::class,
        ]);
        // User::create([
        //     'name' => 'Admin User',
        //     'email' => 'admin@email.com',
        //     'password' => Hash::make('password'),
        // ]);
        // Customer::factory(20)->create();
        // Vehicle::factory(10)->create();
    }
}
