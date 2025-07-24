<?php

namespace App\Models;

use App\Traits\HasUuidAsPrimary;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class VehicleExpense extends Model
{
    use HasUuidAsPrimary;

    protected $fillable = [
        'vehicle_id',
        'type',
        'amount',
        'date',
        'title',
        'reference',
        'receipt_document_id',
        'notes',
    ];


    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(RentalVehicle::class);
    }

    public function receipt(): HasOne|null
    {
        return $this->hasOne(Document::class, 'id', 'receipt_document_id');
    }
}
