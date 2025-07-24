<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\VehicleMaintenanceCreateRequest;
use App\Http\Resources\VehicleMaintenanceResource;
use App\Models\Vehicle;
use App\Models\VehicleExpense;
use App\Models\VehicleMaintenance;

class VehicleMaintenanceController extends ApiController
{
    public function index(Vehicle $vehicle)
    {
        $maintenances = $vehicle->maintenances()->get();
        return $this->success(VehicleMaintenanceResource::collection($maintenances));
    }

    public function show(Vehicle $vehicle, VehicleMaintenance $maintenance)
    {
        if ($maintenance->vehicle_id !== $vehicle->id) {
            return $this->error('Maintenance not found', 404);
        }
        return $this->success(new VehicleMaintenanceResource($maintenance));
    }

    public function store(Vehicle $vehicle, VehicleMaintenanceCreateRequest $request)
    {
        $request->validated();
        /** @var VehicleMaintenance $maintenance */
        $maintenance = $vehicle->maintenances()->create([
            'started_at' => $request->started_at,
            'finished_at' => $request->finished_at,
            'cancelled_at' => $request->cancelled_at,
            'title' => $request->title,
            'reference' => $request->reference,
            'notes' => $request->notes,
            'receipt_document_id' => $request->receipt_document_id,
        ]);
        if (isset($request->expenses)) {
            VehicleExpense::whereIn('id', $request->expenses)->update([
                'vehicle_maintenance_id' => $maintenance->id,
            ]);
        }
        return $this->success(new VehicleMaintenanceResource($maintenance));
    }

    public function update(Vehicle $vehicle, VehicleMaintenance $maintenance, VehicleMaintenanceCreateRequest $request)
    {
        $request->validated();
        if ($maintenance->vehicle_id !== $vehicle->id) {
            return $this->error('Maintenance not found', 404);
        }
        $maintenance->update([
            'started_at' => $request->started_at,
            'finished_at' => $request->finished_at,
            'cancelled_at' => $request->cancelled_at,
            'title' => $request->title,
            'reference' => $request->reference,
            'notes' => $request->notes,
            'receipt_document_id' => $request->receipt_document_id,
        ]);
        $maintenance->expenses()->update([
            'vehicle_maintenance_id' => null,
        ]);
        if (isset($request->expenses)) {
            VehicleExpense::whereIn('id', $request->expenses)->update([
                'vehicle_maintenance_id' => $maintenance->id,
            ]);
        }
        return $this->success(new VehicleMaintenanceResource($maintenance));
    }

    public function destroy(Vehicle $vehicle, VehicleMaintenance $maintenance)
    {
        if ($maintenance->vehicle_id !== $vehicle->id) {
            return $this->error('Maintenance not found', 404);
        }
        $maintenance->expenses()->delete();
        $maintenance->delete();
        return $this->success(null, 'Maintenance deleted successfully');
    }
}
