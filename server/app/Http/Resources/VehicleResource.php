<?php

namespace App\Http\Resources;

use App\Enums\VehicleStatus;
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
            'year' => $this->year,
            'license_plate' => $this->license_plate,
            'mileage' => $this->mileage,
            'fuel_type' => $this->fuel_type,
            'transmission' => $this->transmission,
            'number_of_seats' => $this->number_of_seats,
            'number_of_doors' => $this->number_of_doors,
            'color' => $this->color,
            'photo_url' => $this->photo_url,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
