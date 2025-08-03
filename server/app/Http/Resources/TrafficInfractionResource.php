<?php

namespace App\Http\Resources;

use App\Models\TrafficInfraction;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin TrafficInfraction
 */
class TrafficInfractionResource extends JsonResource
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
            'date' => $this->date,
            'title' => $this->title,
            'location' => $this->location,
            'vehicle_id' => $this->vehicle_id,
            'rental_id' => $this->rental_id,
            'customer_id' => $this->customer_id,
            'document_id' => $this->document_id,
            'vehicle' => new VehicleSummaryResource($this->whenLoaded('vehicle')),
            'rental' => $this->whenLoaded('rental') ? [
                'id' => $this->rental->id,
                'rental_number' => $this->rental->rental_number,
            ] : null,
            'customer' => new CustomerSummaryResource($this->whenLoaded('customer')),
            'document' => new DocumentResource($this->whenLoaded('document')),
        ];
    }
}
