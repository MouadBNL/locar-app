<?php

namespace App\Http\Controllers\Api\V1;

use App\Data\RentalRateData;
use App\Data\RentalTimeframeData;
use App\Data\RentalVehicleData;
use App\Data\RenterData;
use App\Models\Rental;
use Illuminate\Http\Request;

class RentalDetailsUpdateController extends ApiController
{
    public function vehicle(RentalVehicleData $data, Rental $rental)
    {
        $rental->vehicle->update([
            'vehicle_id' => $data->vehicle_id,
            'make' => $data->make,
            'model' => $data->model,
            'year' => $data->year,
            'license_plate' => $data->license_plate,
        ]);

        return $this->success(null, 'rental.vehicle.updated');
    }

    public function renter(RenterData $data, Rental $rental)
    {
        $rental->renter->update([
            'customer_id' => $data->customer_id,
            'full_name' => $data->full_name,
            'email' => $data->email,
            'phone' => $data->phone,

            // Identification information
            'id_card_number' => $data->id_card_number,
            'birth_date' => $data->birth_date,
            'address_primary' => $data->address_primary,
            'id_card_scan_document' => $data->id_card_scan_document,

            // Driver's license information
            'driver_license_number' => $data->driver_license_number,
            'driver_license_issuing_city' => $data->driver_license_issuing_city,
            'driver_license_issuing_date' => $data->driver_license_issuing_date,
            'driver_license_expiration_date' => $data->driver_license_expiration_date,
            'driver_license_scan_document' => $data->driver_license_scan_document,

            // Passport information
            'passport_number' => $data->passport_number,
            'passport_country' => $data->passport_country,
            'passport_issuing_date' => $data->passport_issuing_date,
            'passport_expiration_date' => $data->passport_expiration_date,
            'passport_scan_document' => $data->passport_scan_document,
        ]);

        return $this->success(null, 'rental.renter.updated');
    }

    public function timeframe(RentalTimeframeData $data, Rental $rental)
    {
        $rental->timeframe->update([
            'departure_date' => $data->departure_date,
            'return_date' => $data->return_date,
        ]);

        return $this->success(null, 'rental.timeframe.updated');
    }

    public function rate(RentalRateData $data, Rental $rental)
    {
        $rental->rate->update([
            'day_quantity' => $data->day_quantity,
            'day_rate' => $data->day_rate,
            'day_total' => $data->day_total,
            'week_quantity' => $data->week_quantity,
            'week_rate' => $data->week_rate,
            'week_total' => $data->week_total,
            'month_quantity' => $data->month_quantity,
            'month_rate' => $data->month_rate,
            'month_total' => $data->month_total,
            'insurance_quantity' => $data->insurance_quantity,
            'insurance_rate' => $data->insurance_rate,
            'insurance_total' => $data->insurance_total,
            'extra_quantity' => $data->extra_quantity,
            'extra_rate' => $data->extra_rate,
            'extra_total' => $data->extra_total,
            'total' => $data->total,
        ]);

        return $this->success(null, 'rental.rate.updated');
    }

    public function notes(Request $request, Rental $rental)
    {
        $data = $request->validate([
            'notes' => 'nullable|string|max:2048',
        ]);

        $rental->update([
            'notes' => $data['notes'],
        ]);

        return $this->success(null, 'rental.notes.updated');
    }
}
