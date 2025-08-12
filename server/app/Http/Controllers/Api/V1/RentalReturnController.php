<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\RentalStatus;
use App\Http\Requests\RentalReturnRequest;
use App\Models\CustomerRating;
use App\Models\Rental;

class RentalReturnController extends ApiController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RentalReturnRequest $request, $rental_number)
    {
        $rental = Rental::where('rental_number', $rental_number)->firstOrFail();
        if ($rental->status !== RentalStatus::STARTED) {
            return $this->error(null, 'rental.return.error.not_started');
        }

        if ($rental->timeframe->actual_departure_date->isAfter($request->actual_return_date)) {
            return $this->error(null, 'rental.return.error.return_date_before_departure');
        }

        $rental->timeframe()->update([
            'actual_return_date' => $request->actual_return_date,
        ]);

        $rental->vehicle->vehicle()->update([
            'mileage' => $request->mileage,
        ]);

        CustomerRating::create([
            'customer_id' => $rental->renter->customer_id,
            'rental_id' => $rental->id,
            'rating' => $request->customer['rating'],
            'comment' => isset($request->customer['comment']) ? $request->customer['comment'] : null,
        ]);

        return $this->success(null, 'rental.return.success');
    }
}
