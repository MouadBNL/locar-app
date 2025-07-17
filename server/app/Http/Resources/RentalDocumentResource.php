<?php

namespace App\Http\Resources;

use App\Models\RentalDocument;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin RentalDocument
 */
class RentalDocumentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'type' => $this->type,
            'description' => $this->description,
            'rental_id' => $this->rental_id,
            'document_id' => $this->document_id,
            'document' => new DocumentResource($this->document),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
