<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class RentalData extends Data
{
    public function __construct(
        public string $id,
        public string $rental_number,
        public ?string $notes,
        public RentalTimeframeData $timeframe,
        public RentalVehicleData $vehicle,
        public RenterData $renter,
        public RentalRateData $rate,
    ) {}

    public function rules(): array
    {
        return [
            'id' => ['required', 'uuid'],
            'rental_number' => ['required', 'string', 'max:255', 'unique:rentals,rental_number'],
            'notes' => ['nullable', 'string', 'max:255'],
        ];
    }
}
