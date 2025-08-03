<?php

namespace App\Models;

use App\Traits\HasUuidAsPrimary;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property-read string $id
 * @property-read string $rental_id
 * @property-read ?float $day_quantity
 * @property-read ?float $day_rate
 * @property-read ?float $day_total
 * @property-read ?float $extra_quantity
 * @property-read ?float $extra_rate
 * @property-read ?float $extra_total
 * @property-read ?float $total
 * @property-read Rental $rental
 */
class RentalRate extends Model
{
    use HasUuidAsPrimary;

    protected $fillable = [
        'rental_id',
        'day_quantity',
        'day_rate',
        'day_total',
        'extra_quantity',
        'extra_rate',
        'extra_total',
        'total',
    ];

    public function rental(): BelongsTo
    {
        return $this->belongsTo(Rental::class);
    }
}
