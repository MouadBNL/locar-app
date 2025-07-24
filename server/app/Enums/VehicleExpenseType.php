<?php

namespace App\Enums;

enum VehicleExpenseType: string
{
    case FUEL = 'fuel';
    case MAINTENANCE = 'maintenance';
    case REPAIR = 'repair';
    case OTHER = 'other';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
