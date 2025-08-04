<?php

namespace App\Services;

use App\Models\Rental;
use App\Models\Reservation;
use App\Models\Vehicle;
use App\Models\VehicleExpense;
use App\Models\VehicleRepair;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class VehicleStatisticsService
{
    public static function rentalCount(Vehicle $vehicle, ?Carbon $startDate, ?Carbon $endDate)
    {
        return Rental::with('timeframe')
            ->whereHas('vehicle', function ($query) use ($vehicle) {
                $query->where('vehicle_id', $vehicle->id);
            })
            ->whereHas('timeframe', function ($query) use ($startDate, $endDate) {
                if ($startDate) {
                    $query->where('departure_date', '>=', $startDate->toDateTimeString());
                }
                if ($endDate) {
                    $query->where('return_date', '<=', $endDate->toDateTimeString());
                }
            })
            ->count();
    }

    public static function expensesCount(Vehicle $vehicle, ?Carbon $startDate, ?Carbon $endDate)
    {
        return VehicleExpense::query()
            ->where('vehicle_id', $vehicle->id)
            ->where(function ($query) use ($startDate, $endDate) {
                if ($startDate) {
                    $query->where('date', '>=', $startDate->toDateTimeString());
                }
                if ($endDate) {
                    $query->where('date', '<=', $endDate->toDateTimeString());
                }
            })
            ->count();
    }

    public static function reservationCount(Vehicle $vehicle, ?Carbon $startDate, ?Carbon $endDate)
    {
        return Reservation::query()
            ->where('vehicle_id', $vehicle->id)
            ->where(function ($query) use ($startDate, $endDate) {
                if ($startDate) {
                    $query->where('check_in_date', '>=', $startDate->toDateTimeString());
                }
                if ($endDate) {
                    $query->where('check_out_date', '<=', $endDate->toDateTimeString());
                }
            })
            ->count();
    }

    public static function repairsCount(Vehicle $vehicle, ?Carbon $startDate, ?Carbon $endDate)
    {
        return VehicleRepair::query()
            ->where('vehicle_id', $vehicle->id)
            ->where('cancelled_at', null)
            ->where(function ($query) use ($startDate, $endDate) {
                if ($startDate) {
                    $query->where('started_at', '>=', $startDate->toDateTimeString());
                }
                if ($endDate) {
                    $query->where('finished_at', '<=', $endDate->toDateTimeString());
                }
            })
            ->count();
    }

    public static function revenue(Vehicle $vehicle, ?Carbon $startDate, ?Carbon $endDate)
    {
        return Rental::with('timeframe', 'payments', 'rate')
            ->whereHas('vehicle', function ($query) use ($vehicle) {
                $query->where('vehicle_id', $vehicle->id);
            })
            ->whereHas('timeframe', function ($query) use ($startDate, $endDate) {
                if ($startDate) {
                    $query->where('departure_date', '>=', $startDate->toDateTimeString());
                }
                if ($endDate) {
                    $query->where('return_date', '<=', $endDate->toDateTimeString());
                }
            })
            ->get()
            ->map(function ($rental) {
                return $rental->rate->total;
            })
            ->sum();
    }

    public static function expenses(Vehicle $vehicle, ?Carbon $startDate, ?Carbon $endDate)
    {
        return VehicleExpense::query()
            ->where('vehicle_id', $vehicle->id)
            ->where(function ($query) use ($startDate, $endDate) {
                if ($startDate) {
                    $query->where('date', '>=', $startDate->toDateTimeString());
                }
                if ($endDate) {
                    $query->where('date', '<=', $endDate->toDateTimeString());
                }
            })
            ->get()
            ->map(function ($expense) {
                return $expense->amount;
            })
            ->sum();
    }

    public static function revenuePerDay(Vehicle $vehicle, ?Carbon $startDate, ?Carbon $endDate)
    {
        return DB::table('rentals')
            ->join('rental_vehicles', 'rentals.id', '=', 'rental_vehicles.rental_id')
            ->join('rental_timeframes', 'rentals.id', '=', 'rental_timeframes.rental_id')
            ->join('rental_rates', 'rentals.id', '=', 'rental_rates.rental_id')
            ->where('rental_vehicles.vehicle_id', $vehicle->id)
            ->when($startDate, fn ($query) => $query->where('rental_timeframes.departure_date', '>=', $startDate->toDateTimeString()))
            ->when($endDate, fn ($query) => $query->where('rental_timeframes.return_date', '<=', $endDate->toDateTimeString()))
            ->selectRaw("strftime('%Y-%m-%d', rental_timeframes.departure_date) as day, SUM(rental_rates.total) as total, COUNT(*) as count")
            ->groupBy('day')
            ->orderBy('day')
            ->get();
    }

    public static function expensesPerDay(Vehicle $vehicle, ?Carbon $startDate, ?Carbon $endDate)
    {
        return DB::table('vehicle_expenses')
            ->where('vehicle_id', $vehicle->id)
            ->when($startDate, fn ($query) => $query->where('date', '>=', $startDate->toDateTimeString()))
            ->when($endDate, fn ($query) => $query->where('date', '<=', $endDate->toDateTimeString()))
            ->selectRaw("strftime('%Y-%m-%d', date) as day, SUM(amount) as total, COUNT(*) as count")
            ->groupBy('day')
            ->orderBy('day')
            ->get();
    }

    public static function expensesPerType(Vehicle $vehicle, ?Carbon $startDate, ?Carbon $endDate)
    {
        return DB::table('vehicle_expenses')
            ->where('vehicle_id', $vehicle->id)
            ->when($startDate, fn ($query) => $query->where('date', '>=', $startDate->toDateTimeString()))
            ->when($endDate, fn ($query) => $query->where('date', '<=', $endDate->toDateTimeString()))
            ->selectRaw('type, SUM(amount) as total, COUNT(*) as count')
            ->groupBy('type')
            ->orderBy('type')
            ->get();
    }

    public static function getStatistics(Vehicle $vehicle, ?Carbon $startDate, ?Carbon $endDate)
    {
        return [
            'rental_count' => self::rentalCount($vehicle, $startDate, $endDate),
            'expenses_count' => self::expensesCount($vehicle, $startDate, $endDate),
            'reservation_count' => self::reservationCount($vehicle, $startDate, $endDate),
            'repairs_count' => self::repairsCount($vehicle, $startDate, $endDate),
            'revenue' => self::revenue($vehicle, $startDate, $endDate),
            'expenses' => self::expenses($vehicle, $startDate, $endDate),
            'revenue_per_day' => self::revenuePerDay($vehicle, $startDate, $endDate),
            'expenses_per_day' => self::expensesPerDay($vehicle, $startDate, $endDate),
            'expenses_per_type' => self::expensesPerType($vehicle, $startDate, $endDate),
        ];
    }
}
