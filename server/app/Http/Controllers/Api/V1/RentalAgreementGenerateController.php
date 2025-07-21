<?php

namespace App\Http\Controllers\Api\V1;

use App\Data\RentalData;
use App\Http\Resources\DocumentResource;
use App\Models\Rental;
use App\Services\RentalAgreementGenetator;

class RentalAgreementGenerateController extends ApiController
{
    public function __invoke(Rental $rental, RentalAgreementGenetator $generator)
    {

        $rentalData = RentalData::fromModel($rental);
        $document = $generator->generate($rentalData);

        $rental->documents()->create([
            'title' => 'Rental Agreement',
            'type' => 'rental_agreement',
            'description' => 'GeneratedRental Agreement for rental '.$rental->rental_number,
            'document_id' => $document->id,
        ]);

        return $this->success(new DocumentResource($document), 'document.store.success');
    }
}
