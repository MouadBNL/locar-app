<?php

namespace App\Http\Resources;

use App\Models\Rental;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Rental
 */
class RentalSummaryResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'rental_number' => $this->rental_number,
            'customer' => [
                'id' => $this->renter->customer_id,
                'full_name' => $this->renter->full_name,
                'phone' => $this->renter->phone,
                'identifier' => $this->renter->id_card_number ?? $this->renter->passport_number ?? $this->renter->driver_license_number,
            ],
            'departure_date' => $this->timeframe->departure_date,
            'return_date' => $this->timeframe->return_date,
            'duration' => $this->timeframe->total_days,
            'total_price' => $this->rate->total,
            'vehicle' => [
                'id' => $this->vehicle->vehicle_id,
                'make' => $this->vehicle->make,
                'model' => $this->vehicle->model,
                'year' => $this->vehicle->year,
                'license_plate' => $this->vehicle->license_plate,
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
