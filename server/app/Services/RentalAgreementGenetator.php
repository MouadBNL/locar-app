<?php

namespace App\Services;

use App\Data\RentalData;
use Barryvdh\DomPDF\PDF;

class RentalAgreementGenetator
{
    public function __construct(
        public PDF $pdf,
    ) {}

    public function generate(RentalData $rental)
    {
        $generated = $this->pdf->loadView('agreement.template', ['rental' => $rental]);
        $path = storage_path('app/public/agreement-' . $rental->id . '-' . now()->timestamp . '.pdf');
        $generated->save($path);
        return $path;
    }
}
