<?php

namespace App\Models;

use App\Traits\HasUuidAsPrimary;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property-read string $id
 * @property-read string $customer_id
 * @property-read string $vehicle_id
 * @property-read Carbon $check_in_date
 * @property-read Carbon $check_out_date
 * @property-read float $daily_rate
 * @property-read int $total_days
 * @property-read float $total_price
 * @property-read ?string $notes
 * @property-read Carbon $created_at
 * @property-read Carbon $updated_at
 * @property-read Customer $customer
 * @property-read Vehicle $vehicle
 */
class Reservation extends Model
{
    use HasUuidAsPrimary;

    protected $fillable = [
        'customer_id',
        'vehicle_id',
        'check_in_date',
        'check_out_date',
        'daily_rate',
        'total_days',
        'total_price',
        'notes',
    ];

    protected $casts = [
        'check_in_date' => 'datetime',
        'check_out_date' => 'datetime',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }
}
