<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\ReservationCreateRequest;
use App\Http\Requests\ReservationUpdateRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Customer;
use App\Models\Reservation;
use App\Models\Vehicle;
use App\Services\AvailabilityCheckService;
use Carbon\Carbon;

class ReservationController extends ApiController
{
    public function __construct(
        private AvailabilityCheckService $availabilityCheckService
    ) {}

    public function index()
    {
        $reservations = Reservation::all();
        return $this->success(ReservationResource::collection($reservations));
    }

    public function show(Reservation $reservation)
    {
        return $this->success(new ReservationResource($reservation));
    }

    public function store(ReservationCreateRequest $request)
    {
        $data = $request->validated();

        // Check vehicle availability
        $vehicle = Vehicle::find($data['vehicle_id']);
        $availability = $this->availabilityCheckService->checkVehicleAvailability(
            $vehicle,
            Carbon::parse($data['check_in_date']),
            Carbon::parse($data['check_out_date']),
        );
        if (!$availability['available']) {
            return $this->error($availability['message'], $availability, 409);
        }

        // Check customer availability
        $customer = Customer::find($data['customer_id']);
        $availability = $this->availabilityCheckService->checkCustomerAvailability(
            $customer,
            Carbon::parse($data['check_in_date']),
            Carbon::parse($data['check_out_date']),
        );
        if (!$availability['available']) {
            return $this->error($availability['message'], $availability, 409);
        }
        $reservation = Reservation::create($data);
        return $this->success(new ReservationResource($reservation));
    }

    public function update(ReservationUpdateRequest $request, Reservation $reservation)
    {
        $data = $request->validated();

        // Check vehicle availability
        $vehicle = Vehicle::find($data['vehicle_id']);
        $availability = $this->availabilityCheckService->checkVehicleAvailability(
            $vehicle,
            Carbon::parse($data['check_in_date']),
            Carbon::parse($data['check_out_date']),
            $reservation->id ? ['type' => 'reservation', 'id' => $reservation->id] : null
        );
        if (!$availability['available']) {
            return $this->error($availability['message'], $availability, 409);
        }

        // Check customer availability
        $customer = Customer::find($data['customer_id']);
        $availability = $this->availabilityCheckService->checkCustomerAvailability(
            $customer,
            Carbon::parse($data['check_in_date']),
            Carbon::parse($data['check_out_date']),
            $reservation->id ? ['type' => 'reservation', 'id' => $reservation->id] : null
        );
        if (!$availability['available']) {
            return $this->error($availability['message'], $availability, 409);
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
