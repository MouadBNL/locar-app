<?php

namespace App\Services;

use App\Data\CalendarEventData;
use App\Enums\CalendarEventType;
use App\Http\Resources\CustomerSummaryResource;
use App\Http\Resources\VehicleSummaryResource;
use App\Models\Rental;
use App\Models\Reservation;
use App\Models\VehicleRepair;
use Carbon\Carbon;
use Illuminate\Contracts\Database\Query\Builder;

class CalendarService
{
    public function get(Carbon $start, Carbon $end)
    {
        $reservations = $this->getReservationEvents($start, $end);
        $rentalDepartures = $this->getRentalDepartureEvents($start, $end);
        $rentalReturns = $this->getRentalReturnEvents($start, $end);
        $repair = collect(); // $this->getRepairEvents($start, $end);

        return collect([
            ...$reservations,
            ...$rentalDepartures,
            ...$rentalReturns,
            ...$repair,
        ]);
    }

    public function getReservationEvents(Carbon $start, Carbon $end)
    {
        $reservations = Reservation::query()
            ->with('vehicle', 'customer')
            ->where(
                fn(Builder $query) => $query
                    ->where('check_in_date', '<=', $end->toDateString())
                    ->where('check_in_date', '>=', $start->toDateString())
            )
            ->get();

        return $reservations->map(function (Reservation $reservation) {
            return new CalendarEventData(
                id: $reservation->id,
                type: CalendarEventType::RESERVATION,
                all_day: true,
                title: $reservation->reservation_number,
                start: $reservation->check_in_date->toDateTimeString(),
                end: $reservation->check_in_date->addMinutes(15)->toDateTimeString(),
                vehicle: new VehicleSummaryResource($reservation->vehicle),
                customer: new CustomerSummaryResource($reservation->customer),
                entity_code: $reservation->reservation_number,
            );
        });
    }

    public function getRentalDepartureEvents(Carbon $start, Carbon $end)
    {
        $rentals = Rental::query()
            ->with('timeframe', 'renter.customer', 'vehicle.vehicle')
            ->whereHas('timeframe', function (Builder $query) use ($start, $end) {
                $query->where('departure_date', '<=', $end->toDateString())
                    ->where('departure_date', '>=', $start->toDateString());
            })
            ->get();

        return $rentals->map(function (Rental $rental) {
            return new CalendarEventData(
                id: $rental->id,
                type: CalendarEventType::RENTAL_DEPARTURE,
                all_day: false,
                title: $rental->rental_number,
                start: $rental->timeframe->departure_date->toDateTimeString(),
                end: $rental->timeframe->departure_date->addMinutes(15)->toDateTimeString(),
                vehicle: new VehicleSummaryResource($rental->vehicle),
                customer: new CustomerSummaryResource($rental->renter->customer),
                entity_code: $rental->rental_number,
            );
        });
    }

    public function getRentalReturnEvents(Carbon $start, Carbon $end)
    {
        $rentals = Rental::query()
            ->with('timeframe', 'renter.customer', 'vehicle.vehicle')
            ->whereHas('timeframe', function (Builder $query) use ($start, $end) {
                $query->where('return_date', '<=', $end->toDateString())
                    ->where('return_date', '>=', $start->toDateString());
            })
            ->get();

        return $rentals->map(function (Rental $rental) {
            return new CalendarEventData(
                id: $rental->id,
                type: CalendarEventType::RENTAL_RETURN,
                all_day: false,
                title: $rental->rental_number,
                start: $rental->timeframe->return_date->toDateTimeString(),
                end: $rental->timeframe->return_date->addMinutes(15)->toDateTimeString(),
                vehicle: new VehicleSummaryResource($rental->vehicle->vehicle),
                customer: new CustomerSummaryResource($rental->renter->customer),
                entity_code: $rental->rental_number,
            );
        });
    }

    public function getRepairEvents(Carbon $start, Carbon $end)
    {
        $repair = VehicleRepair::query()
            ->with('vehicle')
            ->where('cancelled_at', null)
            ->where('started_at', '<=', $end->toDateTimeString())
            ->where(function ($query) use ($start) {
                $query->where('finished_at', '>=', $start->toDateTimeString())
                    ->orWhereNull('finished_at');
            })
            ->get();

        return $repair->map(function (VehicleRepair $repair) {
            return new CalendarEventData(
                id: $repair->id,
                type: CalendarEventType::REPAIR,
                all_day: false,
                title: $repair->title,
                start: $repair->started_at?->toDateTimeString(),
                end: $repair->finished_at?->toDateTimeString(),
                vehicle: new VehicleSummaryResource($repair->vehicle),
                customer: null,
                entity_code: null,
            );
        });
    }
}
