<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\VehicleCreateRequest;
use App\Http\Requests\VehicleUpdateRequest;
use App\Models\Vehicle;

class VehicleController extends ApiController
{
    public function index()
    {
        $vehicles = Vehicle::all();

        return $this->success($vehicles);
    }

    public function store(VehicleCreateRequest $request)
    {
        $data = $request->validated();
        $vehicle = Vehicle::create($data);

        return $this->success($vehicle, 'vehicle.store.success');
    }

    public function show(Vehicle $vehicle)
    {
        return $this->success($vehicle);
    }

    public function update(VehicleUpdateRequest $request, Vehicle $vehicle)
    {
        $data = $request->validated();
        $vehicle->update($data);

        return $this->success($vehicle, 'vehicle.update.success');
    }

    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return $this->success(null, 'vehicle.destroy.success');
    }
}
