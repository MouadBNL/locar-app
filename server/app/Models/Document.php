<?php

namespace App\Models;

use App\Traits\HasUuidAsPrimary;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property-read string $id
 * @property-read string $filename
 * @property-read string $original_filename
 * @property-read string $disk
 * @property-read string $path
 * @property-read string $mime_type
 * @property-read string $size
 * @property-read string $uploaded_for
 * @property-read string $uploaded_by
 * @property-read User $uploadedBy
 * @property-read Carbon $created_at
 * @property-read Carbon $updated_at
 */
class Document extends Model
{
    use HasUuidAsPrimary;

    protected $fillable = [
        'id',
        'filename',
        'original_filename',
        'disk',
        'path',
        'mime_type',
        'size',
        'uploaded_for',
        'uploaded_by',
    ];

    public function uploadedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
