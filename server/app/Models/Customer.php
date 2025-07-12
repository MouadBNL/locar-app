<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasUuidAsPrimary;
use Carbon\Carbon;

/**
 * @property-read string $id
 * @property-read string $first_name
 * @property-read string $last_name
 * @property-read ?string $email
 * @property-read ?string $phone
 * @property-read ?string $address
 * @property-read ?string $id_card_number
 * @property-read ?string $driver_license_number
 * @property-read ?string $passport_number
 * @property-read ?Carbon $birth_date
 */
class Customer extends Model
{
    use HasUuidAsPrimary;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'id_card_number',
        'driver_license_number',
        'passport_number',
        'birth_date',
    ];
}
