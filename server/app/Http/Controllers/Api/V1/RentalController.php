<?php

namespace App\Http\Controllers\Api\V1;

use App\Data\RentalData;
use App\Http\Resources\RentalSummaryResource;
use App\Models\Rental;
use Illuminate\Http\Request;

class RentalController extends ApiController
{
    public function index(Request $request)
    {
        $query = Rental::with(['rate', 'timeframe', 'renter', 'vehicle']);

        if ($request->has('vehicle_id')) {
            $query->whereHas('vehicle', function ($query) use ($request) {
                $query->where('vehicle_id', $request->vehicle_id);
            });
        }

        if ($request->has('customer_id')) {
            $query->whereHas('renter', function ($query) use ($request) {
                $query->where('customer_id', $request->customer_id);
            });
        }

        $rentals = $query->get();

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
