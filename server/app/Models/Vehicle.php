<?php

namespace App\Models;

use App\Enums\VehicleStatus;
use App\Traits\HasUuidAsPrimary;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Collection;

/**
 * @property-read string $id
 * @property-read string $make
 * @property-read string $model
 * @property-read ?Carbon $first_service_date
 * @property-read ?Carbon $last_service_date
 * @property-read string $license_plate
 * @property-read string $vin
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
    /**
     * @use HasFactory<\Database\Factories\VehicleFactory>
     */
    use HasFactory;

    use HasUuidAsPrimary;

    protected $fillable = [
        'make',
        'model',
        'first_service_date',
        'last_service_date',
        'license_plate',
        'vin',
        'mileage',
        'fuel_type',
        'transmission',
        'number_of_seats',
        'number_of_doors',
        'color',
        'photo_url',
    ];

    protected $casts = [
        'first_service_date' => 'date',
        'last_service_date' => 'date',
    ];

    public function status(): Attribute
    {
        return Attribute::make(
            get: function () {
                if ($this->activeMaintenance) {
                    return VehicleStatus::MAINTENANCE;
                }

                if ($this->activeReservation) {
                    return VehicleStatus::BOOKED;
                }

                if ($this->activeRentalVehicle) {
                    return VehicleStatus::RENTED;
                }

                return VehicleStatus::AVAILABLE;
            }
        );
    }

    /**
     * @return HasOne<RentalVehicle, $this>
     */
    public function activeRentalVehicle(): HasOne
    {
        return $this->hasOne(RentalVehicle::class, 'vehicle_id', 'id')
            ->whereHas('rental', function ($query) {
                $query->whereHas('timeframe', function ($query) {
                    $query->where('departure_date', '<=', now()->toDateTimeString())
                        ->where('return_date', '>=', now()->toDateTimeString());
                });
            });
    }

    /**
     * @return HasOne<Reservation, $this>
     */
    public function activeReservation(): HasOne
    {
        return $this->hasOne(Reservation::class, 'vehicle_id', 'id')
            ->where('check_in_date', '<=', now()->toDateTimeString())
            ->where('check_out_date', '>=', now()->toDateTimeString());
    }

    /**
     * @return HasOne<VehicleMaintenance, $this>
     */
    public function activeMaintenance(): HasOne
    {
        return $this->hasOne(VehicleMaintenance::class, 'vehicle_id', 'id')
            ->where('cancelled_at', null)
            ->where('started_at', '<=', now()->toDateTimeString())
            ->where(function ($query) {
                $query->where('finished_at', '>=', now()->toDateTimeString())
                    ->orWhereNull('finished_at');
            });
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
