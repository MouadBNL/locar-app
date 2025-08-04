<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property-read string $id
 * @property-read string $customer_id
 * @property-read string $rental_id
 * @property-read float $rating
 * @property-read ?string $comment
 * @property-read Carbon $created_at
 * @property-read Carbon $updated_at
 * @property-read Customer $customer
 * @property-read Rental $rental
 */
class CustomerRating extends Model
{
    protected $fillable = [
        'customer_id',
        'rental_id',
        'rating',
        'comment',
    ];

    protected $casts = [
        'rating' => 'float',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function rental(): BelongsTo
    {
        return $this->belongsTo(Rental::class);
    }
}
