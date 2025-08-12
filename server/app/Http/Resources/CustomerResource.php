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
            'phone' => $this->phone,
            'id_card_number' => $this->id_card_number,
            'id_card_issuing_date' => $this->id_card_issuing_date,
            'id_card_expiration_date' => $this->id_card_expiration_date,
            'id_card_address' => $this->id_card_address,
            'driver_license_number' => $this->driver_license_number,
            'driver_license_issuing_date' => $this->driver_license_issuing_date,
            'driver_license_expiration_date' => $this->driver_license_expiration_date,
            'driver_license_address' => $this->driver_license_address,
            'passport_number' => $this->passport_number,
            'passport_issuing_date' => $this->passport_issuing_date,
            'passport_expiration_date' => $this->passport_expiration_date,
            'passport_address' => $this->passport_address,
            'birth_date' => $this->birth_date,
            'active_rental' => $this->activeRenter ? new RentalSummaryResource($this->activeRenter->rental) : null,
            'active_reservation' => $this->activeReservation ? new ReservationResource($this->activeReservation) : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
