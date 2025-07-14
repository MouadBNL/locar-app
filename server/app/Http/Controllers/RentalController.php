<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\V1\ApiController;
use App\Http\Resources\RentalSummaryResource;
use App\Models\Rental;

class RentalController extends ApiController
{
    public function index()
    {
        $rentals = Rental::with(['rate', 'timeframe', 'renter', 'vehicle'])->get();

        return  $this->success(RentalSummaryResource::collection($rentals));
    }

    public function show(Rental $rental)
    {
        $rental->load(['rate', 'timeframe', 'renter', 'vehicle.vehicle']);

        return  $this->success([
            'id' => $rental->id,
            'rental_number' => $rental->rental_number,
            'customer' => [
                'id' => $rental->renter->customer_id ?? "",
                'full_name' => $rental->renter->full_name,
                'phone' => $rental->renter->phone,
                'identifier' => $rental->renter->id_card_number ?? $rental->renter->passport_number ?? $rental->renter->driver_license_number,
                'address' => $rental->renter->address_primary,
                'driver_license_number' => $rental->renter->driver_license_number,
            ],
            'departure_date' => $rental->timeframe->departure_date,
            'return_date' => $rental->timeframe->return_date,
            'duration' => $rental->timeframe->total_days,
            'total_price' => $rental->rate->total,
            'vehicle' => [
                'id' => $rental->vehicle->vehicle_id,
                'make' => $rental->vehicle->make,
                'model' => $rental->vehicle->model,
                'year' => $rental->vehicle->year,
                'license_plate' => $rental->vehicle->license_plate,
                'color' => $rental->vehicle->vehicle?->color,
                'transmission' => $rental->vehicle->vehicle?->transmission,
                'seats' => $rental->vehicle->vehicle?->number_of_seats,
                'doors' => $rental->vehicle->vehicle?->number_of_doors,
                'fuel_type' => $rental->vehicle->vehicle?->fuel_type,
                'mileage' => $rental->vehicle->vehicle?->mileage,
            ],
            'created_at' => $rental->created_at,
            'updated_at' => $rental->updated_at,
        ]);
    }
}
