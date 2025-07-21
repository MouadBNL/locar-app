<?php

namespace App\Http\Controllers\Api\V1;

use App\Data\RentalData;
use App\Http\Controllers\Controller;
use App\Models\Rental;
use App\Services\RentalAgreementGenetator;

class RentalAgreementGenerateController extends Controller
{
    public function __invoke(Rental $rental, RentalAgreementGenetator $generator)
    {
        $rentalData = RentalData::fromModel($rental);
        $path = $generator->generate($rentalData);
        return response()->file($path);
        // return response()->download($path);
    }
}
