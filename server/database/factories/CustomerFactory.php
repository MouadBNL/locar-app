<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName,
            'last_name' => fake()->lastName,
            'phone' => fake()->phoneNumber,
            'id_card_number' => fake()->unique()->regexify('[A-Z]{2}[0-9]{10}'),
            'driver_license_number' => fake()->unique()->regexify('[0-9]{10}'),
            'passport_number' => fake()->unique()->regexify('[0-9A-Z]{24}'),
            'birth_date' => fake()->date,
        ];
    }
}
