<?php

namespace App\Http\Resources;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Reservation
 */
class ReservationResource extends JsonResource
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
            'reservation_number' => $this->reservation_number,
            'customer_id' => $this->customer_id,
            'vehicle_id' => $this->vehicle_id,
            'customer' => new CustomerSummaryResource($this->customer),
            'vehicle' => new VehicleSummaryResource($this->vehicle),
            'check_in_date' => $this->check_in_date,
            'check_out_date' => $this->check_out_date,
            'daily_rate' => $this->daily_rate,
            'total_days' => $this->total_days,
            'total_price' => $this->total_price,
            'deposit' => $this->deposit,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
