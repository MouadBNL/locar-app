<?php

namespace App\Models;

use App\Traits\HasUuidAsPrimary;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

/**
 * @property-read string $id
 * @property-read string $rental_id
 * @property-read Carbon $departure_date
 * @property-read Carbon $return_date
 * @property-read ?Carbon $actual_departure_date
 * @property-read ?Carbon $actual_return_date
 * @property-read ?int $total_hours
 * @property-read ?int $total_days
 * @property-read ?int $total_weeks
 * @property-read ?int $total_months
 */
class RentalTimeframe extends Model
{
    use HasUuidAsPrimary;

    protected $casts = [
        'departure_date' => 'date',
        'return_date' => 'date',
        'actual_departure_date' => 'date',
        'actual_return_date' => 'date',
    ];

    protected $fillable = [
        'rental_id',
        'departure_date',
        'return_date',
        'actual_departure_date',
        'actual_return_date',
        'total_hours',
        'total_days',
        'total_weeks',
        'total_months',
    ];


    public function rental(): BelongsTo
    {
        return $this->belongsTo(Rental::class);
    }
}
