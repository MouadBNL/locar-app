<?php

namespace App\Http\Resources;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Vehicle
 */
class VehicleResource extends JsonResource
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
            'make' => $this->make,
            'model' => $this->model,
            'year' => $this->first_service_date->year,
            'first_service_date' => $this->first_service_date,
            'last_service_date' => $this->last_service_date,
            'license_plate' => $this->license_plate,
            'vin' => $this->vin,
            'mileage' => $this->mileage,
            'fuel_type' => $this->fuel_type,
            'transmission' => $this->transmission,
            'number_of_seats' => $this->number_of_seats,
            'number_of_doors' => $this->number_of_doors,
            'color' => $this->color,
            'photo_url' => $this->photo_url,
            'status' => $this->status,
            'active_rental' => $this->activeRentalVehicle ? new RentalSummaryResource($this->activeRentalVehicle->rental) : null,
            'active_reservation' => $this->activeReservation ? new ReservationResource($this->activeReservation) : null,
            'active_maintenance' => $this->activeMaintenance ? new VehicleMaintenanceResource($this->activeMaintenance) : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
