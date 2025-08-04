<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class RentalRateData extends Data
{
    public function __construct(
        public ?string $id,
        public ?string $rental_id,
        public ?float $day_quantity,
        public ?float $day_rate,
        public ?float $day_total,
        public ?float $extra_quantity,
        public ?float $extra_rate,
        public ?float $extra_total,
        public ?float $discount,
        public ?float $total,
    ) {}

    public static function rules(): array
    {
        return [
            'id' => ['nullable', 'uuid'],
            'rental_id' => ['nullable', 'uuid', 'exists:rentals,id'],
            'day_quantity' => ['nullable', 'numeric', 'min:0'],
            'day_rate' => ['nullable', 'numeric', 'min:0'],
            'day_total' => ['nullable', 'numeric', 'min:0'],
            'extra_quantity' => ['nullable', 'numeric', 'min:0'],
            'extra_rate' => ['nullable', 'numeric', 'min:0'],
            'extra_total' => ['nullable', 'numeric', 'min:0'],
            'discount' => ['nullable', 'numeric', 'min:0'],
            'total' => ['nullable', 'numeric', 'min:0'],
        ];
    }
}
