<?php

namespace App\Http\Resources;

use App\Http\Resources\CustomerResource;
use App\Http\Resources\RentalResource;
use App\Http\Resources\VehicleResource;
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
            'vehicle' => new VehicleResource($this->whenLoaded('vehicle')),
            'rental' => $this->whenLoaded('rental') ? [
                'id' => $this->rental->id,
                'rental_number' => $this->rental->rental_number,
            ] : null,
            'customer' => new CustomerResource($this->whenLoaded('customer')),
        ];
    }
}
