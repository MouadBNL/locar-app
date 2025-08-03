<?php

namespace App\Models;

use App\Traits\HasUuidAsPrimary;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $id
 * @property ?Carbon $date
 * @property string $title
 * @property ?string $document_id
 * @property string $location
 * @property ?string $vehicle_id
 * @property ?string $rental_id
 * @property ?string $customer_id
 * @property ?Document $document
 * @property ?Vehicle $vehicle
 * @property ?Rental $rental
 * @property ?Customer $customer
 */
class TrafficInfraction extends Model
{
    use HasUuidAsPrimary;

    protected $fillable = [
        'date',
        'title',
        'document_id',
        'location',
        'vehicle_id',
        'rental_id',
        'customer_id',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function rental(): BelongsTo
    {
        return $this->belongsTo(Rental::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
