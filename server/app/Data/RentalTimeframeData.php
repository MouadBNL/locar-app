<?php

namespace App\Data;

use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;

class RentalTimeframeData extends Data
{
    public function __construct(
        public CarbonImmutable $departure_date,
        public CarbonImmutable $return_date,
        public ?CarbonImmutable $actual_departure_date = null,
        public ?CarbonImmutable $actual_return_date = null,
        public ?int $total_hours = null,
        public ?int $total_days = null,
        public ?int $total_weeks = null,
        public ?int $total_months = null,
    ) {}

    public function rules(): array
    {
        return [
            'departure_date' => ['required', 'date'],
            'return_date' => ['required', 'date', 'after:departure_date'],
            'actual_departure_date' => ['nullable', 'date', 'before:return_date'],
            'actual_return_date' => ['nullable', 'date', 'after:actual_departure_date'],
            'total_hours' => ['nullable', 'integer', 'min:0'],
            'total_days' => ['nullable', 'integer', 'min:0'],
            'total_weeks' => ['nullable', 'integer', 'min:0'],
            'total_months' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
