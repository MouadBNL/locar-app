<?php

namespace App\Http\Resources;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Customer
 */
class CustomerResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'status' => $this->status,
            'rating' => $this->rating,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'id_card_number' => $this->id_card_number,
            'driver_license_number' => $this->driver_license_number,
            'passport_number' => $this->passport_number,
            'birth_date' => $this->birth_date,
            'active_rental' => $this->activeRenter ? new RentalSummaryResource($this->activeRenter->rental) : null,
            'active_reservation' => $this->activeReservation ? new ReservationResource($this->activeReservation) : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
