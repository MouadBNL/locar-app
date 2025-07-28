<?php

namespace App\Data;

use Carbon\Carbon;
use Spatie\LaravelData\Data;

class AvailabilityData extends Data
{
    public function __construct(
        public bool $available,
        public string $message,
        public ?string $entity_blocked,
        public ?string $entity_blocker,
        public ?Carbon $start_date,
        public ?Carbon $end_date,
    ) {}
}
