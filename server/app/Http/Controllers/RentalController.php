<?php

namespace App\Http\Controllers;

use App\Data\RentalData;
use App\Http\Controllers\Api\V1\ApiController;
use App\Http\Resources\RentalSummaryResource;
use App\Models\Rental;

class RentalController extends ApiController
{
    public function index()
    {
        $rentals = Rental::with(['rate', 'timeframe', 'renter', 'vehicle'])->get();

        return $this->success(RentalSummaryResource::collection($rentals));
    }

    public function show(Rental $rental)
    {
        return $this->success(RentalData::fromModel($rental));
    }
    public function destroy(Rental $rental)
    {
        $rental->load(['rate', 'timeframe', 'renter', 'vehicle']);

        $rental->rate->delete();
        $rental->timeframe->delete();
        $rental->renter->delete();
        $rental->vehicle->delete();

        $rental->delete();
        // TODO: need to delete related entities (rate, timeframe, renter, vehicle)

        return $this->success(null, 'rental.deleted');
    }
}
