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
