<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $makes = [
            'Toyota',
            'Honda',
            'Ford',
            'Chevrolet',
            'Volkswagen',
            'BMW',
            'Mercedes-Benz',
            'Audi',
            'Hyundai',
            'Kia'
        ];

        $models = [
            'Toyota' => ['Corolla', 'Camry', 'RAV4', 'Highlander', 'Prius'],
            'Honda' => ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V'],
            'Ford' => ['F-150', 'Escape', 'Explorer', 'Mustang', 'Focus'],
            'Chevrolet' => ['Silverado', 'Equinox', 'Malibu', 'Traverse', 'Tahoe'],
            'Volkswagen' => ['Golf', 'Passat', 'Tiguan', 'Atlas', 'Jetta'],
            'BMW' => ['3 Series', '5 Series', 'X3', 'X5', '7 Series'],
            'Mercedes-Benz' => ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
            'Audi' => ['A3', 'A4', 'Q5', 'Q7', 'A6'],
            'Hyundai' => ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona'],
            'Kia' => ['Forte', 'Optima', 'Sportage', 'Telluride', 'Sorento']
        ];

        $make = fake()->randomElement($makes);

        return [
            'make' => $make,
            'model' => fake()->randomElement($models[$make]),
            'first_service_date' => fake()->dateTimeBetween('-5 years', 'now'),
            'license_plate' => fake()->unique()->regexify('[0-9]{6} \- [A-Z]{1} \- [1-9]{1}'),
            'vin' => fake()->unique()->regexify('[A-Z0-9]{17}'),
            'mileage' => fake()->numberBetween(10000, 500000),
            'fuel_type' => fake()->randomElement(['gasoline', 'diesel', 'electric', 'hybrid']),
            'transmission' => fake()->randomElement(['AT', 'MT']),
            'number_of_seats' => fake()->numberBetween(2, 8),
            'number_of_doors' => fake()->numberBetween(2, 5),
            'color' => fake()->colorName,
            'photo_url' => fake()->imageUrl,
        ];
    }
}
