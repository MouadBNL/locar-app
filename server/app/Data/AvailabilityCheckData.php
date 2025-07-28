<?php

namespace App\Data;

use App\Models\Customer;
use App\Models\Vehicle;
use Carbon\Carbon;

class AvailabilityCheckData
{
    public function __construct(
        public ?Vehicle $vehicle,
        public ?Customer $customer,
        public Carbon $start_date,
        public Carbon $end_date,
        public ?AvailabilityCheckOptions $options,
    ) {}
}

class AvailabilityCheckOptions
{
    public function __construct(
        public ?string $ignore_rental = null,
        public ?string $ignore_reservation = null,
        public ?string $ignore_maintenance = null,
    ) {}
}
