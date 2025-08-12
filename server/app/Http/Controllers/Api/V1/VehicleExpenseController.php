<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\VehicleExpenseCreateRequest;
use App\Http\Resources\VehicleExpenseResource;
use App\Models\Vehicle;
use App\Models\VehicleExpense;

class VehicleExpenseController extends ApiController
{
    public function index($vehicle)
    {
        $vehicle = Vehicle::findOrFail($vehicle);
        $query = $vehicle->expenses();
        if (request()->has('ids')) {
            $query->whereIn('id', explode(',', request()->ids));
        }
        $expenses = $query->get();

        return $this->success(VehicleExpenseResource::collection($expenses));
    }

    public function show($vehicle, $expense)
    {
        $vehicle = Vehicle::findOrFail($vehicle);
        $expense = VehicleExpense::findOrFail($expense);
        if ($expense->vehicle_id !== $vehicle->id) {
            return $this->error('Expense not found', 404);
        }

        return $this->success(new VehicleExpenseResource($expense));
    }

    public function store($vehicle, VehicleExpenseCreateRequest $request)
    {
        $vehicle = Vehicle::findOrFail($vehicle);
        $expense = $vehicle->expenses()->create($request->validated());

        return $this->success(new VehicleExpenseResource($expense));
    }

    public function update(VehicleExpenseCreateRequest $request, $vehicle, $expense)
    {
        $vehicle = Vehicle::findOrFail($vehicle);
        $expense = VehicleExpense::findOrFail($expense);
        if ($expense->vehicle_id !== $vehicle->id) {
            return $this->error('Expense not found', 404);
        }
        $expense->update($request->validated());

        return $this->success(new VehicleExpenseResource($expense));
    }

    public function destroy($vehicle, $expense)
    {
        $vehicle = Vehicle::findOrFail($vehicle);
        $expense = VehicleExpense::findOrFail($expense);
        if ($expense->vehicle_id !== $vehicle->id) {
            return $this->error('Expense not found', 404);
        }
        $expense->delete();

        return $this->success(null, 'Expense deleted successfully');
    }
}
