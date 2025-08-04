<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Vehicle;
use App\Services\GlobalStatisticsService;
use App\Services\VehicleStatisticsService;
use Carbon\Carbon;

class StatisticsController extends ApiController
{
    public function global()
    {
        $thisMonth = [
            'start' => Carbon::now()->subMonth(),
            'end' => Carbon::now(),
        ];
        $lastMonth = [
            'start' => Carbon::now()->subMonths(2),
            'end' => Carbon::now()->subMonth(),
        ];

        $thisMonthRevenue = GlobalStatisticsService::revenue($thisMonth['start'], $thisMonth['end']);
        $lastMonthRevenue = GlobalStatisticsService::revenue($lastMonth['start'], $lastMonth['end']);
        $thisMonthExpenses = GlobalStatisticsService::expenses($thisMonth['start'], $thisMonth['end']);
        $lastMonthExpenses = GlobalStatisticsService::expenses($lastMonth['start'], $lastMonth['end']);
        $thisMonthRentals = GlobalStatisticsService::rentalCount($thisMonth['start'], $thisMonth['end']);
        $lastMonthRentals = GlobalStatisticsService::rentalCount($lastMonth['start'], $lastMonth['end']);
        $thisMonthReservations = GlobalStatisticsService::reservationCount($thisMonth['start'], $thisMonth['end']);
        $lastMonthReservations = GlobalStatisticsService::reservationCount($lastMonth['start'], $lastMonth['end']);

        $stats = [
            'rental_count' => GlobalStatisticsService::rentalCount(null, null),
            'expenses_count' => GlobalStatisticsService::expensesCount(null, null),
            'reservation_count' => GlobalStatisticsService::reservationCount(null, null),
            'revenue' => GlobalStatisticsService::revenue(null, null),
            'expenses' => GlobalStatisticsService::expenses(null, null),
            'revenue_per_day' => GlobalStatisticsService::revenuePerDay(null, null),
            'expenses_per_day' => GlobalStatisticsService::expensesPerDay(null, null),
            'expenses_per_type' => GlobalStatisticsService::expensesPerType(null, null),
            'revenue_monthly_progress' => ($thisMonthRevenue - $lastMonthRevenue) / $lastMonthRevenue * 100,
            'expenses_monthly_progress' => ($thisMonthExpenses - $lastMonthExpenses) / $lastMonthExpenses * 100,
            'rentals_monthly_progress' => ($thisMonthRentals - $lastMonthRentals) / $lastMonthRentals * 100,
            'reservations_monthly_progress' => ($thisMonthReservations - $lastMonthReservations) / $lastMonthReservations * 100,
        ];

        return $this->success($stats);
    }

    public function vehicle(Vehicle $vehicle)
    {
        $thisMonth = [
            'start' => Carbon::now()->subMonth(),
            'end' => Carbon::now(),
        ];
        $lastMonth = [
            'start' => Carbon::now()->subMonths(2),
            'end' => Carbon::now()->subMonth(),
        ];

        $thisMonthRevenue = VehicleStatisticsService::revenue($vehicle, $thisMonth['start'], $thisMonth['end']);
        $lastMonthRevenue = VehicleStatisticsService::revenue($vehicle, $lastMonth['start'], $lastMonth['end']);
        $thisMonthExpenses = VehicleStatisticsService::expenses($vehicle, $thisMonth['start'], $thisMonth['end']);
        $lastMonthExpenses = VehicleStatisticsService::expenses($vehicle, $lastMonth['start'], $lastMonth['end']);
        $thisMonthRentals = VehicleStatisticsService::rentalCount($vehicle, $thisMonth['start'], $thisMonth['end']);
        $lastMonthRentals = VehicleStatisticsService::rentalCount($vehicle, $lastMonth['start'], $lastMonth['end']);
        $thisMonthReservations = VehicleStatisticsService::reservationCount($vehicle, $thisMonth['start'], $thisMonth['end']);
        $lastMonthReservations = VehicleStatisticsService::reservationCount($vehicle, $lastMonth['start'], $lastMonth['end']);
        $thisMonthRepairs = VehicleStatisticsService::repairsCount($vehicle, $thisMonth['start'], $thisMonth['end']);
        $lastMonthRepairs = VehicleStatisticsService::repairsCount($vehicle, $lastMonth['start'], $lastMonth['end']);

        $stats = [
            'rental_count' => VehicleStatisticsService::rentalCount($vehicle, null, null),
            'expenses_count' => VehicleStatisticsService::expensesCount($vehicle, null, null),
            'reservation_count' => VehicleStatisticsService::reservationCount($vehicle, null, null),
            'repairs_count' => VehicleStatisticsService::repairsCount($vehicle, null, null),
            'revenue' => VehicleStatisticsService::revenue($vehicle, null, null),
            'expenses' => VehicleStatisticsService::expenses($vehicle, null, null),
            'revenue_per_day' => VehicleStatisticsService::revenuePerDay($vehicle, null, null),
            'expenses_per_day' => VehicleStatisticsService::expensesPerDay($vehicle, null, null),
            'expenses_per_type' => VehicleStatisticsService::expensesPerType($vehicle, null, null),
            'revenue_monthly_progress' => ($thisMonthRevenue - $lastMonthRevenue) / $lastMonthRevenue * 100,
            'expenses_monthly_progress' => ($thisMonthExpenses - $lastMonthExpenses) / $lastMonthExpenses * 100,
            'rentals_monthly_progress' => ($thisMonthRentals - $lastMonthRentals) / $lastMonthRentals * 100,
            'reservations_monthly_progress' => ($thisMonthReservations - $lastMonthReservations) / $lastMonthReservations * 100,
            'repairs_monthly_progress' => ($thisMonthRepairs - $lastMonthRepairs) / $lastMonthRepairs * 100,
        ];

        return $this->success($stats);
    }
}
