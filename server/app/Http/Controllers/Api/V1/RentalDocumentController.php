<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\RentalDocumentCreateRequest;
use App\Http\Resources\RentalDocumentResource;
use App\Models\Rental;
use App\Models\RentalDocument;

class RentalDocumentController extends ApiController
{
    public function index(Rental $rental)
    {
        $documents = $rental->documents()->with('document')->get();

        return $this->success(RentalDocumentResource::collection($documents), 'rental.document.index.success');
    }

    public function store(Rental $rental, RentalDocumentCreateRequest $request)
    {
        $document = $rental->documents()->create([
            'document_id' => $request->document_id,
            'title' => $request->title,
            'type' => $request->type,
            'description' => $request->description,
        ]);

        return $this->success(new RentalDocumentResource($document), 'rental.document.store.success');
    }

    public function update(Rental $rental, RentalDocument $document, RentalDocumentCreateRequest $request)
    {
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

    public function show(Rental $rental, RentalDocument $document)
    {
        if ($document->rental_id !== $rental->id) {
            return $this->error('rental.document.show.error.not_found', 404);
        }

        return $this->success(new RentalDocumentResource($document), 'rental.document.show.success');
    }

    public function destroy(Rental $rental, RentalDocument $document)
    {
        if ($document->rental_id !== $rental->id) {
            return $this->error('rental.document.show.error.not_found', 404);
        }

        $document->delete();

        return $this->success(null, 'rental.document.destroy.success');
    }
}
