<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class RentalVehicleData extends Data
{
    public function __construct(
        public ?string  $vehicle_id,
        public string   $make,
        public string   $model,
        public int      $year,
        public string   $license_plate,
    ) {}

    public function rules(): array
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
