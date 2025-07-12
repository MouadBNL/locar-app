<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class RentalRateData extends Data
{
    public function __construct(
        public string $id,
        public string $rental_id,
        public ?float $day_quantity,
        public ?float $day_rate,
        public ?float $day_total,
        public ?float $week_quantity,
        public ?float $week_rate,
        public ?float $week_total,
        public ?float $month_quantity,
        public ?float $month_rate,
        public ?float $month_total,
        public ?float $insurance_quantity,
        public ?float $insurance_rate,
        public ?float $insurance_total,
        public ?float $extra_quantity,
        public ?float $extra_rate,
        public ?float $extra_total,
        public ?float $total,
    ) {}

    public function rules(): array
    {
        return [
            'id' => ['required', 'uuid'],
            'rental_id' => ['required', 'uuid', 'exists:rentals,id'],
            'day_quantity' => ['nullable', 'numeric', 'min:0'],
            'day_rate' => ['nullable', 'numeric', 'min:0'],
            'day_total' => ['nullable', 'numeric', 'min:0'],
            'week_quantity' => ['nullable', 'numeric', 'min:0'],
            'week_rate' => ['nullable', 'numeric', 'min:0'],
            'week_total' => ['nullable', 'numeric', 'min:0'],
            'month_quantity' => ['nullable', 'numeric', 'min:0'],
            'month_rate' => ['nullable', 'numeric', 'min:0'],
            'month_total' => ['nullable', 'numeric', 'min:0'],
            'insurance_quantity' => ['nullable', 'numeric', 'min:0'],
            'insurance_rate' => ['nullable', 'numeric', 'min:0'],
            'insurance_total' => ['nullable', 'numeric', 'min:0'],
            'extra_quantity' => ['nullable', 'numeric', 'min:0'],
            'extra_rate' => ['nullable', 'numeric', 'min:0'],
            'extra_total' => ['nullable', 'numeric', 'min:0'],
            'total' => ['nullable', 'numeric', 'min:0'],
        ];
    }
}
