<?php

namespace App\Data;

use App\Enums\CalendarEventType;
use App\Http\Resources\CustomerSummaryResource;
use App\Http\Resources\VehicleSummaryResource;
use Spatie\LaravelData\Data;

class CalendarEventData extends Data
{
    public function __construct(
        public string $id,
        public CalendarEventType $type,
        public string $title,
        public string $start,
        public string $end,
        public ?VehicleSummaryResource $vehicle,
        public ?CustomerSummaryResource $customer,
        public ?bool $all_day = false,
    ) {}
}
