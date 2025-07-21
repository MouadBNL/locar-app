<?php

namespace App\Models;

use App\Enums\RentalStatus;
use App\Traits\HasUuidAsPrimary;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Collection;

/**
 * @property-read string $id
 * @property-read string $rental_number
 * @property-read ?string $notes
 * @property-read RentalStatus $status
 * @property-read RentalTimeframe $timeframe
 * @property-read RentalVehicle $vehicle
 * @property-read Renter $renter
 * @property-read RentalRate $rate
 * @property-read Collection<array-key, RentalDocument> $documents
 */
class Rental extends Model
{
    use HasUuidAsPrimary;

    protected $fillable = [
        'rental_number',
        'notes',
    ];

    protected function status(): Attribute
    {
        return Attribute::make(
            get: function () {
                if ($this->timeframe->actual_departure_date && $this->timeframe->actual_return_date) {
                    return RentalStatus::FINISHED;
                }

                if ($this->timeframe->actual_departure_date) {
                    return RentalStatus::STARTED;
                }

                return RentalStatus::DRAFT;
            },
        );
    }

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

    public function documents(): HasMany
    {
        return $this->hasMany(RentalDocument::class, 'rental_id', 'id');
    }
}
