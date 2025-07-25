<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\RentalVehicle;
use App\Models\Renter;
use App\Models\Reservation;
use App\Models\Vehicle;
use App\Models\VehicleMaintenance;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class AvailabilityCheckService
{
    /**
     * @param ?array{type: "rental" | "reservation", id: string} $current
     * @return array{available: bool, message: string, start_date: Carbon, end_date: Carbon}
     */
    public function checkCustomerAvailability(Customer $customer, Carbon $startDate, Carbon $endDate, ?array $current = null)
    {
        $startDate = $startDate->toISOString();
        $endDate = $endDate->toISOString();

        Log::info('Checking customer availability', [
            'customer_id' => $customer->id,
            'start_date' => $startDate,
            'end_date' => $endDate,
        ]);

        /** @var ?Renter $collidingRental */
        $collidingRental = $customer->renters()
            ->whereHas('rental', function ($query) use ($current) {
                if ($current && $current['type'] === 'rental') {
                    $query->where('id', '!=', $current['id']);
                }
            })
            ->whereHas('rental.timeframe', function ($query) use ($startDate, $endDate) {
                $query->where(function ($q) use ($startDate, $endDate) {
                    $q->where('departure_date', '<', $endDate)
                        ->where('return_date', '>', $startDate);
                });
            })
            ->first();

        if ($collidingRental) {
            return [
                'available' => false,
                'message' => 'customer.unavailable.rental',
                'start_date' => $collidingRental->rental->timeframe->departure_date,
                'end_date' => $collidingRental->rental->timeframe->return_date,
            ];
        }

        /** @var ?Reservation $collidingReservation */
        $collidingReservation = $customer->reservations()
            ->where('id', '!=', $current && $current['type'] === 'reservation' ? $current['id'] : null)
            ->where(function ($query) use ($startDate, $endDate) {
                $query->where(function ($q) use ($startDate, $endDate) {
                    $q->where('check_in_date', '<', $endDate)
                        ->where('check_out_date', '>', $startDate);
                });
            })
            ->first();

        if ($collidingReservation) {
            return [
                'available' => false,
                'message' => 'customer.unavailable.reservation',
                'start_date' => $collidingReservation->check_in_date,
                'end_date' => $collidingReservation->check_out_date,
            ];
        }

        return [
            'available' => true,
            'message' => 'customer.available',
        ];
    }

    public function checkVehicleAvailability(Vehicle $vehicle, Carbon $startDate, Carbon $endDate, ?array $current = null)
    {
        $startDate = $startDate->toISOString();
        $endDate = $endDate->toISOString();

        Log::info('Checking vehicle availability', [
            'vehicle_id' => $vehicle->id,
            'start_date' => $startDate,
            'end_date' => $endDate,
        ]);

        /** @var ?RentalVehicle $collidingRental */
        $collidingRental = $vehicle->rentalVehicles()
            ->whereHas('rental', function ($query) use ($current) {
                if ($current && $current['type'] === 'rental') {
                    $query->where('id', '!=', $current['id']);
                }
            })
            ->whereHas('rental.timeframe', function ($query) use ($startDate, $endDate) {
                $query->where(function ($q) use ($startDate, $endDate) {
                    $q->where('departure_date', '<', $endDate)
                        ->where('return_date', '>', $startDate);
                });
            })
            ->first();

        if ($collidingRental) {
            return [
                'available' => false,
                'message' => 'vehicle.unavailable.rental',
                'start_date' => $collidingRental->rental->timeframe->departure_date,
                'end_date' => $collidingRental->rental->timeframe->return_date,
            ];
        }

        /** @var ?Reservation $collidingReservation */
        $collidingReservation = $vehicle->reservations()
            ->where('id', '!=', $current && $current['type'] === 'reservation' ? $current['id'] : null)
            ->where(function ($query) use ($startDate, $endDate) {
                $query->where(function ($q) use ($startDate, $endDate) {
                    $q->where('check_in_date', '<', $endDate)
                        ->where('check_out_date', '>', $startDate);
                });
            })
            ->first();

        if ($collidingReservation) {
            return [
                'available' => false,
                'message' => 'vehicle.unavailable.reservation',
                'start_date' => $collidingReservation->check_in_date,
                'end_date' => $collidingReservation->check_out_date,
            ];
        }

        /** @var ?VehicleMaintenance $collidingMaintenance */
        $collidingMaintenance = $vehicle->maintenances()
            ->where(function ($query) use ($startDate, $endDate) {
                $query->where(function ($q) use ($startDate, $endDate) {
                    $q->where('started_at', '<', $endDate)
                        ->where('finished_at', '>', $startDate);
                });
            })
            ->first();

        if ($collidingMaintenance) {
            return [
                'available' => false,
                'message' => 'vehicle.unavailable.maintenance',
                'start_date' => $collidingMaintenance->started_at,
                'end_date' => $collidingMaintenance->finished_at,
            ];
        }

        return [
            'available' => true,
            'message' => 'customer.available',
        ];
    }
}
