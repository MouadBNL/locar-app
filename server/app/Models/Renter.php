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
        'birth_date' => 'datetime',
        'id_card_issuing_date' => 'datetime',
        'id_card_expiration_date' => 'datetime',
        'driver_license_issuing_date' => 'datetime',
        'driver_license_expiration_date' => 'datetime',
        'passport_issuing_date' => 'datetime',
        'passport_expiration_date' => 'datetime',
    ];

    protected $fillable = [
        'rental_id',
        'customer_id',
        'full_name',
        'email',
        'phone',
        
        'address_primary',
        
        // Identification information
        'birth_date',
        'id_card_number',
        'id_card_issuing_date',
        'id_card_expiration_date',
        'id_card_address',
        
        // Driver's license information
        'driver_license_number',
        'driver_license_issuing_city',
        'driver_license_issuing_date',
        'driver_license_expiration_date',
        'driver_license_address',

        // Passport information
        'passport_number',
        'passport_country',
        'passport_issuing_date',
        'passport_expiration_date',
        'passport_address',

        // Documents
        'id_card_scan_document',
        'driver_license_scan_document',
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
