<?php

namespace App\Services;

use Carbon\Carbon;

class TimeframeService
{
    public function diffInDays(Carbon $departureDate, Carbon $returnDate): int
    {
        $diffInDays = $departureDate->diffInDays($returnDate);
        $days = $diffInDays - floor($diffInDays) > 0.2 ? (int) ceil($diffInDays) : (int) floor($diffInDays);

        return $days;
    }
}
