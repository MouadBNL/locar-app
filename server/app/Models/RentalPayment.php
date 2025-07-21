<?php

namespace App\Models;

use App\Enums\RentalPaymentMethod;
use App\Enums\RentalPaymentType;
use App\Traits\HasUuidAsPrimary;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

/**
 * @property-read Rental $rental
 * @property-read Document $receiptDocument
 * @property-read RentalPaymentType $type
 * @property-read RentalPaymentMethod $method
 * @property-read float $amount
 * @property-read Carbon $date
 * @property-read ?string $reference
 * @property-read ?string $notes
 */
class RentalPayment extends Model
{
    use HasUuidAsPrimary;

    protected $fillable = [
        'rental_id',
        'type',
        'method',
        'amount',
        'date',
        'receipt_document_id',
        'reference',
        'notes',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function rental(): BelongsTo
    {
        return $this->belongsTo(Rental::class);
    }

    public function receiptDocument(): HasOne
    {
        return $this->hasOne(Document::class, 'id', 'receipt_document_id');
    }
}
