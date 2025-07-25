<?php

namespace App\Services;

use App\Data\AvailabilityCheckData;
use App\Data\AvailabilityCheckOptions;
use App\Data\AvailabilityData;
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

    public function check(AvailabilityCheckData $data): AvailabilityData
    {
        if ($data->customer) {
            $customerAvailability = $this->checkCustomerAvailability(
                $data->customer,
                $data->start_date,
                $data->end_date,
                $data->options,
            );
            if (!$customerAvailability->available) {
                return $customerAvailability;
            }
        }

        if ($data->vehicle) {
            $vehicleAvailability = $this->checkVehicleAvailability(
                $data->vehicle,
                $data->start_date,
                $data->end_date,
                $data->options,
            );
            if (!$vehicleAvailability->available) {
                return $vehicleAvailability;
            }
        }

        return new AvailabilityData(
            available: true,
            message: '=available',
            start_date: null,
            end_date: null,
            entity_blocked: null,
            entity_blocker: null,
        );
    }

    public function checkCustomerAvailability(
        Customer $customer,
        Carbon $startDate,
        Carbon $endDate,
        ?AvailabilityCheckOptions $options = null,
    ): AvailabilityData {
        $startDate = $startDate->toISOString();
        $endDate = $endDate->toISOString();

        Log::info('Checking customer availability', [
            'customer_id' => $customer->id,
            'start_date' => $startDate,
            'end_date' => $endDate,
        ]);

        /** @var ?Renter $collidingRental */
        $collidingRental = $customer->renters()
            ->whereHas('rental', function ($query) use ($options) {
                if ($options && $options->ignore_rental) {
                    $query->where('id', '!=', $options->ignore_rental);
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
            return new AvailabilityData(
                available: false,
                message: 'customer.unavailable.rental',
                entity_blocked: 'customer',
                entity_blocker: 'rental',
                start_date: $collidingRental->rental->timeframe->departure_date,
                end_date: $collidingRental->rental->timeframe->return_date,
            );
        }

        /** @var ?Reservation $collidingReservation */
        $collidingReservation = $customer->reservations()
            ->where('id', '!=', $options && $options->ignore_reservation ? $options->ignore_reservation : null)
            ->where(function ($query) use ($startDate, $endDate) {
                $query->where(function ($q) use ($startDate, $endDate) {
                    $q->where('check_in_date', '<', $endDate)
                        ->where('check_out_date', '>', $startDate);
                });
            })
            ->first();

        if ($collidingReservation) {
            return new AvailabilityData(
                available: false,
                message: 'customer.unavailable.reservation',
                entity_blocked: 'customer',
                entity_blocker: 'reservation',
                start_date: $collidingReservation->check_in_date,
                end_date: $collidingReservation->check_out_date,
            );
        }

        return new AvailabilityData(
            available: true,
            message: 'customer.available',
            start_date: null,
            end_date: null,
            entity_blocked: null,
            entity_blocker: null,
        );
    }

    public function checkVehicleAvailability(
        Vehicle $vehicle,
        Carbon $startDate,
        Carbon $endDate,
        ?AvailabilityCheckOptions $options = null,
    ): AvailabilityData {
        $startDate = $startDate->toISOString();
        $endDate = $endDate->toISOString();

        Log::info('Checking vehicle availability', [
            'vehicle_id' => $vehicle->id,
            'start_date' => $startDate,
            'end_date' => $endDate,
        ]);

        /** @var ?RentalVehicle $collidingRental */
        $collidingRental = $vehicle->rentalVehicles()
            ->whereHas('rental', function ($query) use ($options) {
                if ($options && $options->ignore_rental) {
                    $query->where('id', '!=', $options->ignore_rental);
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
            return new AvailabilityData(
                available: false,
                message: 'vehicle.unavailable.rental',
                entity_blocked: 'vehicle',
                entity_blocker: 'rental',
                start_date: $collidingRental->rental->timeframe->departure_date,
                end_date: $collidingRental->rental->timeframe->return_date,
            );
        }

        /** @var ?Reservation $collidingReservation */
        $collidingReservation = $vehicle->reservations()
            ->where('id', '!=', $options && $options->ignore_reservation ? $options->ignore_reservation : null)
            ->where(function ($query) use ($startDate, $endDate) {
                $query->where(function ($q) use ($startDate, $endDate) {
                    $q->where('check_in_date', '<', $endDate)
                        ->where('check_out_date', '>', $startDate);
                });
            })
            ->first();

        if ($collidingReservation) {
            return new AvailabilityData(
                available: false,
                message: 'vehicle.unavailable.reservation',
                entity_blocked: 'vehicle',
                entity_blocker: 'reservation',
                start_date: $collidingReservation->check_in_date,
                end_date: $collidingReservation->check_out_date,
            );
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
            return new AvailabilityData(
                available: false,
                message: 'vehicle.unavailable.maintenance',
                entity_blocked: 'vehicle',
                entity_blocker: 'maintenance',
                start_date: $collidingMaintenance->started_at,
                end_date: $collidingMaintenance->finished_at,
            );
        }

        return new AvailabilityData(
            available: true,
            message: 'vehicle.available',
            start_date: null,
            end_date: null,
            entity_blocked: null,
            entity_blocker: null,
        );
    }
}
