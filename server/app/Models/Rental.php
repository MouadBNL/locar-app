<?php

namespace App\Models;

use App\Traits\HasUuidAsPrimary;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property-read string $id
 * @property-read string $rental_number
 * @property-read ?string $notes
 * @property-read RentalTimeframe $timeframe
 * @property-read RentalVehicle $vehicle
 * @property-read Renter $renter
 * @property-read RentalRate $rate
 */
class Rental extends Model
{
    use HasUuidAsPrimary;

    protected $fillable = [
        'rental_number',
        'notes',
    ];

    public function timeframe(): HasOne
    {
        return $this->hasOne(RentalTimeframe::class, 'rental_id', 'id');
    }

    public function rate(): HasOne
    {
        return $this->hasOne(RentalRate::class, 'rental_id', 'id');
    }

    public function vehicle(): HasOne
    {
        return $this->hasOne(RentalVehicle::class, 'rental_id', 'id');
    }

    public function renter(): HasOne
    {
        return $this->hasOne(Renter::class, 'rental_id', 'id');
    }
}
