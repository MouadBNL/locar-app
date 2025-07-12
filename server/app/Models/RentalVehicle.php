<?php

namespace App\Models;

use App\Traits\HasUuidAsPrimary;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property-read string $id
 * @property-read string $rental_id
 * @property-read ?string $vehicle_id
 * @property-read string $make
 * @property-read string $model
 * @property-read int $year
 * @property-read string $license_plate
 * @property-read Rental $rental
 * @property-read ?Vehicle $vehicle
 */
class RentalVehicle extends Model
{
    use HasUuidAsPrimary;

    protected $fillable = [
        'rental_id',
        'vehicle_id',
        'make',
        'model',
        'year',
        'license_plate',
    ];

    public function rental(): BelongsTo
    {
        return $this->belongsTo(Rental::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }
}
