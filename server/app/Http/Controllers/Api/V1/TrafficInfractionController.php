<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\TrafficInfractionCreateRequest;
use App\Http\Resources\TrafficInfractionResource;
use App\Models\Rental;
use App\Models\TrafficInfraction;
use Illuminate\Http\Request;

class TrafficInfractionController extends ApiController
{
    public function index(Request $request)
    {
        $query = TrafficInfraction::query()
            ->with('document', 'vehicle', 'rental', 'customer')
            ->orderBy('date', 'desc');

        if ($request->has('vehicle_id')) {
            $query->where('vehicle_id', $request->vehicle_id);
        }

        if ($request->has('rental_id')) {
            $query->where('rental_id', $request->rental_id);
        }

        if ($request->has('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }

        $infractions = $query->get();

        return $this->success(TrafficInfractionResource::collection($infractions));
    }

    public function store(TrafficInfractionCreateRequest $request)
    {
        $data = $request->validated();
        if ($request->rental_id) {
            $rental = Rental::with('renter', 'vehicle')->findOrFail($request->rental_id);
            $data['customer_id'] = $rental->renter->customer_id;
            $data['vehicle_id'] = $rental->vehicle->id;
        }

        $trafficInfraction = TrafficInfraction::create($data);
        return $this->success(new TrafficInfractionResource($trafficInfraction));
    }

    public function show(TrafficInfraction $trafficInfraction)
    {
        return $this->success(new TrafficInfractionResource($trafficInfraction));
    }

    public function update(TrafficInfractionCreateRequest $request, TrafficInfraction $trafficInfraction)
    {
        $data = $request->validated();
        if ($request->rental_id) {
            $rental = Rental::with('renter', 'vehicle')->findOrFail($request->rental_id);
            $data['customer_id'] = $rental->renter->customer_id;
            $data['vehicle_id'] = $rental->vehicle->id;
        }

        $trafficInfraction->update($data);
        return $this->success(new TrafficInfractionResource($trafficInfraction));
    }

    public function destroy(TrafficInfraction $trafficInfraction)
    {
        $trafficInfraction->delete();
        return $this->success(new TrafficInfractionResource($trafficInfraction));
    }
}
