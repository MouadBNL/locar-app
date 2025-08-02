<?php

namespace App\Models;

use App\Enums\CustomerStatus;
use App\Traits\HasUuidAsPrimary;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Collection;

/**
 * @property-read string $id
 * @property-read string $first_name
 * @property-read string $last_name
 * @property-read CustomerStatus $status
 * @property-read ?string $email
 * @property-read ?string $phone
 * @property-read ?string $address
 * @property-read ?string $id_card_number
 * @property-read ?string $driver_license_number
 * @property-read ?string $passport_number
 * @property-read ?Carbon $birth_date
 * @property-read Collection<array-key, Renter> $renters
 * @property-read Collection<array-key, Reservation> $reservations
 */
class Customer extends Model
{
    /**
     * @use HasFactory<\Database\Factories\CustomerFactory>
     */
    use HasFactory;
    use HasUuidAsPrimary;

    protected $casts = [
        'birth_date' => 'datetime',
    ];

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

    public function status(): Attribute
    {
        return Attribute::make(
            get: function () {
                $activeRenter = $this->activeRenter;
                if ($activeRenter) {
                    return [
                        'status' => CustomerStatus::RENTING,
                        'entity_type' => 'rental',
                        'entity_id' => $this->activeRenter->rental->rental_number,
                    ];
                }

                $activeReservation = $this->activeReservation;

                if ($activeReservation) {
                    return [
                        'status' => CustomerStatus::BOOKED,
                        'entity_type' => 'reservation',
                        'entity_id' => $activeReservation->reservation_number,
                    ];
                }

                return [
                    'status' => CustomerStatus::ACTIVE,
                ];
            }
        );
    }

    /**
     * @return HasOne<Renter, $this>
     */
    public function activeRenter(): HasOne
    {
        return $this->hasOne(Renter::class, 'customer_id', 'id')
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
        return $this->hasOne(Reservation::class, 'customer_id', 'id')
            ->where('check_in_date', '<=', now()->toDateTimeString())
            ->where('check_out_date', '>=', now()->toDateTimeString());
    }

    public function renters(): HasMany
    {
        return $this->hasMany(Renter::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Reservation, $this>
     */
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
