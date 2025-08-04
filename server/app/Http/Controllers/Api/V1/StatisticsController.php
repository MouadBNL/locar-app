<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Vehicle;
use App\Services\VehicleStatisticsService;

class StatisticsController extends ApiController
{
    public function vehicle(Vehicle $vehicle)
    {
        $stats = [
            'rental_count' => VehicleStatisticsService::rentalCount($vehicle, null, null),
            'expenses_count' => VehicleStatisticsService::expensesCount($vehicle, null, null),
            'reservation_count' => VehicleStatisticsService::reservationCount($vehicle, null, null),
            'repairs_count' => VehicleStatisticsService::repairsCount($vehicle, null, null),
            'revenue' => VehicleStatisticsService::revenue($vehicle, null, null),
            'expenses' => VehicleStatisticsService::expenses($vehicle, null, null),
            'revenue_per_day' => VehicleStatisticsService::revenuePerDay($vehicle,  null, null),
            'expenses_per_day' => VehicleStatisticsService::expensesPerDay($vehicle, null, null),
            'expenses_per_type' => VehicleStatisticsService::expensesPerType($vehicle, null, null),
        ];
        return $this->success($stats);
    }
}
