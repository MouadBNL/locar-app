<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\RentalStatus;
use App\Http\Requests\RentalReturnRequest;
use App\Models\Rental;

class RentalReturnController extends ApiController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RentalReturnRequest $request, Rental $rental)
    {
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

        return $this->success(null, 'rental.return.success');
    }
}
