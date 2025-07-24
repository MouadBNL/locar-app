<?php

namespace App\Enums;

enum VehicleStatus: string
{
    case AVAILABLE = 'available';
    case MAINTENANCE = 'maintenance';
    case BOOKED = 'booked';
    case RENTED = 'rented';
    // case SOLD = 'sold';
    // case LOST = 'lost';
    // case STOLEN = 'stolen';
    // case OTHER = 'other';
    // case UNKNOWN = 'unknown';
    // case DELETED = 'deleted';
    // case ARCHIVED = 'archived';
}
