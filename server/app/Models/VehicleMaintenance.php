<?php

namespace App\Models;

use App\Traits\HasUuidAsPrimary;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class VehicleMaintenance extends Model
{
    use HasUuidAsPrimary;

    protected $fillable = [
        'vehicle_id',
        'started_at',
        'finished_at',
        'cancelled_at',
        'title',
        'reference',
        'notes',
        'receipt_document_id',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'finished_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function receipt(): HasOne|null
    {
        return $this->hasOne(Document::class, 'id', 'receipt_document_id');
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(VehicleExpense::class, '');
    }
}
