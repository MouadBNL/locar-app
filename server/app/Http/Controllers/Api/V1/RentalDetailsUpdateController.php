<?php

namespace App\Http\Controllers\Api\V1;

use App\Data\AvailabilityCheckData;
use App\Data\AvailabilityCheckOptions;
use App\Data\RentalRateData;
use App\Data\RentalTimeframeData;
use App\Data\RentalVehicleData;
use App\Data\RenterData;
use App\Models\Customer;
use App\Models\Rental;
use App\Models\RentalRate;
use App\Models\Vehicle;
use App\Services\AvailabilityCheckService;
use App\Services\TimeframeService;
use Illuminate\Http\Request;

class RentalDetailsUpdateController extends ApiController
{
    public function __construct(
        private AvailabilityCheckService $availabilityCheckService
    ) {}

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
            'id_card_address' => $data->id_card_address,
            
            // Driver's license information
            'driver_license_number' => $data->driver_license_number,
            'driver_license_issuing_city' => $data->driver_license_issuing_city,
            'driver_license_issuing_date' => $data->driver_license_issuing_date,
            'driver_license_expiration_date' => $data->driver_license_expiration_date,
            'driver_license_address' => $data->driver_license_address,
            
            // Passport information
            'passport_number' => $data->passport_number,
            'passport_country' => $data->passport_country,
            'passport_issuing_date' => $data->passport_issuing_date,
            'passport_expiration_date' => $data->passport_expiration_date,
            'passport_address' => $data->passport_address,

            // Documents
            'id_card_scan_document' => $data->id_card_scan_document,
            'driver_license_scan_document' => $data->driver_license_scan_document,
        ]);

        return $this->success(null, 'rental.renter.updated');
    }

    public function timeframe(RentalTimeframeData $data, Rental $rental, TimeframeService $timeframeService)
    {
        $availability = $this->availabilityCheckService->check(new AvailabilityCheckData(
            vehicle: Vehicle::find($rental->vehicle->vehicle_id),
            customer: Customer::find($rental->renter->customer_id),
            start_date: $data->departure_date,
            end_date: $data->return_date,
            options: new AvailabilityCheckOptions(
                ignore_rental: $rental->id,
            ),
        ));
        if (! $availability->available) {
            return $this->error($availability->message, $availability, 409);
        }

        $days = $timeframeService->diffInDays($data->departure_date, $data->return_date);

        $rental->timeframe->update([
            'departure_date' => $data->departure_date,
            'return_date' => $data->return_date,
            'total_days' => $days,
        ]);

        $rental->rate->update([
            'day_quantity' => $days,
            'day_total' => $rental->rate->day_rate * $days,
            'total' => $rental->rate->day_rate * $days + $rental->rate->extra_total - ($rental->rate->discount ?? 0),
        ]);

        return $this->success(null, 'rental.timeframe.updated');
    }

    public function rate(RentalRateData $data, Rental $rental)
    {
        $rental->load('rate');

        $total = $data->day_quantity * $data->day_rate + $data->extra_quantity * $data->extra_rate - ($data->discount ?? 0);

        RentalRate::where('rental_id', $rental->id)->update([
            'day_quantity' => $data->day_quantity,
            'day_rate' => $data->day_rate,
            'day_total' => $data->day_total,
            'extra_quantity' => $data->extra_quantity,
            'extra_rate' => $data->extra_rate,
            'extra_total' => $data->extra_total,
            'discount' => $data->discount,
            'total' => $total,
        ]);

        $rental->rate->refresh();

        return $this->success($rental->rate, 'rental.rate.updated');
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
