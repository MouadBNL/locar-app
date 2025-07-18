<?php

namespace App\Models;

use App\Traits\HasUuidAsPrimary;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property-read string $id
 * @property-read string $rental_id
 * @property-read ?string $customer_id
 * @property-read string $full_name
 * @property-read ?string $email
 * @property-read ?string $id_card_number
 * @property-read ?Carbon $birth_date
 * @property-read ?string $address_primary
 * @property-read ?string $id_card_scan_document
 * @property-read ?string $driver_license_number
 * @property-read ?string $driver_license_issuing_city
 * @property-read ?Carbon $driver_license_issuing_date
 * @property-read ?Carbon $driver_license_expiration_date
 * @property-read ?string $driver_license_scan_document
 * @property-read ?string $passport_number
 * @property-read ?string $passport_country
 * @property-read ?Carbon $passport_issuing_date
 * @property-read ?Carbon $passport_expiration_date
 * @property-read ?string $passport_scan_document
 * @property-read Rental $rental
 * @property-read ?Customer $customer
 */
class Renter extends Model
{
    use HasUuidAsPrimary;

    protected $casts = [
        'birth_date' => 'date',
        'driver_license_issuing_date' => 'date',
        'driver_license_expiration_date' => 'date',
        'passport_issuing_date' => 'date',
        'passport_expiration_date' => 'date',
    ];

    protected $fillable = [
        'rental_id',
        'customer_id',
        'full_name',
        'email',
        'phone',

        // Identification information
        'id_card_number',
        'birth_date',
        'address_primary',
        'id_card_scan_document',

        // Driver's license information
        'driver_license_number',
        'driver_license_issuing_city',
        'driver_license_issuing_date',
        'driver_license_expiration_date',
        'driver_license_scan_document',

        // Passport information
        'passport_number',
        'passport_country',
        'passport_issuing_date',
        'passport_expiration_date',
        'passport_scan_document',
    ];

    public function rental(): BelongsTo
    {
        return $this->belongsTo(Rental::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
