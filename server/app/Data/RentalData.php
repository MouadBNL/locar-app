<?php

namespace App\Data;

use App\Enums\RentalStatus;
use App\Http\Resources\DocumentResource;
use App\Models\Rental;
use Spatie\LaravelData\Data;

class RentalData extends Data
{
    public function __construct(
        public ?string $id,
        public string $rental_number,
        public ?string $notes,
        public ?RentalStatus $status,
        public ?DocumentResource $agreement_document,
        public RentalTimeframeData $timeframe,
        public RentalVehicleData $vehicle,
        public RenterData $renter,
        public RentalRateData $rate,
        public ?RentalChargesSummaryData $charges_summary,
    ) {}

    public static function rules(): array
    {
        return [
            'id' => ['nullable', 'uuid'],
            'rental_number' => ['required', 'string', 'max:255', 'unique:rentals,rental_number'],
            'notes' => ['nullable', 'string', 'max:255'],
        ];
    }

    public static function fromModel(Rental $rental): self
    {
        $rental->load(['rate', 'timeframe', 'renter', 'vehicle.vehicle', 'agreement_document']);

        return new self(
            id: $rental->id,
            rental_number: $rental->rental_number,
            notes: $rental->notes,
            status: $rental->status,
            agreement_document: $rental->agreement_document ? new DocumentResource($rental->agreement_document->document) : null,
            timeframe: new RentalTimeframeData(
                id: $rental->timeframe->id,
                rental_id: $rental->id,
                departure_date: $rental->timeframe->departure_date,
                return_date: $rental->timeframe->return_date,
                total_days: $rental->timeframe->total_days,
                total_hours: $rental->timeframe->total_hours,
                total_weeks: $rental->timeframe->total_weeks,
                total_months: $rental->timeframe->total_months,
            ),
            vehicle: new RentalVehicleData(
                id: $rental->vehicle->id,
                vehicle_id: $rental->vehicle->vehicle_id,
                make: $rental->vehicle->make,
                model: $rental->vehicle->model,
                year: $rental->vehicle->year,
                license_plate: $rental->vehicle->license_plate,
                color: $rental->vehicle->vehicle?->color,
                transmission: $rental->vehicle->vehicle?->transmission,
                seats: $rental->vehicle->vehicle?->number_of_seats,
                doors: $rental->vehicle->vehicle?->number_of_doors,
                fuel_type: $rental->vehicle->vehicle?->fuel_type,
                mileage: $rental->vehicle->vehicle?->mileage,
            ),
            renter: new RenterData(
                id: $rental->renter->id,
                rental_id: $rental->id,
                customer_id: $rental->renter->customer_id,
                full_name: $rental->renter->full_name,
                phone: $rental->renter->phone,
                id_card_number: $rental->renter->id_card_number,
                passport_number: $rental->renter->passport_number,
                driver_license_number: $rental->renter->driver_license_number,
                driver_license_issuing_date: $rental->renter->driver_license_issuing_date,
                driver_license_issuing_city: $rental->renter->driver_license_issuing_city,
                driver_license_expiration_date: $rental->renter->driver_license_expiration_date,
                address_primary: $rental->renter->address_primary,
                id_card_address: $rental->renter->id_card_address,
                driver_license_address: $rental->renter->driver_license_address,
                passport_address: $rental->renter->passport_address,
                birth_date: $rental->renter->birth_date,
                email: $rental->renter->email,
                passport_country: $rental->renter->passport_country,
                passport_expiration_date: $rental->renter->passport_expiration_date,
                passport_issuing_date: $rental->renter->passport_issuing_date,

                driver_license_scan_document: $rental->renter->driver_license_scan_document,
                id_card_scan_document: $rental->renter->id_card_scan_document,

                identifier: $rental->renter->id_card_number ?? $rental->renter->passport_number ?? $rental->renter->driver_license_number,
            ),
            rate: new RentalRateData(
                id: $rental->rate->id,
                rental_id: $rental->id,
                total: $rental->rate->total,
                day_quantity: $rental->rate->day_quantity,
                day_rate: $rental->rate->day_rate,
                day_total: $rental->rate->day_total,
                extra_quantity: $rental->rate->extra_quantity,
                extra_rate: $rental->rate->extra_rate,
                extra_total: $rental->rate->extra_total,
                discount: $rental->rate->discount,
            ),
            charges_summary: RentalChargesSummaryData::fromRental($rental),
        );
    }
}
