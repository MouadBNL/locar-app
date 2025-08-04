<?php

namespace App\Http\Resources;

use App\Models\CustomerRating;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin CustomerRating
 */
class CustomerRatingResource extends JsonResource
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
            'customer_id' => $this->customer_id,
            'rental_id' => $this->rental_id,
            'customer' => new CustomerSummaryResource($this->whenLoaded('customer')),
            'rental' => new RentalSummaryResource($this->whenLoaded('rental')),
            'rating' => $this->rating,
            'comment' => $this->comment,
        ];
    }
}
