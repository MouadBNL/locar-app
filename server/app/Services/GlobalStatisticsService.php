<?php

namespace App\Services;

use App\Models\Rental;
use App\Models\Reservation;
use App\Models\VehicleExpense;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class GlobalStatisticsService
{
    public static function rentalCount(?Carbon $startDate, ?Carbon $endDate)
    {
        return Rental::with('timeframe')
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

    public static function expensesCount(?Carbon $startDate, ?Carbon $endDate)
    {
        return VehicleExpense::query()
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

    public static function reservationCount(?Carbon $startDate, ?Carbon $endDate)
    {
        return Reservation::query()
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

    public static function revenue(?Carbon $startDate, ?Carbon $endDate)
    {
        return Rental::with('timeframe', 'payments', 'rate')
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

    public static function expenses(?Carbon $startDate, ?Carbon $endDate)
    {
        return VehicleExpense::query()
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

    public static function revenuePerDay(?Carbon $startDate, ?Carbon $endDate)
    {
        return  DB::table('rentals')
            ->join('rental_vehicles', 'rentals.id', '=', 'rental_vehicles.rental_id')
            ->join('rental_timeframes', 'rentals.id', '=', 'rental_timeframes.rental_id')
            ->join('rental_rates', 'rentals.id', '=', 'rental_rates.rental_id')
            ->when($startDate, fn($query) => $query->where('rental_timeframes.departure_date', '>=', $startDate->toDateTimeString()))
            ->when($endDate, fn($query) => $query->where('rental_timeframes.return_date', '<=', $endDate->toDateTimeString()))
            ->selectRaw("strftime('%Y-%m-%d', rental_timeframes.departure_date) as day, SUM(rental_rates.total) as total, COUNT(*) as count")
            ->groupBy('day')
            ->orderBy('day')
            ->get();
    }

    public static function expensesPerDay(?Carbon $startDate, ?Carbon $endDate)
    {
        return  DB::table('vehicle_expenses')
            ->when($startDate, fn($query) => $query->where('date', '>=', $startDate->toDateTimeString()))
            ->when($endDate, fn($query) => $query->where('date', '<=', $endDate->toDateTimeString()))
            ->selectRaw("strftime('%Y-%m-%d', date) as day, SUM(amount) as total, COUNT(*) as count")
            ->groupBy('day')
            ->orderBy('day')
            ->get();
    }

    public static function expensesPerType(?Carbon $startDate, ?Carbon $endDate)
    {
        return  DB::table('vehicle_expenses')
            ->when($startDate, fn($query) => $query->where('date', '>=', $startDate->toDateTimeString()))
            ->when($endDate, fn($query) => $query->where('date', '<=', $endDate->toDateTimeString()))
            ->selectRaw("type, SUM(amount) as total, COUNT(*) as count")
            ->groupBy('type')
            ->orderBy('type')
            ->get();
    }

    public static function getStatistics(?Carbon $startDate, ?Carbon $endDate)
    {
        return [
            'rental_count' => self::rentalCount($startDate, $endDate),
            'expenses_count' => self::expensesCount($startDate, $endDate),
            'reservation_count' => self::reservationCount($startDate, $endDate),
            'revenue' => self::revenue($startDate, $endDate),
            'expenses' => self::expenses($startDate, $endDate),
            'revenue_per_day' => self::revenuePerDay($startDate, $endDate),
            'expenses_per_day' => self::expensesPerDay($startDate, $endDate),
            'expenses_per_type' => self::expensesPerType($startDate, $endDate),
        ];
    }
}
