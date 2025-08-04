<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\VehicleCreateRequest;
use App\Http\Requests\VehicleUpdateRequest;
use App\Http\Resources\VehicleResource;
use App\Models\Vehicle;

class VehicleController extends ApiController
{
    public function index()
    {
        $vehicles = Vehicle::all();

        return $this->success(VehicleResource::collection($vehicles));
    }

    public function store(VehicleCreateRequest $request)
    {
        $data = $request->validated();
        $vehicle = Vehicle::create($data);

        return $this->success(new VehicleResource($vehicle), 'vehicle.store.success');
    }

    public function show(Vehicle $vehicle)
    {
        $vehicle->load('activeRentalVehicle', 'activeReservation', 'activeRepair');

        return $this->success(new VehicleResource($vehicle));
    }

    public function update(VehicleUpdateRequest $request, Vehicle $vehicle)
    {
        $data = $request->validated();
        $vehicle->update($data);

        return $this->success(new VehicleResource($vehicle), 'vehicle.update.success');
    }

    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return $this->success(null, 'vehicle.destroy.success');
    }
}
