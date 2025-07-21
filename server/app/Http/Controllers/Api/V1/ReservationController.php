<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\ReservationCreateRequest;
use App\Http\Requests\ReservationUpdateRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;

class ReservationController extends ApiController
{
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
        $reservation = Reservation::create($request->validated());

        return $this->success(new ReservationResource($reservation));
    }

    public function update(ReservationUpdateRequest $request, Reservation $reservation)
    {
        $reservation->update($request->validated());

        return $this->success(new ReservationResource($reservation));
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();

        return $this->success(null, 'reservation.delete.success');
    }
}
