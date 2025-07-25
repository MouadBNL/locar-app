<?php

namespace App\Models;

use App\Enums\VehicleStatus;
use App\Traits\HasUuidAsPrimary;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

/**
 * @property-read string $id
 * @property-read string $make
 * @property-read string $model
 * @property-read int $year
 * @property-read string $license_plate
 * @property-read int $mileage
 * @property-read string $fuel_type
 * @property-read string $transmission
 * @property-read int $number_of_seats
 * @property-read int $number_of_doors
 * @property-read string $color
 * @property-read string $photo_url
 * @property-read VehicleStatus $status
 * @property-read Collection<VehicleExpense> $expenses
 */
class Vehicle extends Model
{
    use HasUuidAsPrimary;

    protected $fillable = [
        'make',
        'model',
        'year',
        'license_plate',
        'mileage',
        'fuel_type',
        'transmission',
        'number_of_seats',
        'number_of_doors',
        'color',
        'photo_url',
    ];

    public function status(): Attribute
    {
        return Attribute::make(
            get: function () {
                if ($this->maintenances()
                    ->where('cancelled_at', null)
                    ->where('started_at', '<=', now()->toISOString())
                    ->where(function ($query) {
                        $query->where('finished_at', '>=', now()->toISOString())
                            ->orWhereNull('finished_at');
                    })
                    ->exists()
                ) {
                    return VehicleStatus::MAINTENANCE;
                }

                if ($this->reservations()
                    ->where('check_in_date', '<=', now()->toISOString())
                    ->where('check_out_date', '>=', now()->toISOString())
                    ->exists()
                ) {
                    return VehicleStatus::BOOKED;
                }

                return VehicleStatus::AVAILABLE;
            }
        );
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(VehicleExpense::class);
    }

    public function maintenances(): HasMany
    {
        return $this->hasMany(VehicleMaintenance::class);
    }

    /**
     * @return HasMany<Reservation, $this>
     */
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function rentalVehicles(): HasMany
    {
        return $this->hasMany(RentalVehicle::class);
    }
}
