<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\VehicleExpenseCreateRequest;
use App\Http\Resources\VehicleExpenseResource;
use App\Models\Vehicle;
use App\Models\VehicleExpense;

class VehicleExpenseController extends ApiController
{
    public function index(Vehicle $vehicle)
    {
        $query = $vehicle->expenses();
        if (request()->has('ids')) {
            $query->whereIn('id', explode(',', request()->ids));
        }
        $expenses = $query->get();
        return $this->success(VehicleExpenseResource::collection($expenses));
    }

    public function show(Vehicle $vehicle, VehicleExpense $expense)
    {
        if ($expense->vehicle_id !== $vehicle->id) {
            return $this->error('Expense not found', 404);
        }
        return $this->success(new VehicleExpenseResource($expense));
    }

    public function store(Vehicle $vehicle, VehicleExpenseCreateRequest $request)
    {
        $expense = $vehicle->expenses()->create($request->validated());
        return $this->success(new VehicleExpenseResource($expense));
    }

    public function update(Vehicle $vehicle, VehicleExpense $expense, VehicleExpenseCreateRequest $request)
    {
        if ($expense->vehicle_id !== $vehicle->id) {
            return $this->error('Expense not found', 404);
        }
        $expense->update($request->validated());
        return $this->success(new VehicleExpenseResource($expense));
    }

    public function destroy(Vehicle $vehicle, VehicleExpense $expense)
    {
        if ($expense->vehicle_id !== $vehicle->id) {
            return $this->error('Expense not found', 404);
        }
        $expense->delete();
        return $this->success(null, 'Expense deleted successfully');
    }
}
