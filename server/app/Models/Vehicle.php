<?php

namespace App\Models;

use App\Traits\HasUuidAsPrimary;
use Illuminate\Database\Eloquent\Model;

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
