<?php

namespace App\Http\Controllers\Api\V1;

use App\Data\AvailabilityCheckData;
use App\Data\AvailabilityCheckOptions;
use App\Http\Requests\ReservationCreateRequest;
use App\Http\Requests\ReservationUpdateRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Customer;
use App\Models\Reservation;
use App\Models\Vehicle;
use App\Services\AvailabilityCheckService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReservationController extends ApiController
{
    public function __construct(
        private AvailabilityCheckService $availabilityCheckService
    ) {}

    public function index(Request $request)
    {
        $query = Reservation::with(['vehicle', 'customer']);

        if ($request->has('vehicle_id')) {
            $query->where('vehicle_id', $request->vehicle_id);
        }

        if ($request->has('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }

        $reservations = $query->orderBy('check_in_date', 'desc')->get();

        return $this->success(ReservationResource::collection($reservations));
    }

    public function show(Reservation $reservation)
    {
        return $this->success(new ReservationResource($reservation));
    }

    public function store(ReservationCreateRequest $request)
    {
        $data = $request->validated();

        $availability = $this->availabilityCheckService->check(new AvailabilityCheckData(
            vehicle: Vehicle::findOrFail($data['vehicle_id']),
            customer: Customer::findOrFail($data['customer_id']),
            start_date: Carbon::parse($data['check_in_date']),
            end_date: Carbon::parse($data['check_out_date']),
            options: null,
        ));
        if (! $availability->available) {
            return $this->error($availability->message, $availability, 409);
        }

        $reservation = Reservation::create($data);

        return $this->success(new ReservationResource($reservation));
    }

    public function update(ReservationUpdateRequest $request, Reservation $reservation)
    {
        $data = $request->validated();

        $availability = $this->availabilityCheckService->check(new AvailabilityCheckData(
            vehicle: Vehicle::findOrFail($data['vehicle_id']),
            customer: Customer::findOrFail($data['customer_id']),
            start_date: Carbon::parse($data['check_in_date']),
            end_date: Carbon::parse($data['check_out_date']),
            options: new AvailabilityCheckOptions(
                ignore_reservation: $reservation->id,
            ),
        ));
        if (! $availability->available) {
            return $this->error($availability->message, $availability, 409);
        }

        $reservation->update($data);

        return $this->success(new ReservationResource($reservation));
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();

        return $this->success(null, 'reservation.delete.success');
    }
}
