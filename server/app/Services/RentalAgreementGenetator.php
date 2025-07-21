<?php

namespace App\Services;

use App\Data\RentalData;
use App\Models\Document;
use Barryvdh\DomPDF\PDF;

class RentalAgreementGenetator
{
    public function __construct(
        public PDF $pdf,
    ) {}

    public function generate(RentalData $rental)
    {
        /** @var mixed $auth */
        $auth = auth(); // for skipping type errors

        $generated = $this->pdf->loadView('agreement.template', ['rental' => $rental]);
        $filename = 'agreement-' . $rental->rental_number . '-' . now()->timestamp . '.pdf';
        $path = storage_path('app/public/agreements/' . $filename);
        $generated->save($path);
        $document = Document::create([
            'filename' => $filename,
            'original_filename' => $filename,
            'disk' => 'public',
            'path' => 'agreements/' . $filename,
            'mime_type' => 'application/pdf',
            'size' => filesize($path),
            'uploaded_by' => $auth->user()->id,
            'uploaded_for' => 'rental-agreement-generated',
        ]);
        return $document;
    }
}
