<?php

namespace App\Enums;

enum VehicleExpenseType: string
{
    case FUEL = 'fuel';
    case CAR_WASH = 'car_wash';
    case TIRES = 'tires';
    case OIL_CHANGE = 'oil_change';
    case TAX = 'tax'; // vignette
    case BRAKES = 'brakes';
    case DIAGNOSTIC = 'diagnostic';
    case INSPECTION = 'inspection'; // Visite technique
    case ELECTRICIAN = 'electrician';
    case INSURANCE = 'insurance';
    case MECHANIC = 'mechanic';
    case PARKING = 'parking';
    case SPARE_PARTS = 'spare_parts';
    case OTHER = 'other';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
