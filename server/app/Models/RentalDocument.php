<?php

namespace App\Models;

use App\Traits\HasUuidAsPrimary;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property-read string $id
 * @property-read string $rental_id
 * @property-read string $document_id
 * @property-read string $title
 * @property-read string $type
 * @property-read string $description
 * @property-read CarbonImmutable $created_at
 * @property-read CarbonImmutable $updated_at
 * @property-read Rental $rental
 * @property-read Document $document
 */
class RentalDocument extends Model
{
    use HasUuidAsPrimary;

    protected $fillable = [
        'rental_id',
        'document_id',
        'title',
        'type',
        'description',
    ];

    public function rental(): BelongsTo
    {
        return $this->belongsTo(Rental::class);
    }

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }
}
