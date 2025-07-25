<?php

namespace App\Http\Controllers\Api\V1;

use App\Data\AvailabilityCheckData;
use App\Data\RentalData;
use App\Enums\RentalDocumentType;
use App\Models\Customer;
use App\Models\Rental;
use App\Models\RentalDocument;
use App\Models\RentalRate;
use App\Models\RentalTimeframe;
use App\Models\RentalVehicle;
use App\Models\Renter;
use App\Models\Vehicle;
use App\Services\AvailabilityCheckService;
use App\Services\TimeframeService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RentalInitializationController extends ApiController
{
    public function __construct(
        private AvailabilityCheckService $availabilityCheckService
    ) {}

    /**
     * Handle the incoming request.
     */
    public function __invoke(RentalData $data, TimeframeService $timeframeService)
    {
        $availability = $this->availabilityCheckService->check(new AvailabilityCheckData(
            vehicle: Vehicle::find($data->vehicle->vehicle_id),
            customer: Customer::find($data->renter->customer_id),
            start_date: Carbon::parse($data->timeframe->departure_date),
            end_date: Carbon::parse($data->timeframe->return_date),
            options: null,
        ));

        if (! $availability->available) {
            return $this->error($availability->message, $availability, 409);
        }

        $rental_id = DB::transaction(function () use ($data, $timeframeService) {
            $rental = Rental::create([
                'rental_number' => $data->rental_number,
                'notes' => $data->notes,
            ]);
            $timeframe = RentalTimeframe::create([
                'rental_id' => $rental->id,
                'departure_date' => $data->timeframe->departure_date,
                'return_date' => $data->timeframe->return_date,
                'total_days' => $timeframeService->diffInDays($data->timeframe->departure_date, $data->timeframe->return_date),
                // 'total_hours' => $data->timeframe->total_hours,
                // 'total_weeks' => $data->timeframe->total_weeks,
                // 'total_months' => $data->timeframe->total_months,
            ]);
            $vehicle = RentalVehicle::create([
                'rental_id' => $rental->id,
                'vehicle_id' => $data->vehicle->vehicle_id,
                'make' => $data->vehicle->make,
                'model' => $data->vehicle->model,
                'year' => $data->vehicle->year,
                'license_plate' => $data->vehicle->license_plate,
            ]);
            $renter = Renter::create([
                'rental_id' => $rental->id,
                'customer_id' => $data->renter->customer_id,
                'full_name' => $data->renter->full_name,
                'phone' => $data->renter->phone,
                'email' => $data->renter->email,

                'id_card_number' => $data->renter->id_card_number,
                'birth_date' => $data->renter->birth_date,
                'address_primary' => $data->renter->address_primary,

                'driver_license_number' => $data->renter->driver_license_number,
                'driver_license_issuing_city' => $data->renter->driver_license_issuing_city,
                'driver_license_issuing_date' => $data->renter->driver_license_issuing_date,
                'driver_license_expiration_date' => $data->renter->driver_license_expiration_date,

                'passport_number' => $data->renter->passport_number,
                'passport_country' => $data->renter->passport_country,
                'passport_issuing_date' => $data->renter->passport_issuing_date,
                'passport_expiration_date' => $data->renter->passport_expiration_date,

                'id_card_scan_document' => $data->renter->id_card_scan_document,
                'driver_license_scan_document' => $data->renter->driver_license_scan_document,
            ]);

            $rate = RentalRate::create([
                'rental_id' => $rental->id,

                'day_quantity' => $data->rate->day_quantity,
                'day_rate' => $data->rate->day_rate,
                'day_total' => $data->rate->day_total,

                'week_quantity' => $data->rate->week_quantity,
                'week_rate' => $data->rate->week_rate,
                'week_total' => $data->rate->week_total,

                'month_quantity' => $data->rate->month_quantity,
                'month_rate' => $data->rate->month_rate,
                'month_total' => $data->rate->month_total,

                'insurance_quantity' => $data->rate->insurance_quantity,
                'insurance_rate' => $data->rate->insurance_rate,
                'insurance_total' => $data->rate->insurance_total,

                'extra_quantity' => $data->rate->extra_quantity,
                'extra_rate' => $data->rate->extra_rate,
                'extra_total' => $data->rate->extra_total,

                'total' => $data->rate->total,
            ]);

            if ($data->renter->id_card_scan_document) {
                RentalDocument::create([
                    'rental_id' => $rental->id,
                    'document_id' => $data->renter->id_card_scan_document,
                    'title' => 'ID Card Scan',
                    'type' => RentalDocumentType::ID_CARD,
                ]);
            }
            if ($data->renter->driver_license_scan_document) {
                RentalDocument::create([
                    'rental_id' => $rental->id,
                    'document_id' => $data->renter->driver_license_scan_document,
                    'title' => 'Driver License Scan',
                    'type' => RentalDocumentType::DRIVER_LICENSE,
                ]);
            }

            return $rental->id;
        });

        $rental = Rental::findOrFail($rental_id);

        return $this->success(RentalData::fromModel($rental));
    }
}
