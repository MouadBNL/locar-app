<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class RentalVehicleData extends Data
{
    public function __construct(
        public ?string $id,
        public ?string $vehicle_id,
        public string $make,
        public string $model,
        public int $year,
        public string $license_plate,
        // metadata
        public ?string $color,
        public ?string $transmission,
        public ?int $seats,
        public ?int $doors,
        public ?string $fuel_type,
        public ?int $mileage,
    ) {}

    public static function rules(): array
    {
        return [
            'vehicle_id' => ['nullable', 'uuid', 'exists:vehicles,id'],
            'make' => ['required', 'string'],
            'model' => ['required', 'string'],
            'year' => ['required', 'integer', 'min:1900', 'max:3000'],
            'license_plate' => ['required', 'string', 'max:255'],
        ];
    }
}
