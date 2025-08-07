<?php

namespace App\Data;

use Carbon\Carbon;
use Spatie\LaravelData\Data;

class RenterData extends Data
{
    public function __construct(
        public ?string $id,
        public ?string $rental_id,
        public ?string $customer_id,
        public string $full_name,
        public ?string $phone,
        public ?string $email,
        public ?string $id_card_number,
        public ?Carbon $birth_date,
        public ?string $address_primary,
        public ?string $id_card_address,
        public ?Carbon $id_card_issuing_date,
        public ?Carbon $id_card_expiration_date,
        public ?string $driver_license_address,
        public ?string $passport_address,
        public ?string $driver_license_number,
        public ?string $driver_license_issuing_city,
        public ?Carbon $driver_license_issuing_date,
        public ?Carbon $driver_license_expiration_date,
        public ?string $passport_number,
        public ?string $passport_country,
        public ?Carbon $passport_issuing_date,
        public ?Carbon $passport_expiration_date,

        // Documents
        public ?string $id_card_scan_document,
        public ?string $driver_license_scan_document,

        // Meta
        public ?string $identifier,
    ) {}

    public static function rules(): array
    {
        return [
            'id' => ['nullable', 'uuid'],
            'rental_id' => ['nullable', 'uuid', 'exists:rentals,id'],
            'customer_id' => ['nullable', 'uuid', 'exists:customers,id'],
            'full_name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'id_card_number' => ['nullable', 'string', 'max:255'],
            'id_card_issuing_date' => ['nullable', 'date'],
            'id_card_expiration_date' => ['nullable', 'date'],
            'birth_date' => ['nullable', 'date'],
            'address_primary' => ['nullable', 'string', 'max:255'],
            'id_card_scan_document' => ['nullable', 'string', 'max:255'],
            'driver_license_number' => ['nullable', 'string', 'max:255'],
            'driver_license_issuing_city' => ['nullable', 'string', 'max:255'],
            'driver_license_issuing_date' => ['nullable', 'date'],
            'driver_license_expiration_date' => ['nullable', 'date'],
            'driver_license_scan_document' => ['nullable', 'string', 'max:255'],
            'passport_number' => ['nullable', 'string', 'max:255'],
            'passport_country' => ['nullable', 'string', 'max:255'],
            'passport_issuing_date' => ['nullable', 'date'],
            'passport_expiration_date' => ['nullable', 'date'],
            'passport_scan_document' => ['nullable', 'string', 'max:255'],
        ];
    }
}
