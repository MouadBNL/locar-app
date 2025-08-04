<?php

namespace App\Data;

class AvailabilityCheckOptions
{
    public function __construct(
        public ?string $ignore_rental = null,
        public ?string $ignore_reservation = null,
        public ?string $ignore_maintenance = null,
    ) {}
}
