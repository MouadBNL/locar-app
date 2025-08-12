<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\RentalStartRequest;
use App\Models\Rental;

class RentalStartController extends ApiController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RentalStartRequest $request, $rental_number)
    {
        $rental = Rental::where('rental_number', $rental_number)->firstOrFail();
        /**
         * TODO: maybe here we should all more validations on the state of the rental
         * checking if the documents are uploaded and valid, and any other state that could be affected
         */
        $rental->timeframe()->update([
            'actual_departure_date' => $request->actual_departure_date,
        ]);
        $rental->vehicle->vehicle()->update([
            'mileage' => $request->mileage,
        ]);

        return $this->success(null, 'rental.start.success');
    }
}
