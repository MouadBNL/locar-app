<?php

namespace App\Http\Resources;

use App\Models\VehicleMaintenance;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin VehicleMaintenance
 */
class VehicleMaintenanceResource extends JsonResource
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
            'vehicle_id' => $this->vehicle_id,
            'started_at' => $this->started_at,
            'finished_at' => $this->finished_at,
            'cancelled_at' => $this->cancelled_at,
            'title' => $this->title,
            'reference' => $this->reference,
            'notes' => $this->notes,
            'receipt_document_id' => $this->receipt_document_id,
            'expenses' => VehicleExpenseResource::collection($this->expenses),
            'expenses_sum' => $this->expenses->sum('amount'),
            'expenses_count' => $this->expenses->count(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
