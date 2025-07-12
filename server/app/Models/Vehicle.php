<?php

namespace App\Models;

use App\Traits\HasUuidAsPrimary;
use Illuminate\Database\Eloquent\Model;

/**
 * @property-read string $id
 * @property-read string $make
 * @property-read string $model
 * @property-read int $year
 * @property-read string $license_plate
 * @property-read int $mileage
 * @property-read string $fuel_type
 * @property-read string $transmission
 * @property-read int $number_of_seats
 * @property-read int $number_of_doors
 * @property-read string $color
 * @property-read string $photo_url
 */
class Vehicle extends Model
{
    use HasUuidAsPrimary;

    protected $fillable = [
        'make',
        'model',
        'year',
        'license_plate',
        'mileage',
        'fuel_type',
        'transmission',
        'number_of_seats',
        'number_of_doors',
        'color',
        'photo_url',
    ];
}
