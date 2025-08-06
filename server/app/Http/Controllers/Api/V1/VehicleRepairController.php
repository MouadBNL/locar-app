<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\VehicleRepairCreateRequest;
use App\Http\Resources\VehicleRepairResource;
use App\Models\Vehicle;
use App\Models\VehicleExpense;
use App\Models\VehicleRepair;

class VehicleRepairController extends ApiController
{
    public function index(Vehicle $vehicle)
    {
        $repairs = $vehicle->repairs()
            ->with('expenses')
            ->orderBy('started_at', 'desc')
            ->get();

        return $this->success(VehicleRepairResource::collection($repairs));
    }

    public function show($vehicle, $repair)
    {
        $vehicle = Vehicle::findOrFail($vehicle);
        $repair = VehicleRepair::findOrFail($repair);
        if ($repair->vehicle_id !== $vehicle->id) {
            return $this->error('Repair not found', 404);
        }

        return $this->success(new VehicleRepairResource($repair));
    }

    public function store($vehicle, VehicleRepairCreateRequest $request)
    {
        $vehicle = Vehicle::findOrFail($vehicle);
        $request->validated();
        /** @var VehicleRepair $repair */
        $repair = $vehicle->repairs()->create([
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
                'vehicle_repair_id' => $repair->id,
            ]);
        }

        return $this->success(new VehicleRepairResource($repair));
    }

    public function update(VehicleRepairCreateRequest $request, $vehicle, $repair)
    {
        $vehicle = Vehicle::findOrFail($vehicle);
        $repair = VehicleRepair::findOrFail($repair);
        $request->validated();
        if ($repair->vehicle_id !== $vehicle->id) {
            return $this->error('Repair not found', 404);
        }
        $repair->update([
            'started_at' => $request->started_at,
            'finished_at' => $request->finished_at,
            'cancelled_at' => $request->cancelled_at,
            'title' => $request->title,
            'reference' => $request->reference,
            'notes' => $request->notes,
            'receipt_document_id' => $request->receipt_document_id,
        ]);
        $repair->load('expenses');
        $repair->expenses()->update([
            'vehicle_repair_id' => null,
        ]);
        if (isset($request->expenses)) {
            VehicleExpense::whereIn('id', $request->expenses)->update([
                'vehicle_repair_id' => $repair->id,
            ]);
        }

        $repair->load('expenses');

        return $this->success(new VehicleRepairResource($repair));
    }

    public function destroy($vehicle, $repair)
    {
        $vehicle = Vehicle::findOrFail($vehicle);
        $repair = VehicleRepair::findOrFail($repair);
        if ($repair->vehicle_id !== $vehicle->id) {
            return $this->error('Repair not found', 404);
        }
        $repair->expenses()->delete();
        $repair->delete();

        return $this->success(null, 'Repair deleted successfully');
    }
}
