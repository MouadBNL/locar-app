<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\RentalDocumentCreateRequest;
use App\Http\Resources\RentalDocumentResource;
use App\Models\Rental;
use App\Models\RentalDocument;

class RentalDocumentController extends ApiController
{
    public function index($rental_number)
    {
        $rental = Rental::where('rental_number', $rental_number)->firstOrFail();
        $documents = $rental->documents()->with('document')->get();

        return $this->success(RentalDocumentResource::collection($documents), 'rental.document.index.success');
    }

    public function store(RentalDocumentCreateRequest $request, $rental_number)
    {
        $rental = Rental::where('rental_number', $rental_number)->firstOrFail();
        $document = $rental->documents()->create([
            'document_id' => $request->document_id,
            'title' => $request->title,
            'type' => $request->type,
            'description' => $request->description,
        ]);

        return $this->success(new RentalDocumentResource($document), 'rental.document.store.success');
    }

    public function update(RentalDocumentCreateRequest $request, $rental_number, $document)
    {
        $rental = Rental::where('rental_number', $rental_number)->firstOrFail();
        $document = RentalDocument::findOrFail($document);
        if ($document->rental_id !== $rental->id) {
            return $this->error('rental.document.show.error.not_found', 404);
        }

        $document->update([
            'document_id' => $request->document_id,
            'title' => $request->title,
            'type' => $request->type,
            'description' => $request->description,
        ]);

        return $this->success(new RentalDocumentResource($document), 'rental.document.update.success');
    }

    public function show($rental_number, $document)
    {
        $rental = Rental::where('rental_number', $rental_number)->firstOrFail();
        $document = RentalDocument::findOrFail($document);
        if ($document->rental_id !== $rental->id) {
            return $this->error('rental.document.show.error.not_found', 404);
        }

        return $this->success(new RentalDocumentResource($document), 'rental.document.show.success');
    }

    public function destroy($rental_number, $document)
    {
        $rental = Rental::where('rental_number', $rental_number)->firstOrFail();
        $document = RentalDocument::findOrFail($document);
        if ($document->rental_id !== $rental->id) {
            return $this->error('rental.document.show.error.not_found', 404);
        }

        $document->delete();

        return $this->success(null, 'rental.document.destroy.success');
    }
}
